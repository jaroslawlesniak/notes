import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            content: props.content
        }
    }

    render() {
        return (
            <div className="note" id={ "note-" + this.state.id }>
                <input onChange={ () => { this.syncNote() } } onBlur={ () => { this.saveNote() } } type="text" value={ this.state.title } />
                <textarea onChange={ () => { this.syncNote() } } onBlur={ () => { this.saveNote() } } value={ this.state.content }/>
            </div>
        );
    }

    saveNote() {
        this.props.syncNote({
            id: this.state.id,
            title: this.state.title,
            content: this.state.content
        });
    }

    syncNote() {
        const note = document.querySelector("#note-" + this.state.id);

        const inputValue = note.querySelector("input").value;
        const textareaValue = note.querySelector("textarea").value;

        this.setState({
            title: inputValue,
            content: textareaValue
        });
    }
}

export default Note;