import { Component, createRef } from 'react';
import PropTypes from "prop-types";

import "./searchDropdown.css";
import { DefaultInput } from "../input/Input.jsx";

export class SearchDropdown extends Component {
    static defaultProps = {
        size: "Medium"
    }
    static propTypes = {
        value: PropTypes.string,
        label: PropTypes.string,
        items: PropTypes.array,
        action: PropTypes.func,
        resetValue: PropTypes.bool,
        size: PropTypes.string,
        icon: PropTypes.string,
        title: PropTypes.string,
    }
    
    constructor(props) {
        super(props);

        this.state = {
            search: this.props.value,
            expanded: false,
            filteredItems: []
        }
        this.items = []
        this.itemsDropdown = createRef();
        this.dropdown = createRef();
        this.dropdownContainer = createRef();
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.value !== prevProps.value){
            this.setState({ search : this.props.value })
        }
        if (this.props.items !== prevProps.items){
            this.loadItems()
        }
        if ( prevState.expanded !== this.state.expanded && this.state.expanded ) {
            this.loadItems()
            this.fixDropdownPosition()
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.closeItemsDropdown.bind(this), true);
        this.loadItems()
    }

    loadItems(){
        this.items = []
        for (let item of this.props.items) {
            if (typeof item == "string") {
                this.items.push({value: item, label: item})
            }
            else {
                this.items.push(item)
            }
        }
        this.setState({filteredItems: this.items})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeItemsDropdown.bind(this), true);
    }

    closeItemsDropdown(e) {
        if ( this.itemsDropdown.current && (!this.itemsDropdown.current?.contains(e.target))) {
            this.setState({ expanded : false })
        }
    }

    search(search) {
        var tempFilteredItems = structuredClone(this.items)
        tempFilteredItems = [...new Set(tempFilteredItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())))]
        this.setState({"search": search, filteredItems: tempFilteredItems})
    }

    fixDropdownPosition() {
        const dropdown = this.dropdown.current;
        const dropdownMenu = dropdown.nextElementSibling;

        if (dropdownMenu) {
            let width = dropdown.getBoundingClientRect().width;
            dropdownMenu.style.minWidth = `${width}px`;

            const overflowRight = dropdownMenu.getBoundingClientRect().right > window.innerWidth;
            if (overflowRight) {
                dropdownMenu.style.right = `0px`;
            }

            const dropdownBottom = dropdown.getBoundingClientRect().bottom;
            const dropdownHeight = this.itemsDropdown.current.getBoundingClientRect().height;
            if (dropdownBottom + dropdownHeight > window.innerHeight) {
                this.dropdownContainer.current.style.top = `${dropdown.getBoundingClientRect().top - dropdownHeight}px`;
            } else {
                this.dropdownContainer.current.style.top = `${dropdownBottom}px`;
            }
        }
    }
    
    render() {
        return (
            <div className="searchDropdownContainer">
                {this.props.label &&
                    <label title={this.props.title}>
                        {this.props.label}
                    </label>}
                <div className="searchDropdownMain">
                    <div className="SearchDropdownInputContainer" ref={this.dropdown}>
                        <DefaultInput size={this.props.size} type="text" placeholder="Search" value={this.state.search} action={(e) => {this.setState({expanded: true}); this.search(e.target.value)}} onClick={() => this.setState({expanded: true})}/>
                        <div className='SearchDropdownHeaderIcon' onClick={() => this.setState({expanded: !this.state.expanded})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M4.99994 4.50933L0.660348 0.169739L-6.10352e-05 0.830148L4.99994 5.83015L9.99994 0.830148L9.33953 0.169739L4.99994 4.50933Z" fill="currentColor"/>
                            </svg>
                        </div>
                        {this.props.resetValue && this.state.search && (
                            <div className="SearchDropdownHeaderClearIcon" onClick={() => {this.search("");this.props.action("")}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                        )}
                    </div>
                    {this.state.expanded &&
                        <div className='searchDropdown' ref={this.dropdownContainer}>
                            <div className='searchDropdownItemsAllContainer' ref={this.itemsDropdown}>
                                <div className="searchDropdownItemsContainer">
                                    <div className="searchDropdownItems">
                                        {this.state.filteredItems && this.state.filteredItems.map((item,index) => 
                                            <div className="searchDropdownItem" key={`${index}-${item.value}`} onClick={() => {this.search(item.label);this.setState({expanded: false, icon: item?.icon});this.props.action(item.value)}}>
                                                {item.label}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}