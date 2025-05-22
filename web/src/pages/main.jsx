import { Component } from 'react';
import '../style.css'
import { NavBar } from '../components/navbar/navbar.jsx';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        return (
            <div className="MainPageContainer">
                <NavBar />
                <div className="mainContent">
                    Welcome to simple request system 1.0
                </div>
            </div>
        );
    }
}

export default MainPage;