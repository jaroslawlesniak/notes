import React from 'react';
import Info from './info';
import LoadingSpinner from "./loadingSpinner"; 

class Main extends React.Component {
    constructor() {
        super();
        this.state = { notes: [], activeLink: 1, loadingSpinner: false }
    }

    render() {
        let InfoContainer;

        if(this.state.loadingSpinner === true) {
            InfoContainer = <LoadingSpinner message="Wczytywanie ..."/>;
        } else {
            if(this.state.activeLink === 1) {
                InfoContainer = <Info icon="icon-lightbulb" message="Tutaj pojawią się dodane przez Ciebie notatki"/>;
            } else if (this.state.activeLink === 2) {
                InfoContainer = <Info icon="icon-file-archive" message="Tutaj pojawiają się zarchiwizowane notatki"/>
            } else {
                InfoContainer = <Info icon="icon-trash-empty" message="Notatki są automatycznie usuwane z kosza po 7 dniach"/>
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
                        {  this.state.notes.length === 0 &&
                            InfoContainer
                        }
                    </div>
                </div>
            </main>
        );
    }

    createNotePrompt() {
        
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
    }
}

export default Main;