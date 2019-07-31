import React from 'react';
import Info from './info';

class Main extends React.Component {
    render() {
        return (
            <main>
                <div className="row">
                    <div className="col-md-3 menu">
                        <div className="item"><i className="icon-plus"></i>Dodaj notatkę</div>
                        <div className="item active"><i className="icon-lightbulb"></i>Notatki</div>
                        <div className="item"><i className="icon-file-archive"></i>Archiwum</div>
                        <div className="item"><i className="icon-trash-empty"></i>Kosz</div>
                    </div>
                    <div className="col-md-9 notes">
                        <Info icon="icon-lightbulb" message="Tutaj pojawią się dodane przez Ciebie notatki"/>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;