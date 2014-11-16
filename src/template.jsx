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


var GameBoard = React.createClass({
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
      return <Cell></Cell>;
    }.bind(this));

    return (
      <ul className="grid">
        {cells }
      </ul>
    );
  }

});

React.render(<GameBoard />, document.body);
