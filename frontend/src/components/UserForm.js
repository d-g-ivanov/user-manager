import React from 'react';

class UserForm extends React.Component {

    state = {
        user: {
            name: '',
            about: '',
            company: '',
            username: '',
            password: '',
        },
        newUser: true,
        updated: {},
        errors: {
            name: '',
            about: '',
            company: '',
            username: '',
            password: '',
        }
    }

    resetState = () => {
        this.setState( {
            user: {
                name: '',
                about: '',
                company: '',
                username: '',
                password: '',
            },
            newUser: true,
            updated: {},
            errors: {
                name: '',
                about: '',
                company: '',
                username: '',
                password: '',
            }
        } );
    }

    changeState = (data) => {
        this.setState(data);
    }

    onChange = (e) => {
        this.setState( { user: { ...this.state.user, [e.target.name]: e.target.value } } );
        if (!this.state.newUser) this.setState( { updated: { ...this.state.updated, [e.target.name]: e.target.value } } );
    };

    onSubmit = async (e) => {
        e.preventDefault();
        
        let payload;

        if (this.state.newUser) payload = { user: {...this.state.user}, newUser: true };
        else payload = { user: {...this.state.updated}, newUser: false }

        payload.id = this.state.id;

        let res = await this.props.submit(payload);

        if (!res.success) {
            this.setState({ errors: res.data });
            return;
        }

        this.props.closeForm();

        //reset state
        this.resetState();
    }

    close = () => {
        this.props.closeForm();
        this.resetState();
    }

    render () {
        return (
            <React.Fragment>
                <button className="closeFormButton" onClick={this.close}>&times;</button>
                <form onSubmit={this.onSubmit}>
                    <label>Name</label>
                    <input required autoComplete="off" type="text" name="name" value={this.state.user.name} onChange={this.onChange}></input>
                    <div className="underline"></div>
                    <div className="submit-error">{this.state.errors.name || ''}</div>

                    <label>Company</label>
                    <input type="text" autoComplete="off" name="company" value={this.state.user.company} onChange={this.onChange}></input>
                    <div className="underline"></div>
                    <div className="submit-error">{this.state.errors.company || ''}</div>

                    <label>Description</label>
                    <textarea required autoComplete="off" type="text" name="about" value={this.state.user.about} onChange={this.onChange}></textarea>
                    <div className="underline"></div>
                    <div className="submit-error">{this.state.errors.about || ''}</div>

                    <label>Username</label>
                    <input required autoComplete="off" type="text" name="username" value={this.state.user.username} onChange={this.onChange}></input>
                    <div className="underline"></div>
                    <div className="submit-error">{this.state.errors.username || ''}</div>

                    <label>Password</label>
                    <input required autoComplete="off" type="password" name="password" value={this.state.user.password} onChange={this.onChange}></input>
                    <div className="underline"></div>
                    <div className="submit-error">{this.state.errors.password || ''}</div>

                    <div className="submitButton">
                        <button>SUBMIT</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default UserForm;
