import { Component } from 'react';
export class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="nav" className="site-header sticky-top">
                <div className="topBar" id="topbar">
                    <a className="home" href="/">Lab 1</a>
                    <a className="link bi-table" href="/results"> <span>Results</span></a>
                    <a className="link bi-plus" id="conducts" href="/new"> <span>New</span></a>
                </div>
            </div>
        );
    }
}

