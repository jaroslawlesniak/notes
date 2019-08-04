import React from 'react';
import METHOD from '../libs/method';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: parseInt(props.note.ID),
            title: props.note.title,
            content: props.note.content,
            archive: parseInt(props.note.archive),
            trash: parseInt(props.note.trash)
        }
    }

    render() {
        let buttons;

        if(this.state.trash === 0 && this.state.archive === 0) {
            buttons = (<div className="buttons">
                <i className="icon-file-archive" title="Zarchiwizuj notatkę" onClick={ () => this.archiveNote() }></i>
                <i className="icon-trash-empty" title="Przenieś do kosza" onClick={ () => this.deleteNote() }></i>
            </div>);
        }
        if(this.state.trash === 1) {
            buttons = (<div className="buttons">
                <i className="icon-ccw" title="Przywróć z kosza" onClick={ () => this.restoreNote() }></i>
                <i className="icon-trash-empty" title="Usuń na zawsze" onClick={ () => this.deleteNote() }></i>
            </div>);
        }
        if(this.state.archive === 1 && this.state.trash === 0) {
            buttons = (<div className="buttons">
            <i className="icon-ccw" title="Przywróć z archiwum" onClick={ () => this.unarchiveNote() }></i>
            <i className="icon-trash-empty" title="Przenieś do kosza" onClick={ () => this.deleteNote() }></i>
        </div>);
        }
        

        return (
            <div className="note" id={ "note-" + this.state.ID }>
                <div className="header">
                    <input onChange={ () => { this.updateTextState() } } onBlur={ () => { this.saveNote(METHOD.UPDATE_CONTENT) } } type="text" value={ this.state.title } />
                    { buttons }
                </div>
                <textarea onChange={ () => { this.updateTextState() } } onBlur={ () => { this.saveNote(METHOD.UPDATE_CONTENT) } } value={ this.state.content }/>
            </div>
        );
    }

    updateTextState() {
        const note = document.querySelector("#note-" + this.state.ID);

        const inputValue = note.querySelector("input").value;
        const textareaValue = note.querySelector("textarea").value;

        this.setState({
            title: inputValue,
            content: textareaValue
        });
    }

    deleteNote() {
        this.setState({
            trash: 1
        }, () => { this.saveNote(METHOD.UPDATE_STATUS) });
    }

    archiveNote() {
        this.setState({
            archive: 1
        }, () => { this.saveNote(METHOD.UPDATE_STATUS) });
    }
    
    restoreNote() {
        this.setState({
            trash: 0
        }, () => { this.saveNote(METHOD.UPDATE_STATUS) });
    }

    unarchiveNote() {
        this.setState({
            archive: 0
        }, () => { this.saveNote(METHOD.UPDATE_STATUS) });
    }

    deleteForever() {
        this.setState({
            trash: 1
        }, () => { this.saveNote(METHOD.DELETE) });
    }

    saveNote(updateMethod) {
        this.props.saveNote({
            ID: this.state.ID,
            title: this.state.title,
            content: this.state.content,
            archive: this.state.archive,
            trash: this.state.trash,
            method: updateMethod
        });
    }
}

export default Note;