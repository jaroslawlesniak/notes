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
            trash: parseInt(props.note.trash),
            color: parseInt(props.note.color)
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
                <i className="icon-trash-empty" title="Usuń na zawsze" onClick={ () => this.pernamentDeleteNote() }></i>
            </div>);
        }
        if(this.state.archive === 1 && this.state.trash === 0) {
            buttons = (<div className="buttons">
            <i className="icon-ccw" title="Przywróć z archiwum" onClick={ () => this.unarchiveNote() }></i>
            <i className="icon-trash-empty" title="Przenieś do kosza" onClick={ () => this.deleteNote() }></i>
        </div>);
        }
        

        return (
            <div className={"note color-" + this.state.color + " lighten"} id={ "note-" + this.state.ID }>
                <div className={"header color-" + this.state.color }>
                    <input onChange={ () => { this.updateTextState() } } onBlur={ () => { this.saveNote(METHOD.UPDATE_CONTENT) } } type="text" value={ this.state.title } />
                    { buttons }
                </div>
                <textarea onChange={ () => { this.updateTextState() } } onBlur={ () => { this.saveNote(METHOD.UPDATE_CONTENT) } } value={ this.state.content }/>
                <div className="palette">
                    <i className="icon-palette" title="Zmień kolor notatki"></i>
                    <div className="list">
                        <div className="color yellow" onClick={ () => { this.setColor(0) }}></div>
                        <div className="color purple" onClick={ () => { this.setColor(1) }}></div>
                        <div className="color green" onClick={ () => { this.setColor(2) }}></div>
                        <div className="color blue" onClick={ () => { this.setColor(3) }}></div>
                        <div className="color gray" onClick={ () => { this.setColor(4) }}></div>
                    </div>
                </div>
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
        }, () => { this.saveNote(METHOD.DELETE) });
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

    pernamentDeleteNote() {
        this.setState({
            trash: 1
        }, () => { this.saveNote(METHOD.PERNAMENT_DELETE) });
    }

    setColor(color) {
        this.setState({
            color: color
        }, () => { this.saveNote(METHOD.UPDATE_CONTENT) });
    }

    saveNote(updateMethod) {
        this.props.saveNote({
            ID: this.state.ID,
            title: this.state.title,
            content: this.state.content,
            archive: this.state.archive,
            trash: this.state.trash,
            color: this.state.color,
            method: updateMethod
        });
    }
}

export default Note;