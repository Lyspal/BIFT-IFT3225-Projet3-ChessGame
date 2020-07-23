'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour le jeu d'échecs
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

class ChessGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#chess_game');
ReactDOM.render(<ChessGame/>, domContainer);