import React from 'react';
import Info from './info';
import Note from './note';
import API from '../libs/api';
import METHOD from '../libs/method';
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
                    <Note key={ note.ID } note={ note } saveNote={ this.saveNote } />
                ));
                if(this.state.activeLink === 3) {
                    pageContent = (<div><i className='trashInfo'>Notatki są automatycznie usuwane z kosza po 7 dniach</i>{ pageContent }</div>)
                }
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
                    ID: json.id,
                    title: "",
                    content: "",
                    trash: 0,
                    archive: 0,
                    color: 0
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

    saveNote = (note) => {
        if(note.method !== METHOD.UPDATE_CONTENT) {
            for(let i in this.state.notes) {
                const singleNote = this.state.notes[i];
                singleNote.ID = parseInt(singleNote.ID);
                if(singleNote.ID === note.ID) {
                    const notes = this.state.notes;
                    notes.splice(i, 1)
                    this.setState({
                        notes: notes
                    });
                    break;
                }
            }
        }

        switch(note.method) {
            case METHOD.UPDATE_CONTENT:
                fetch(API.URL + "/notes.php?id=" + note.ID, {
                    method: "PUT",
                    body: JSON.stringify({note})
                });
            break;
            case METHOD.UPDATE_STATUS:
                fetch(API.URL + "/notes.php?id=" + note.ID, {
                    method: "PUT",
                    body: JSON.stringify({note})
                });
            break;
            case METHOD.DELETE:
                fetch(API.URL + "/notes.php?id=" + note.ID, {
                    method: "DELETE",
                    body: JSON.stringify({ pernament: false })
                });
            break;
            case METHOD.PERNAMENT_DELETE:
                fetch(API.URL + "/notes.php?id=" + note.ID, {
                    method: "DELETE",
                    body: JSON.stringify({ pernament: true })
                });
            break;
            default:
        }
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