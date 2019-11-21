import React from 'react';

class Logout extends React.Component {

    onClick = (e) => {
        this.props.submit();
    }

    render () {
        return (
            <section name="logout">
                <button onClick={this.onClick}>Logout</button>
            </section>
        );
    }
}

export default Logout;
