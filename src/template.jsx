var Cell = React.createClass({
  getInitialState: function() {
    return { living: this.props.living };
  },

  toggleLiving: function() {
    this.props.living = !this.props.living;
    this.setState({ living: !this.state.living });
  },

  render: function() {
    var classValue = '';
    this.state.living = this.props.living;
    if (this.state.living) {
      classValue += 'active';
    }
    return <li className={classValue} onClick={this.toggleLiving} ></li>;
  }

});


var Row = React.createClass({
  render: function() {
    var cells = this.props.cells.map(function(cell) {
      return <Cell living={cell.living}></Cell>;
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
        cells[j] = { living: true };
      }
      rows[i] = cells;
    }
    return { rows: rows};
  },

  tick: function() {
    var newRows = this.state.rows;
    var randomRow = Math.floor(Math.random() * 8);
    var randomColumn = Math.floor(Math.random() * 20);
    var cell = newRows[randomRow][randomColumn];
    cell.living = !cell.living;
    this.setState({ rows: newRows });
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
