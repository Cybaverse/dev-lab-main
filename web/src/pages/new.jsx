import { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { Dropdown, DropdownItem } from '../components/dropdown/Dropdown.jsx';
import { Button } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';

class NewItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Laptop",
            availableTypes: ["Laptop", "Desktop", "Server", "Mobile Phone"],
        };
        this.name = "";
    }

    async newResult() {
        await fetch(`${BACKEND_URL}api/1.0/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                type: this.state.type
            })
        }
        )
    }

    render() {
        return (
            <div className="MainPageContainer">
            <NavBar />
            <div className="mainContent">
                <div className="formContainer">
                <div className="formItem">
                    <input
                    type="text"
                    className="form-control textbox"
                    id="name"
                    placeholder="Full Name"
                    value={this.name}
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