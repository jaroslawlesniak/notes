import React from 'react';
import Info from './info';
import LoadingSpinner from "./loadingSpinner";
import Note from './note';

class Main extends React.Component {
    constructor() {
        super();
        this.state = { notes: [], activeLink: 1, loadingSpinner: false }
    }

    render() {
        let pageContent = "";

        if(this.state.notes.length !== 0) {
            pageContent = this.state.notes.map(note => (
                <Note key={ note.id } title={ note.title } content={ note.content }/>
            ));
        } else {
            if(this.state.activeLink === 1) {
                pageContent = <Info icon="icon-lightbulb" message="Tutaj pojawią się dodane przez Ciebie notatki"/>;
            } else if (this.state.activeLink === 2) {
                pageContent = <Info icon="icon-file-archive" message="Tutaj pojawiają się zarchiwizowane notatki"/>
            } else {
                pageContent = <Info icon="icon-trash-empty" message="Notatki są automatycznie usuwane z kosza po 7 dniach"/>
            }
        }
        
        return (
            <main>
                <div className="row">
                    <div className="col-md-3 menu">
                        <div className="item" onClick={() => { this.createNotePrompt() }}><i className="icon-plus"></i>Dodaj notatkę</div>
                        <div className="item active" onClick={ () => { this.selectMenuOption(1) }}><i className="icon-lightbulb"></i>Notatki</div>
                        <div className="item" onClick={ () => { this.selectMenuOption(2) }}><i className="icon-file-archive"></i>Archiwum</div>
                        <div className="item" onClick={ () => { this.selectMenuOption(3) }}><i className="icon-trash-empty"></i>Kosz</div>
                    </div>
                    <div className="col-md-9 notes">
                        { pageContent }
                    </div>
                </div>
            </main>
        );
    }

    createNotePrompt() {
        
    }

    componentDidMount() {
        this.getNotes("inbox");  
    }

    getNotes(type) {
        fetch("http://localhost:8000/notes.php?category=" + type)
        .then(res => res.json())
        .then(json => this.setState({
            notes: json.notes
        }));
    }

    selectMenuOption(e) {
        const menuItems = document.querySelectorAll(".menu .item");
        
        for(let menuItem of menuItems) {
            menuItem.setAttribute("class", "item");
        }

        menuItems[e].setAttribute("class", "item active");
        this.setState({
            activeLink: e
        });

        const notes = ["inbox", "archive", "trash"];

        this.getNotes(notes[e - 1]);
    }
}

export default Main;