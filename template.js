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
    var styles = {
      width: "" + this.props.cellSize + "px",
      height: "" + this.props.cellSize + "px",
      borderWidth: "" + (this.props.cellSize / 5.3) + "px"
    };
    return React.createElement("li", {style: styles, 
               className: classValue, 
               onClick: this.clickHandler}
           );
  }

});


var Row = React.createClass({displayName: 'Row',
  render: function() {
    var cells = this.props.cells.map(function(cell) {
    return React.createElement(Cell, {key: cell.id, 
                 id: cell.id, 
                 living: cell.living, 
                 onClick: this.props.cellClick, 
                 cellSize: this.props.cellSize}
           );
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
    return { numRows: 8, numCols: 20, cellSize: '60', rows: [] };
  },

  getInitialState: function() {
    this.setNumRowsAndCols();
    var rows = [];
    var id = 0;
    for(i = 0; i < this.props.numRows; i++) {
      var cells = [];
      for (j = 0; j < this.props.numCols; j++) {
        cells[j] = { id: id++, living: false };
      }
      rows[i] = cells;
    }
    for(i = 0; i < 20; i++) {
      var row = Math.floor(Math.random() * (this.props.numRows));
      var col = Math.floor(Math.random() * (this.props.numCols));
      rows[row][col].living = true;
    }
    return { rows: rows};
  },

  // Toggle a cell's living state
  // Takes a Cell ID and updates the state of the component
  toggleCell: function(id) {
    clearInterval(this.interval);
    var rows = this.props.rows;
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
    this.interval = setInterval(this.tick, 100);
  },

  getNumLivingNeighbors: function(i, j) {
    var rows = this.props.rows;
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
    this.props.rows = this.state.rows.slice(0);
    var cells = this.props.rows;
    for(i = 0; i < this.props.numRows; i++) {
      for (j = 0; j < this.props.numCols; j++) {
        var numLivingNeighbors = this.getNumLivingNeighbors(i, j);
        if (numLivingNeighbors < 2) {
          cells[i][j].living = false;
        } else if (numLivingNeighbors == 3) {
          cells[i][j].living = true;
        } else if (numLivingNeighbors > 3) {
          cells[i][j].living = false;
        }
      }
    }
    this.setState({ rows: cells });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 100);
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.handleResize);
  },


  // Handle Resize
  handleResize: function() {
    this.setNumRowsAndCols();
  },

  setNumRowsAndCols: function() {
    console.debug('tst');
    var width = window.innerWidth;
    this.props.numCols = Math.floor(width / this.props.cellSize);
    var height = window.innerHeight;
    this.props.numRows = Math.floor(height / this.props.cellSize) - 1;
  },

  // Render
  render: function() {
    var self = this;
    var rows = this.state.rows.map(function(row) {
      return React.createElement(Row, {cells: row, cellClick: self.toggleCell, cellSize: self.props.cellSize});
    }.bind(this));

    return (
      React.createElement("ul", {className: "grid"}, 
        rows
      )
    );
  }

});

React.render(React.createElement(GameBoard, null), document.body);
