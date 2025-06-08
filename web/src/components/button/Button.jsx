import { Component } from 'react';
import PropTypes from "prop-types";
import "./Button.css";

export class Button extends Component {
    static propTypes = {
        value: PropTypes.string,
        className: PropTypes.string,
        action: PropTypes.func
    }
    
    constructor(props) {
        super(props);
        this.state = {
            contextMenu : null
        }
    }
    
    render() {
        return (
            <>
                <div className={`DefaultButton ${this.props.className}`} onClick={this.props.action}>{this.props.value}</div>
                { this.state.contextMenu && this.props.contextMenuOptions && this.props.contextMenuOptions.length > 0 && (
                    <ContextMenu  x={this.state.contextMenu.x} y={this.state.contextMenu.y} onClose={() => this.setState({ contextMenu: null })}>
                        <items>
                            {this.props.contextMenuOptions.map((option, index) => (
                                <ContextMenuItem key={index} value={option.value} action={option.action} />
                            ))}
                        </items>
                    </ContextMenu>
                )}
            </>
        )
    }
}

export class DefaultButton extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.string,
        size: PropTypes.string,
        disabled: PropTypes.bool,
        action: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button className={`${this.props.type}Button ${this.props.size}DefaultButton ${!this.props.disabled? 'enabled' : 'disabled'} ${this.props.className}`} value={this.props.value ? this.props.value : this.props.children} action={this.props.action} />
        )
    }
}