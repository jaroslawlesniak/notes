import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props
        }
    }

    render() {
        return (
            <div className="note">
                <input type="text" value={ this.state.props.title } />
                <textarea>{ this.state.props.content }</textarea>
            </div>
        );
    }
}

export default Note;