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
  getDefaultProps: function() {
    return { numRows: 9, numCols: 20 };
  },

  getInitialState: function() {
    var rows = [];
    var id = 0;
    for(i = 0; i < this.props.numRows; i++) {
      var cells = [];
      for (j = 0; j < this.props.numCols; j++) {
        cells[j] = { id: id++, living: false };
      }
      rows[i] = cells;
    }
    for(i = 0; i < 8; i++) {
      var row = Math.floor(Math.random() * (this.props.numRows));
      var col = Math.floor(Math.random() * (this.props.numCols));
      rows[row][col].living = true;
    }
    return { rows: rows};
  },

  // Toggle a cell's living state
  // Takes a Cell ID and updates the state of the component
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

  getNumLivingNeighbors: function(i, j) {
    var rows = this.state.rows;
    var numRows = this.props.numRows;
    var numCols = this.props.numCols;
    var count = 0;
    //  Check row number is valid   Check col is valid          Check if that cell is alive
    if ((i - 1) >= 0             && (j - 1) >= 0             && rows[i - 1][j - 1].living) count++;
    if ((i - 1) >= 0                                         && rows[i - 1][j    ].living) count++;
    if ((i - 1) >= 0             && (j + 1) <= (numCols - 1) && rows[i - 1][j + 1].living) count++;
    if (                            (j - 1) >= 0             && rows[i    ][j - 1].living) count++;
    if (                            (j + 1) <= (numCols - 1) && rows[i    ][j + 1].living) count++;
    if ((i + 1) <= (numRows - 1) && (j - 1) >= 0             && rows[i + 1][j - 1].living) count++;
    if ((i + 1) <= (numRows - 1)                             && rows[i + 1][j    ].living) count++;
    if ((i + 1) <= (numRows - 1) && (j + 1) <= (numCols - 1) && rows[i + 1][j + 1].living) count++;
    return count;
  },

  tick: function() {
    var cells = this.state.rows;
    for(i = 0; i < this.props.numRows; i++) {
      for (j = 0; j < this.props.numCols; j++) {
        var numLivingNeighbors = this.getNumLivingNeighbors(i, j);
        if (numLivingNeighbors < 2) {
          cells[i][j].living = false;
        } else if (numLivingNeighbors == 3) {
          cells[i][j] = true;
        } else if (numLivingNeighbors > 3) {
          cells[i][j] = false;
        }
      }
    }
    this.setState({ rows: cells });
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
