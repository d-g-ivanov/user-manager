import React from 'react';

class AppTitle extends React.Component {

    render () {
        return (
            <div className="apptittle"> <h3>USER</h3><h3 className="colored">{this.props.mode}</h3> </div>
        );
    }
}

export default AppTitle;
