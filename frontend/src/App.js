import React from 'react';
import axios from 'axios';

//components
import Aside from './components/Aside';
import Main from './components/Main';

//css
import './css/all.min.css';
import './css/styles.css';

class App extends React.Component {

  state = {
    users: [],
    gridLayout: 'tableView',
    apptitle: 'LOGIN',
    logged: false,
    showForm: false,
    isLoading: true
  }

  formElementRef = React.createRef();

  changeLayout = (layout) => {
    this.setState( { gridLayout: layout } );
  }

  //user form actions
  openForm = () => {
    this.setState( {showForm: true} )
  }

  closeForm = () => {
    this.setState( {showForm: false} )
  }

  async submitUserForm(data) {
    if (data.newUser) return await this.post(data)
    else return this.put(data)
  }

  modifyUser(id) {
    let user = this.state.users.filter( u => u._id === id)[0];

    this.formElementRef.current.changeState({
      user,
      newUser: false,
      id: id
    })

    this.openForm();
  }

  addUser() {
    this.formElementRef.current.changeState({
      user: {
        name: '',
        about: '',
        company: '',
        username: '',
        password: '',
      },
      newUser: true
    })

    this.openForm();
  }

  //api calls
  isLogged = async () => {
    let uri = "/api/login";

    try {
      return await axios.get(uri);
    } catch (err) {
      alert('Could not check loggin.');
    }
  }

  submitLogin = async (data) => {
    this.setState( { isLoading: true } );

    let uri = "/api/login";

    try {
      let res = await axios.post(uri, data);

      if (res.data.isLogged) {
        await this.get();
        this.setState({ logged: true, apptitle: "MANAGER" });
      }
      else alert('Credentials might be wrong, please try again.');
    } catch (err) {
      alert('Could not authenticate. Please try again.')
    }

    this.setState( { isLoading: false } );
  }

  submitLogout = async () => {
    this.setState( { isLoading: true } );

    let uri = "/api/logout";

    try {
      let res = await axios.get(uri);

      this.setState({ logged: res.data.isLogged, users: [], apptitle: 'LOGIN', gridLayout: 'tableView' });

      if (res.data.isLogged) alert('Logout failed.');
    } catch (err) {
      alert('Could not logout. Please try again.')
    }

    this.setState( { isLoading: false } );
  }

  get = async () => {
    let uri = "/api/users";

    try {
      let res = (await axios.get(uri)).data;
      if (res.success) this.setState( { users: res.data } );
    } catch (err) {
      alert('Could not fetch data. Please try again.');
    }
  }

  post = async (data) => {
    this.setState( { isLoading: true } );

    let uri = "/api/users";

    try {
      let res = (await axios.post(uri, data.user)).data;

      if (res.success) {
        this.setState( {users: [res.data, ...this.state.users]} );
        this.setState( { isLoading: false } );
        return res;
      } else {
        this.setState( { isLoading: false } );
        return res;
      }
    } catch (err) {
      alert('Could not create user. Please try again.');
    }

    this.setState( { isLoading: false } );
  }

  put = async (data) => {
    this.setState( { isLoading: true } );

    let uri = `/api/users/${data.id}`;

    try {
      let res = (await axios.put(uri, data.user)).data;

      if (res.success) {
        let users = this.state.users.map( user => {
          if (user._id === res.data._id) {
            return { ...res.data };
          }
          return user;
        });
        this.setState( {users: [...users] } );
        this.setState( { isLoading: false } );
        return res;
      } else {
        this.setState( { isLoading: false } );
        return res;
      }
    } catch (err) {
      alert('Could not update user. Please try again.');
    }

    this.setState( { isLoading: false } );
  }

  delete = async (id) => {
    this.setState( { isLoading: true } );

    let uri = `/api/users/${id}`;

    try {
      let res = (await axios.delete(uri)).data;
      
      if (res.success) {
        this.setState( {users: [...this.state.users.filter( user => user._id !== id )]} );
      } else {
        alert('Could not delete user. Please try again.');
      }
    } catch (err) {
      alert('Could not delete user. Please try again.');
    }

    this.setState( { isLoading: false } );
  }

  //
  async componentDidMount() {
    let isLogged = (await this.isLogged()).data.isLogged;

    this.setState({ logged: isLogged, apptitle: isLogged ? "MANAGER" : "LOGIN" });

    if (isLogged) await this.get();

    this.setState( { isLoading: false } );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <div className="loader"><div className="spinner"></div></div>}
        <div className="container" id="container">
          <Aside 
            apptitle={this.state.apptitle}
            logged={this.state.logged}
            showForm={this.state.showForm}
            openForm={this.openForm}
            closeForm={this.closeForm}
            submitLogin={this.submitLogin} 
            submitLogout={this.submitLogout}
            submitUserForm={this.submitUserForm.bind(this)}
            changeLayout={this.changeLayout}
            addUser={this.addUser.bind(this)}
            
            formElementRef={this.formElementRef}/>
          <Main 
            users={this.state.users} 
            gridLayout={this.state.gridLayout} 
            logged={this.state.logged} 
            deleteAction={this.delete}
            modifyUser={this.modifyUser.bind(this)} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
