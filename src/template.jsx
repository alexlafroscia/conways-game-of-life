var Cell = React.createClass({
  getInitialState: function() {
    return { living: false };
  },

  render: function() {
    var classValue = '';
    if (this.state.living) {
      classValue += 'active';
    }
    return <li className={classValue}></li>;
  }

});


var Row = React.createClass({
  render: function() {
    var cells = this.props.cells.map(function(cell) {
      return <Cell></Cell>;
    }.bind(this));

    return (
      <li>
        <ul className="row">
          {cells}
        </ul>
      </li>
    );
  }
});


var GameBoard = React.createClass({
  getInitialState: function() {
    var rows = [];
    for(i = 0; i < 8; i++) {
      var cells = [];
      for (j = 0; j < 20; j++) {
        cells[j] = new Cell();
      }
      rows[i] = cells;
    }
    console.debug(rows);
    return { rows: rows};
  },

  tick: function() {
    // var newCells = this.state.cells;
    // newCells.push( new Cell() );
    // this.setState({ cells: newCells });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    var rows = this.state.rows.map(function(row) {
      return <Row cells={row} ></Row>;
    }.bind(this));

    return (
      <ul className="grid">
        {rows}
      </ul>
    );
  }

});

React.render(<GameBoard />, document.body);
