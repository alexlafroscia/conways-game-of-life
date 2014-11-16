var Cell = React.createClass({displayName: 'Cell',
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
    return React.createElement("li", {className: classValue, onClick: this.toggleLiving});
  }

});


var Row = React.createClass({displayName: 'Row',
  render: function() {
    var cells = this.props.cells.map(function(cell) {
      return React.createElement(Cell, {living: cell.living});
    }.bind(this));

    return (
      React.createElement("li", null, 
        React.createElement("ul", {className: "row"}, 
          cells
        )
      )
    );
  }
});


var GameBoard = React.createClass({displayName: 'GameBoard',
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
      return React.createElement(Row, {cells: row});
    }.bind(this));

    return (
      React.createElement("ul", {className: "grid"}, 
        rows
      )
    );
  }

});

React.render(React.createElement(GameBoard, null), document.body);
