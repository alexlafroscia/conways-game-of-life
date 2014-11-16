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


var GameBoard = React.createClass({displayName: 'GameBoard',
  getInitialState: function() {
    var cells = [];
    for(i = 0; i < 90; i++) {
      cells[i] = new Cell();
    }
    return { cells: cells };
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
    var cells = this.state.cells.map(function(cell) {
      return React.createElement(Cell, null);
    }.bind(this));

    return (
      React.createElement("ul", {className: "grid"}, 
        cells 
      )
    );
  }

});

React.render(React.createElement(GameBoard, null), document.body);
