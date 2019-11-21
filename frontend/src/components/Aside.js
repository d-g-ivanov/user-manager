import React from 'react';

//components
import LayoutChanger from './Layout';
import AppTitle from './AppTitle';
import LoginForm from './LoginForm';
import Logout from './Logout';

import UserForm from './UserForm';

//css
import '../css/aside.css';


class Aside extends React.Component {

    render () {

        const { apptitle, changeLayout, logged, showForm, formElementRef, closeForm, submitLogin, submitLogout, submitUserForm, addUser } = this.props;

        return (
            <div className={ showForm ? "left showForm" : "left" }>
                <div className="left-main">
                    { logged ? <LayoutChanger change={changeLayout} /> : ''}
                    <AppTitle mode={apptitle} />
                    { logged ?  (<button className="addUserButton" onClick={addUser}>Add New User</button>) : '' }
                    { logged ? <Logout submit={submitLogout}/> : <LoginForm submit={submitLogin} /> }
                </div>
                { logged && (<div className="left-aside">
                                <UserForm ref={formElementRef} submit={submitUserForm} closeForm={closeForm}/>
                            </div>) }
            </div>
        );
    }
}

export default Aside;
