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
            messageType: ""
        };
    }

    async newResult() {
        const { name, type } = this.state;

        if (!name.trim() || !type) {
            this.setState({
                message: "Please fill in all required fields.",
                messageType: "error"
            });
            return;
        }

        try { 
            const response = await fetch(`${BACKEND_URL}api/1.0/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    type: this.state.type
                })
            }
            );

            if (response.ok) {
                this.setState({
                    name: "",
                    type: "Laptop",
                    message: "Record added successfully :)",
                    messageType: "success"
                });
            } else {
                const data = await response.json();
                this.setState({
                    message: data.message || "Something went wrong :(",
                    messageType: "error"
                });
            }
        }   catch (err) {
            this.setState({
                message: "Network error. Please try again later.",
                messageType: "error"
            });
        }
    }

    render() {
        return (
            <div className="MainPageContainer">
            <NavBar />
            <div className="mainContent">
                {this.state.message && ( 
                    <div className={`message ${this.state.messageType}`}>
                        {this.state.message}
                    </div>
                )}
                <div className="formContainer">
                <div className="formItem">
                    <input
                    type="text"
                    className="form-control textbox"
                    id="name"
                    placeholder="Full Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
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
                </div>
                <div className="submitButton">
                <Button type="button" className="newButton" onClick={() => this.newResult()}>
                    New
                </Button>
                </div>
            </div>
            </div>
        );
    }
}

export default NewItemPage;