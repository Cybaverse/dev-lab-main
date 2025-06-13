import { Component, createRef, Children } from 'react';
import PropTypes from "prop-types";

import "./Dropdown.css";

export class Dropdown extends Component {
    static defaultProps = {
        size: "Small"
    }

    static propTypes = {
        size: PropTypes.string,
        disabled: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element),PropTypes.element]),
        onChange: PropTypes.func,
        onOpen: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        title: PropTypes.string
    }
    
    constructor(props) {
        super(props);

        this.state = {
            collapsed : true,
            selected : null,
            items : {},
            
        }

        this.fromDropdownHeader = createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.collapse.bind(this), true);
        if (this.props.value != null) {
            this.setState({selected: this.props.value})
        }
        this.generateItems()
        
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.collapse.bind(this), true);
    }

    componentDidUpdate(preProps) {
        if (this.props.children != preProps.children) {
            this.generateItems()
        } 
        if (this.props.value != preProps.value) {
            this.setState({ selected : this.props.value })
        }
    }

    collapse(e) {
        if ( this.fromDropdownHeader.current && (!this.fromDropdownHeader.current?.contains(e.target))) {
            this.setState({ collapsed : true })
        }
    }

    generateItems() {
        if (this.props.children) {
            var items = {};
            Children.map(this.props.children, child => { 
                if (child.type.name == DropdownItem.name) {
                    items[child.props.value] = child
                }
            })
            this.setState({ items: items })
        }
    }

    select(value) {
        this.setState({ selected : value, collapsed : true })
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    onOpen() {
        if (!this.props.disabled) {
            this.setState({ collapsed : !this.state.collapsed })
            if (this.props.onOpen) { this.props.onOpen() }
        }
    }
    
    render() {
        return (
            <div className='formDropdownContainer'>
                {this.props.title ? <label>{this.props.title}</label> : ''}
                <div className={`formDropdown ${this.props.size} `}>
                    <div className="formDropdownHeader" ref={this.fromDropdownHeader} onClick={() => { this.onOpen() }}>
                        <div className={`formDropdownHeaderActiveItem ${this.props.size} `}>
                            {this.state.items[this.state.selected]}
                        </div>
                        <div className='formDropdownHeaderOpenIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M4.99994 4.50933L0.660348 0.169739L-6.10352e-05 0.830148L4.99994 5.83015L9.99994 0.830148L9.33953 0.169739L4.99994 4.50933Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    <div className='formDropdownItemsContainer'>
                        <div className={`formDropdownItems ${this.state.collapsed ? 'collapsed' : ''}`}>
                            {Object.keys(this.state.items).map((x) => { 
                                const isSelected = this.state.selected === x;
                                return (
                                    <div key={x} className={`formDropdownItemSelector ${this.props.size}  ${isSelected ? "selected" : ""}`}  onClick={() => this.select(x) }>
                                        {this.state.items[x]}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class DropdownItem extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string,PropTypes.bool,PropTypes.number]).isRequired,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element),PropTypes.element,PropTypes.string])
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={`formDropdownItem`}>
                {this.props.children}
            </div>
        )
    }
}
