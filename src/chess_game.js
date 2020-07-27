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
      isFirstWhiteMove: true,
      isFirstBlackMove: true,
      squares: JSON.parse(this.init),
      isFirstClick: true,
      fromI: "",
      fromJ: 0,
      whiteIsNext: true,
    };
  }

  isCurrentPlayerPiece(piece) {
    let player = this.state.whiteIsNext ? "-W" : "-B";
    return piece.includes(player);
  }

  isMoveLegal(piece, i, j) {
    // Convertit les indices de ligne en nombre.
    let numI =  i.charCodeAt(0) - 96;
    let fromI = this.state.fromI.charCodeAt(0) - 96;

    //Inverse les indices de ligne pour les blancs.
    if (this.state.whiteIsNext) {
      numI = 9 - numI;
      fromI = 9 - fromI;
    }

    let fromJ = this.state.fromJ;

    // Test
    console.log(`${numI}, ${j}`);
    console.log(`${fromI}, ${fromJ}`);

    // Ne pas capturer sa propre pièce.
    // if (this.state.squares[i][j])

    switch (piece.charAt(0)) {
      case 'P':
        // TODO Cas du premier coup.
        let isStartPos = fromI === 2;
        let inFront = this.state.whiteIsNext ? "f" : "c";
        let isMiddleEmpty = this.state.squares[inFront][fromJ] === "";
        let isUpByTwo = (numI - fromI === 2) && (j - fromJ === 0);
        let isPremier = isStartPos && isUpByTwo && isMiddleEmpty;
        // Coup régulier.
        let isReg = (numI - fromI === 1) && (j - fromJ === 0);
        // Coup de capture.
        let enemy = this.state.whiteIsNext ? "B" : "W";
        let isEnemy = this.state.squares[i][j].charAt(2) === enemy;
        let isDiagMove = (Math.abs(numI - fromI) === 1) && (Math.abs(j - fromJ));
        let isCapture = isDiagMove && isEnemy;
        return isPremier || isReg || isCapture;
      case 'R':
        return true;
      case 'N':
        return true;
      case 'B':
        return true;
      case 'Q':
        return true;
      case 'K':
        return true;
      default:
        return false;
    }
  }

  handleClick(i, j) {
    let clickedPiece = this.state.squares[i][j];

    // First, click a square containing a current player's piece.
    if (this.state.isFirstClick) {
      if (clickedPiece !== "" && this.isCurrentPlayerPiece(clickedPiece)) {
        document.getElementById(i + j).classList.add("clicked");
        this.setState({
          isFirstClick: !this.state.isFirstClick,
          fromI: i,
          fromJ: j,
        })
      }
    } else {  // Then, click the destination square to move the piece.
      let fromI = this.state.fromI;
      let fromJ = this.state.fromJ;
      let movingPiece = this.state.squares[fromI][fromJ];
      let prevSquare = document.getElementById(fromI + fromJ);

      // If click the same square, unselect it. 
      if (i === fromI && j === fromJ) {
        prevSquare.classList.remove("clicked");
        this.setState({
          isFirstClick: !this.state.isFirstClick,
          fromI: "",
          fromJ: 0,
        });
      } else {  // Else, try moving the piece.
        if (
          !this.isCurrentPlayerPiece(clickedPiece) &&
          this.isMoveLegal(movingPiece, i, j)
        ) {
          // Swap squares' states.
          this.setState(prevState => ({
            squares: {
              ...prevState.squares,
              [i]: {
                ...prevState.squares[i],
                [j]: movingPiece,
              },
              [fromI]: {
                ...prevState.squares[fromI],
                [fromJ]: "",
              }
            },
            // Reset move state.
            isFirstClick: !prevState.isFirstClick,
            fromI: "",
            fromJ: 0,
            whiteIsNext: !prevState.whiteIsNext,
            isFirstWhiteMove: false,
            isFirstBlackMove: this.state.isFirstWhiteMove ? true : false,
          }));
          // Remove selection indicator.
          prevSquare.classList.remove("clicked");
        }
      }
    }
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
          onClick={(i, j) => this.handleClick(i, j)}
        />
      </div>
    );
  }
}

const domContainer = document.querySelector('#chess_game');
ReactDOM.render(<ChessGame/>, domContainer);

// ============================================================================

