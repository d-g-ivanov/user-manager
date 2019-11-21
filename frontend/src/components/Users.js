import React from 'react';
import User from './User';

class Users extends React.Component {

    render () {
        return (
            <div id="app" className={"card-container " + this.props.layout}>
                { this.props.data.map( (user) => ( 
                        <User 
                            data={user} 
                            key={user._id} 
                            delete={this.props.delete}
                            modifyUser={this.props.modifyUser} />
                        ) 
                    ) }       
            </div>
        );
    }
}

export default Users;
