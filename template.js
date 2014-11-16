var Cell = React.createClass({displayName: 'Cell',
  getInitialState: function() {
    return { living: this.props.living };
  },

  clickHandler: function() {
    this.props.onClick(this.props.id);
  },

  render: function() {
    var classValue = '';
    this.state.living = this.props.living;
    if (this.state.living) {
      classValue += 'active';
    }
    return React.createElement("li", {className: classValue, onClick: this.clickHandler});
  }

});


var Row = React.createClass({displayName: 'Row',
  render: function() {
    var cells = this.props.cells.map(function(cell) {
      return React.createElement(Cell, {key: cell.id, id: cell.id, living: cell.living, onClick: this.props.cellClick});
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
    var id = 0;
    for(i = 0; i < 8; i++) {
      var cells = [];
      for (j = 0; j < 20; j++) {
        cells[j] = { id: id++, living: false };
      }
      rows[i] = cells;
    }
    return { rows: rows};
  },

  toggleCell: function(id) {
    var rows = this.state.rows;
    var i, j;

    rowLoop:
      for (i = 0; i < rows.length; i++) {
        var row = rows[i];
    cellLoop:
        for(j = 0; j < row.length; j++) {
          if (row[j].id == id) {
            break rowLoop;
          }
        }
      }

    rows[i][j].living = !rows[i][j].living;
    this.setState({ rows: rows });
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
    var self = this;
    var rows = this.state.rows.map(function(row) {
      return React.createElement(Row, {cells: row, cellClick: self.toggleCell});
    }.bind(this));

    return (
      React.createElement("ul", {className: "grid"}, 
        rows
      )
    );
  }

});

React.render(React.createElement(GameBoard, null), document.body);
