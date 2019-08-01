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
                <h1>{ this.state.props.title }</h1>
                <p>{ this.state.props.content }</p>
            </div>
        );
    }
}

export default Note;