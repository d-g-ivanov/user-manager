import React from 'react';

class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    onChange = (e) => this.setState( { [e.target.name]: e.target.value } );

    onSubmit = async (e) => {
        e.preventDefault();
        await this.props.submit( {
            username: this.state.username,
            password: this.state.password
        } );
        // this.setState( {  username: '', password: '' } );
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <label id="userLabel">Username</label>
                <input type="text" name="username" id="user" value={this.state.username} onChange={this.onChange}></input>
                <div className="underline"></div>
                <label id="passwordLabel">Password</label>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange}></input>
                <div className="underline"></div>
                <div className="submitButton">
                    <button>SIGN IN</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;
