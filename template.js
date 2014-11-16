var GameBoard = React.createClass({displayName: 'GameBoard',
  getInitialState: function() {
    return { cells: [
        { living: true  },
        { living: false }
      ]
    };
  },

  tick: function() {
    var newCells = this.state.cells;
    newCells.push({living: false});
    this.setState({ cells: newCells });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    var createCell = function(cell) {
      var classValue = "";
      if (cell.living) {
        classValue += 'active';
      }
      return React.createElement("li", {className: classValue});
    };

    return (
      React.createElement("ul", {className: "grid"}, 
        this.state.cells.map(createCell)
      )
    );
  }

});

React.render(React.createElement(GameBoard, null), document.body);
