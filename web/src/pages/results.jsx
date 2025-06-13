import React, { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { SearchDropdown } from '../components/searchDropdown/searchDropdown.jsx';
import { Button } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';

function redactEmail(email) {
    if (!email) return "";
        const [local, domain] = email.split("@");
    if (!domain) return email;
        const visibleChars = 2; // show first 2 chars of local part
        const redactedLocal = local.length > visibleChars 
        ? local.slice(0, visibleChars) + "*".repeat(local.length - visibleChars)
        : local;
    return `${redactedLocal}@${domain}`;
}

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            results: []
        };
        this.resultsTable = React.createRef();
    }

    componentDidMount() {
        this.getResults();
    }

    async getResults() {
        const query = this.state.searchQuery.trim();
        const url = query
            ? `${BACKEND_URL}api/1.0/results?search=${encodeURIComponent(query)}`
            : `${BACKEND_URL}api/1.0/results`;
            
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
        });

        const data = await response.json();
        this.setState({ results: data["results"] });
    }

    downloadCSV = () => {
        const { results } = this.state;
        if (!results.length) return;

        const headers = Object.keys(results[0]);
        const csvRows = [
            headers.join(","), // header row
            ...results.map(row =>
            headers.map(field => JSON.stringify(row[field] || "")).join(",")
            )
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    render() {
        return (
            <div className="MainPageContainer">
                <NavBar />
                <div className="mainContent">
                    <form onSubmit={(e) => { e.preventDefault(); this.getResults(); }}>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={this.state.searchQuery}
                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            className="form-control searchInput"
                            style={{ marginBottom: "1rem" }}
                        />
                    </form>
                    <Button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.downloadCSV}
                        style={{ marginBottom: "1rem" }}
                        >
                        Download as CSV
                    </Button>
                    <table className="resultsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map((result) => (
                                <tr key={result._id}>
                                <td>{result._id}</td>
                                <td>{result.name}</td>
                                <td>{redactEmail(result.email)}</td>
                                <td>{result.mainType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ResultsPage;