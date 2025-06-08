import React, { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { SearchDropdown } from '../components/searchDropdown/searchDropdown.jsx';
import { Button } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            resultsData: []
        };
        this.resultsTable = React.createRef();
    }

    componentDidMount() {
        this.getResults();
    }

    async getResults() {
        this.setState({ loading: true, error: null });
        try {
            const q = this.state.searchTerm
                ? `?search=${encodeURIComponent(this.state.searchTerm)}`
                : "";

            const response = await fetch(`${BACKEND_URL}api/1.0/results${q}`);
            const data = await response.json();
            this.setState({
                resultsData: data.results,
                loading: false
            });
            this.generateTable(data.results);
        } catch (error) {
            this.setState({
                loading: false,
                error: "Failed to load results. Please try again."
            });
        }
    }

    generateTable(tableData) {
        this.resultsTable.current.innerHTML = "";
        tableData.forEach((result, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${result["_id"]}</td>
                <td>${result["name"]}</td>
                <td>${result["mainType"]}</td>
            `;
            this.resultsTable.current.appendChild(row);
        });
        this.resultsTable.current.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="MainPageContainer">
                <NavBar />
                <div className="mainContent">
                    {this.state.loading && (
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {this.state.error && (
                        <div className="alert alert-danger alert-dismissible fade show">
                            {this.state.error}
                            <button type="button" className="btn-close"
                                onClick={() => this.setState({ error: null })} />
                        </div>
                    )}
                    <div className="formItem" style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            className="form-control textbox"
                            placeholder="Search by name"
                            value={this.state.searchTerm}
                            onChange={e => this.setState({ searchTerm: e.target.value })}
                        />
                        <Button
                            variant="primary"
                            onClick={() => this.getResults()}
                            style={{ marginLeft: '0.5rem' }}
                        >
                            Search
                        </Button>
                    </div>
                    <table className="resultsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody ref={this.resultsTable}>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ResultsPage;