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
    this.init = `{
      "a": {
        "1": "R-B",
        "2": "N-B",
        "3": "B-B",
        "4": "Q-B",
        "5": "K-B",
        "6": "B-B",
        "7": "N-B",
        "8": "R-B"
      },
      "b": {
        "1": "P-B",
        "2": "P-B",
        "3": "P-B",
        "4": "P-B",
        "5": "P-B",
        "6": "P-B",
        "7": "P-B",
        "8": "P-B"
      },
      "c": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": ""
      },
      "d": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": ""
      },
      "e": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": ""
      },
      "f": {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": ""
      },
      "g": {
        "1": "P-W",
        "2": "P-W",
        "3": "P-W",
        "4": "P-W",
        "5": "P-W",
        "6": "P-W",
        "7": "P-W",
        "8": "P-W"
      },
      "h": {
        "1": "R-W",
        "2": "N-W",
        "3": "B-W",
        "4": "Q-W",
        "5": "K-W",
        "6": "B-W",
        "7": "N-W",
        "8": "R-W"
      }
    }`;
    this.state = {
      squares: JSON.parse(this.init),
      whiteIsNext: true,
    };
  }

  render() {
    let status = "Prochain joueur : " + (this.state.whiteIsNext ? "blanc" : "noir");

    return (
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <Board
          squares={this.state.squares}
        />
      </div>
    );
  }
}

const domContainer = document.querySelector('#chess_game');
ReactDOM.render(<ChessGame/>, domContainer);

// ============================================================================

