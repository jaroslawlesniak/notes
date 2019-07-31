import React from 'react';

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
                        <div className="info">
                            <div className="wrapper">
                                <i className="icon-lightbulb"></i>
                                <p>Tutaj pojawią się dodane przez Ciebie notatki</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;