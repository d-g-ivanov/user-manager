import React from 'react';

//components
import Users from './Users';

//css
import '../css/main.css';


class Main extends React.Component {

    renderHeaderAndGrid = (users, gridLayout, deleteAction, modifyUser) => {
        return (
            <React.Fragment>
                <header>
                    <h4>The Crew</h4>
                    <h2>Check Out Our <span className="colored">Talented</span> Team</h2>
                </header>
                <Users data={users} layout={gridLayout} delete={deleteAction} modifyUser={modifyUser} />
            </React.Fragment>
        );
    }

    render() {

        const { users, gridLayout, logged, deleteAction, modifyUser } = this.props;

        return (
            <div className="right">
                
                { logged && this.renderHeaderAndGrid(users, gridLayout, deleteAction, modifyUser) }

                <footer>
                    Daniel Ivanov , 2019
                </footer>
            </div>
        );
    }
}

export default Main;
