import React, { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { SearchDropdown } from '../components/searchDropdown/searchDropdown.jsx';
import { Button } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.resultsTable = React.createRef();
    }

    componentDidMount() {
        this.getResults();
    }

    async getResults() {
        await fetch(`${BACKEND_URL}api/1.0/results`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.generateTable(data["results"]);
        })
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