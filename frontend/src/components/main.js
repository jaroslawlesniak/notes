import React from 'react';
import Info from './info';
import Note from './note';
import API from '../libs/api';
import LoadingSpinner from './loadingSpinner';

class Main extends React.Component {
    constructor() {
        super();
        this.state = { notes: [], activeLink: 1, loading: false }
    }

    render() {
        let pageContent = "";

        if(this.state.loading === true) {
            pageContent = <LoadingSpinner message="Wczytywanie ..."/>
        } else {
        if(this.state.notes.length !== 0) {
            pageContent = this.state.notes.map(note => (
                <Note key={ note.id } id={ note.id } title={ note.title } content={ note.content } syncNote={ this.syncNote } deleteNote={ this.deleteNote } archiveNote={ this.archiveNote }/>
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
        }
        
        return (
            <main>
                <div className="row">
                    <div className="col-md-3 menu">
                        <div className="item" onClick={() => { this.createNewNote() }}><i className="icon-plus"></i>Dodaj notatkę</div>
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

    componentDidMount() {
        this.getNotes("inbox");  
    }

    createNewNote() {
        fetch(API.URL + "/notes.php", {
            method: "POST"
        })
        .then(res => res.json())
        .then(json => {
            if(!json.success) {
                alert("Wystąpił błąd podczas zapisu");
            } else {
                let notes = this.state.notes;
                notes.unshift({
                    id: json.id,
                    title: "",
                    content: ""
                });

                this.setState({
                    notes: notes
                });
            }
        });
    }

    getNotes(type) {
        this.setState({
            loading: true
        });
        fetch(API.URL + "/notes.php?category=" + type)
        .then(res => res.json())
        .then(json => {
            setTimeout(() => {
                this.setState({
                    notes: json.notes,
                    loading: false
                    });
            }, 300);
        });
    }

    syncNote = (note) => {
        fetch(API.URL + "/notes.php?id=" + note.id, {
            method: "PUT",
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(json => {
            if(!json.success) {
                alert("Wystąpił błąd podczas zapisu");
            }
        });
    }

    deleteNote = (noteID) => {
        fetch(API.URL + "/notes.php?id=" + noteID, {
            method: "DELETE",
            body: JSON.stringify(noteID)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                for(let i in this.state.notes) {
                    const note = this.state.notes[i];
                    if(note.id === noteID) {
                        const notes = this.state.notes;

                        notes.splice(i, 1)

                        this.setState({
                            notes: notes
                        });
                        break;
                    }
                }
            }
        });
    }

    archiveNote = (noteID) => {
        fetch(API.URL + "/notes.php?id=" + noteID, {
            method: "PUT",
            body: JSON.stringify({ type: "archive" })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                for(let i in this.state.notes) {
                    const note = this.state.notes[i];
                    if(note.id === noteID) {
                        const notes = this.state.notes;

                        notes.splice(i, 1)

                        this.setState({
                            notes: notes
                        });
                        break;
                    }
                }
            }
        });
    }

    selectMenuOption(e) {
        if(this.state.loading === false) {
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
}

export default Main;