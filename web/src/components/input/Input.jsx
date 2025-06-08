import { Component, createRef } from 'react';
import PropTypes from "prop-types";
import "./Input.css";

export class Input extends Component {
    static defaultProps = {
        value: "",
        type: "text"
    }
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        className: PropTypes.string,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func,
        action: PropTypes.func,
        onClick: PropTypes.func,
        placeholder: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        defaultValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        type: PropTypes.string,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        size: PropTypes.string,
        error: PropTypes.bool,
        focus: PropTypes.bool,
        readOnly: PropTypes.bool,
        icon: PropTypes.string,
        title: PropTypes.string
    }
    
    constructor(props) {
        super(props);
        this.input = createRef();
    }

    componentDidMount() {
        if (this.props.focus) {
            this.input.current.focus();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && this.props.onSubmit) {
            this.props.onSubmit();
        } else if (event.key === 'Escape' && this.props.onClose) {
            this.props.onClose();
        }
    }

    update() {
        
    }
    
    render() {
        return (
            <div className={`InputContainer`}>
                {this.props.label && <div className="InputLabel" title={this.props.title}>{this.props.label}</div>}
                <input ref={this.input} type={this.props.type} disabled={this.props.disabled} className={`DefaultInput ${this.props.className} ${this.props.size}Input ${this.props.error ? 'Error' : ''} ${this.props.icon ? "InputIconShift" : ""}`} onChange={this.props.action} onClick={this.props.onClick} value={this.props.value} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} onKeyUp={this.handleKeyPress.bind(this)} readOnly={this.props.readOnly} />
            </div>
        )
    }
}

export class DefaultInput extends Component {
    static defaultProps = {
        type: "Text"
    }
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        className: PropTypes.string,
        children: PropTypes.string,
        disabled: PropTypes.bool,
        action: PropTypes.func,
        onSubmit: PropTypes.func,
        onClick: PropTypes.func,
        onClose: PropTypes.func,
        readOnly: PropTypes.bool,
        placeholder: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        defaultValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        label: PropTypes.string,
        focus: PropTypes.bool,
        icon: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input className={`${this.props.className}Input ${!this.props.disabled? 'enabled' : 'disabled'}`} label={this.props.label} disabled={this.props.disabled} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} value={this.props.value != null ? this.props.value : this.props.children} action={this.props.action} type={this.props.type.toLowerCase()} onSubmit={this.props.onSubmit} onClose={this.props.onClose} focus={this.props.focus} onClick={this.props.onClick} readOnly={this.props.readOnly} icon={this.props.icon}></Input>
        )
    }
}