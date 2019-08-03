import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                ID: parseInt(props.note.ID),
                title: props.note.title,
                content: props.note.content,
                archive: parseInt(props.note.archive),
                trash: parseInt(props.note.trash)
            }
        }
        this.prevState = {
            note: this.state.note
        }
    }

    render() {
        let buttons;

        if(this.state.note.trash === 0 && this.state.note.archive === 0) {
            buttons = (<div className="buttons">
                <i className="icon-file-archive" title="Zarchiwizuj notatkę" onClick={ () => { this.props.archiveNote(this.state.note.ID)} }></i>
                <i className="icon-trash-empty" title="Przenieś do kosza" onClick={ () => { this.props.deleteNote(this.state.note.ID)} }></i>
            </div>);
        }
        if(this.state.note.trash === 1) {
            buttons = (<div className="buttons">
                <i className="icon-trash-empty" title="Usuń na zawsze" onClick={ () => { this.props.deleteNote(this.state.note.ID)} }></i>
            </div>);
        }
        if(this.state.note.archive === 1 && this.state.note.trash === 0) {
            buttons = (<div className="buttons">
            <i className="icon-trash-empty" title="Przenieś do kosza" onClick={ () => { this.props.deleteNote(this.state.note.ID)} }></i>
        </div>);
        }
        

        return (
            <div className="note" id={ "note-" + this.state.note.ID }>
                <div className="header">
                    <input onChange={ () => { this.updateState() } } onBlur={ () => { this.saveNote() } } type="text" value={ this.state.note.title } />
                    { buttons }
                </div>
                <textarea onChange={ () => { this.updateState() } } onBlur={ () => { this.saveNote() } } value={ this.state.note.content }/>
            </div>
        );
    }

    saveNote() {
        if(this.prevState.note.title !== this.state.note.title || this.prevState.note.content !== this.state.note.content) {
            this.props.syncNote({
                ID: this.state.note.ID,
                title: this.state.note.title,
                content: this.state.note.content,
                archive: this.state.note.archive,
                trash: this.state.note.trash
            });
        }
    }

    updateState() {
        const note = document.querySelector("#note-" + this.state.note.ID);

        const inputValue = note.querySelector("input").value;
        const textareaValue = note.querySelector("textarea").value;

        this.setState({
            note: {
                ID: this.state.note.ID,
                title: inputValue,
                content: textareaValue,
                archive: this.state.note.archive,
                trash: this.state.note.trash
            }
        });
    }
}

export default Note;