import { Component } from 'react';
import { NavBar } from '../components/navbar/navbar.jsx';
import { Dropdown, DropdownItem } from '../components/dropdown/Dropdown.jsx';
import { Button, Alert } from 'react-bootstrap';
import { BACKEND_URL } from '../Global.jsx';
import DOMPurify from 'dompurify';

class NewItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Laptop",
            availableTypes: ["Laptop", "Desktop", "Server", "Mobile Phone"],
            name: "",
            email: "",
            successMessage: "",
            errorMessage: ""
        };
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validateForm() {
        const { name, type, email } = this.state;

        if (!name || !type || !email) {
            this.setState({
                errorMessage: "Name, type and email are required.",
                successMessage: ""
            });
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.setState({
                errorMessage: "Please enter a valid email address.",
                successMessage: ""
            });
            return false;
        }

        return true;
    }

    async newResult() {
        if (!this.validateForm()) return;

        try {
            const response = await fetch(`${BACKEND_URL}api/1.0/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    type: this.state.type,
                    email: this.state.email
                })
            });

            if (response.ok) {
                this.setState({
                    name: "",
                    type: "Laptop",
                    email: "",
                    successMessage: "New record added successfully!",
                    errorMessage: ""
                });
            } else {
                const data = await response.json();
                this.setState({
                    errorMessage: data.message || "Failed to add the record.",
                    successMessage: ""
                });
            }
        } catch (err) {
            this.setState({
                errorMessage: "An error occurred while submitting the form.",
                successMessage: ""
            });
        }
    }

    handleInputChange = (field, value) => {
        const clean = DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        this.setState({ [field]: clean });
    };

    render() {
        const { name, type, email, availableTypes, successMessage, errorMessage } = this.state;

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
                                value={name}
                                onChange={(e) => this.handleInputChange("name", e.target.value)}
                            />
                            <label className="formLabel">Your Name</label>
                        </div>

                        <div className="formItem">
                            <input
                                type="email"
                                className="form-control textbox"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => this.handleInputChange("email", e.target.value)}
                            />
                            <label className="formLabel">Your Email</label>
                        </div>

                        <div className="formItem">
                            <Dropdown
                                value={type}
                                onChange={(type) => this.setState({ type })}
                                title="Type"
                            >
                                {availableTypes.map((typeOption) => (
                                    <DropdownItem value={typeOption} key={typeOption}>
                                        {typeOption}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                    </div>

                    <Button type="button" className="newButton" onClick={() => this.newResult()}>
                        New
                    </Button>

                    <div className="submitButton mt-3">
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewItemPage;
