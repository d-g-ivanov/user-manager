import React from 'react';

class User extends React.Component {

    modify(id) {
        this.props.modifyUser(id);
    }

    render() {

        const { _id, name, about, company, picture } = this.props.data;

        const imgURL = require( "../" + picture);

        return (
            <article className="card-item" data-user={_id}>
                <div className="card-team-img">
                    <img src={imgURL} className="img-responsive" alt="" />
                </div>
                <div className="card-info">
                    <div>
                        <h6>{name}</h6>
                        <span>{company || "Not Specified"}</span>
                        <p>{about}</p>
                        <div className="actions">
                            {/* <a href={ "/users/" + _id } className="icon">
                                <i className="fas fa-info-circle"></i><br />Details
                            </a> */}
                            <button className="icon" onClick={this.modify.bind(this,_id)}>
                                <i className="far fa-edit"></i><br />Modify
                            </button>
                            <button className="icon" onClick={this.props.delete.bind(this, _id)}>
                                <i className="fas fa-user-times"></i><br />Delete
                            </button>
                        </div>
                    </div>
                </div>
            </article>);
        }
}

export default User;