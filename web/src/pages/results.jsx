import React, { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { BACKEND_URL } from '../Global.jsx';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            results: [] 
        };
        this.resultsTable = React.createRef();
    }

    componentDidMount() {
        this.getResults();
    }

    async getResults(searchTerm = '') {
        const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
        const response = await fetch(`${BACKEND_URL}api/1.0/results${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({ results: data["results"] }); 
        this.generateTable(data["results"]);
    }

    maskEmail(email) {
        if (!email || !email.includes('@')) return '';
        const [user, domain] = email.split('@');
        const visiblePart = user.substring(0, 2);
        const masked = visiblePart + '*'.repeat(Math.max(1, user.length - 2));
        return `${masked}@${domain}`;
    }

    generateTable(tableData) {
        this.resultsTable.current.innerHTML = "";
        tableData.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${result["_id"]}</td>
                <td>${result["name"]}</td>
                <td>${result["mainType"]}</td>
                <td>${this.maskEmail(result["email"])}</td>
            `;
            this.resultsTable.current.appendChild(row);
        });
        this.resultsTable.current.scrollIntoView({ behavior: "smooth" });
    }

    downloadCSV = () => {
        const { results } = this.state;

        if (!results.length) return;

        const header = ['ID', 'Name', 'Type', 'Email'];
        const rows = results.map(r => [
            `"${r._id}"`,
            `"${r.name}"`,
            `"${r.mainType}"`,
            `"${r.email || ''}"`
        ]);

        const csvContent = [
            header.join(','), 
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "results.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ searchTerm: value });
        this.getResults(value);
    }

    render() {
        return (
            <div className="MainPageContainer">
                <NavBar />
                <div className="mainContent">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={this.state.searchTerm}
                        onChange={this.handleSearchChange}
                        style={{ marginBottom: '10px', padding: '5px' }}
                    />

                    <button onClick={this.downloadCSV} style={{ marginBottom: '10px' }}>
                        Download as CSV
                    </button>

                    <table className="resultsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody ref={this.resultsTable}></tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ResultsPage;
