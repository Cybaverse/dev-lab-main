import { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { Dropdown, DropdownItem } from '../components/dropdown/Dropdown.jsx';
import { Button } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';

class NewItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "Laptop",
            availableTypes: ["Laptop", "Desktop", "Server", "Mobile Phone"],
            message: "",
            error: ""
        };

    }

    async newResult() {
        const { name, type } = this.state;
        if (!name.trim()) {
            return this.setState({ error: "Name is required.", message: "" });
        }
        if (!type.trim()) {
            return this.setState({ error: "Type is required.", message: "" });
        }
        const response = await fetch(`${BACKEND_URL}api/1.0/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type })
        });
        if (response.ok) {
            this.setState({
                name: "",
                type: this.state.availableTypes[0],
                message: "New record added!",
                error: ""
            });
        } else {
            // Server-side error
            this.setState({
                error: `Failed to add: ${response.statusText}`,
                message: ""
            });
        }
    }

    render() {
        return (
            <div className="MainPageContainer">
                <NavBar />
                <div className="mainContent">
                    <div className="formContainer">
                        {this.state.message && (
                            <div className="alert alert-success">{this.state.message}</div>
                        )}
                        {this.state.error && (
                            <div className="alert alert-danger">{this.state.error}</div>
                        )}
                        <div className="formItem">
                            <input
                                type="text"
                                className="form-control textbox"
                                id="name"
                                placeholder="Full Name"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                            <label className="formLabel">Your Name</label>
                        </div>
                        <div className="formItem">
                            <Dropdown
                                value={this.state.type}
                                onChange={(type) => this.setState({ type })}
                                title="Type"
                            >
                                {this.state.availableTypes.map((type) => (
                                    <DropdownItem value={type} key={type}>
                                        {type}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="formItem">
                            <Button type="button" className="newButton" onClick={() => this.newResult()}>
                                New
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewItemPage;