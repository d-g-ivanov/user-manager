import React from 'react';

class LayoutChanger extends React.Component {

    render () {

        const { change } = this.props;

        return (
            <section name="layout">
                <input type="radio" name="gridLayout" id="tableView" value="tableVuew" onChange={change.bind(this, "tableView")} defaultChecked />
                <label htmlFor="tableView"><i className="fas fa-list"></i><br/>List</label>
                <input type="radio" name="gridLayout" id="columnsView" value="" onChange={change.bind(this, '')} />
                <label htmlFor="columnsView"><i className="fas fa-th"></i><br/>Grid</label>
            </section>
        );
    }
}

export default LayoutChanger;
