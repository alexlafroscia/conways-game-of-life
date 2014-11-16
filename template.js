var Cell = React.createClass({displayName: 'Cell',
  getInitialState: function() {
    return { living: false };
  },

  render: function() {
    var classValue = '';
    if (this.state.living) {
      classValue += 'active';
    }
    return React.createElement("li", {className: classValue});
  }

});


var Row = React.createClass({displayName: 'Row',
  render: function() {
    var cells = this.props.cells.map(function(cell) {
      return React.createElement(Cell, null);
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
