'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour le jeu d'échecs
// La forme du présent code s'inspire du tutoriel introductif officiel de
// React, disponible à l'adresse : https://reactjs.org/tutorial/tutorial.html,
// que nous avons largement adapté et augmenté pour les fins du devoir.

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
      winner: "",
    };
    this.restart = this.restart.bind(this);
    this.load = this.load.bind(this);
  }

  // Recommence une partie en remettant la grille à l'état initial.
  restart() {
    this.setState({
      isFirstWhiteMove: true,
      isFirstBlackMove: true,
      squares: JSON.parse(this.init),
      isFirstClick: true,
      fromI: "",
      fromJ: 0,
      whiteIsNext: true,
      winner: "",
    });
  }

  // Requête asynchrone pour la tâche 2 des consignes, en utilisant l'API fetch.
  load() {
    fetch('http://www-ens.iro.umontreal.ca/~levestev/resources/ift3225/tp3/chess.json')
      .then(response => response.json())
      .then(data => {
        // Change Kn pour N.
        for (let i in data) {
          for (let j in data[i]) {
            if (data[i][j] === "Kn-B") {
              data[i][j] = "N-B";
            } else if (data[i][j] === "Kn-W") {
              data[i][j] = "N-W";
            }
          }
        }

        this.setState({
          squares: data,
        });
      })
      .catch(error => {
        console.log(error);
      })
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

    switch (piece.charAt(0)) {
      case 'P':
        // Cas du premier coup.
        let isStartPos = fromI === 2;
        let inFront = this.state.whiteIsNext ? "f" : "c";
        let isMiddleEmpty = this.state.squares[inFront][fromJ] === "";
        let isUpByTwo = (numI - fromI === 2) && (j - fromJ === 0);
        let isPremier = isStartPos && isUpByTwo && isMiddleEmpty;
        // Coup régulier.
        let isEmpty = this.state.squares[i][j] === "";
        let isForward = (numI - fromI === 1) && (j - fromJ === 0);
        let isReg = isEmpty && isForward;
        // Coup de capture.
        let enemy = this.state.whiteIsNext ? "B" : "W";
        let isEnemy = this.state.squares[i][j].charAt(2) === enemy;
        let isDiagMove = (numI - fromI === 1) && (Math.abs(j - fromJ) === 1);
        let isCapture = isDiagMove && isEnemy;
        return isPremier || isReg || isCapture;
      case 'R':
        return (Math.abs(numI - fromI) === 0) || (Math.abs(j - fromJ) === 0);
      case 'N':
        let isVL = (Math.abs(numI - fromI) === 2) && (Math.abs(j - fromJ) === 1);
        let isHL = (Math.abs(numI - fromI) === 1) && (Math.abs(j - fromJ) === 2);
        return isVL || isHL;
      case 'B':
        return Math.abs(numI - fromI) === Math.abs(j - fromJ);
      case 'Q':
        let likeR = (Math.abs(numI - fromI) === 0) || (Math.abs(j - fromJ) === 0);
        let likeB = Math.abs(numI - fromI) === Math.abs(j - fromJ);
        return likeR || likeB;
      case 'K':
        return (Math.abs(numI - fromI) <= 1) && (Math.abs(j - fromJ) <= 1);
      default:
        return false;
    }
  }

  handleClick(i, j) {
    if (this.state.winner === "") {
      let clickedPiece = this.state.squares[i][j];

      // Premier clic sur une cellule contenant une pièce du joueur actuel.
      if (this.state.isFirstClick) {
        if (clickedPiece !== "" && this.isCurrentPlayerPiece(clickedPiece)) {
          document.getElementById(i + j).classList.add("clicked");
          this.setState({
            // Met à jour l'état du mouvement.
            isFirstClick: !this.state.isFirstClick,
            fromI: i,
            fromJ: j,
          })
        }
      } else {  // Deuxième clic sur la cellule de destination pour bouger la pièce.
        let fromI = this.state.fromI;
        let fromJ = this.state.fromJ;
        let movingPiece = this.state.squares[fromI][fromJ];
        let originSquare = document.getElementById(fromI + fromJ);

        // Si clic sur la même cellule, désactiver la sélection.
        if (i === fromI && j === fromJ) {
          originSquare.classList.remove("clicked");
          this.setState({
            // Remet à zéro l'état du mouvement.
            isFirstClick: !this.state.isFirstClick,
            fromI: "",
            fromJ: 0,
          });
        } else {  // Sinon, essayer de bouger la pièce.
          if (
            !this.isCurrentPlayerPiece(clickedPiece) &&
            this.isMoveLegal(movingPiece, i, j)
          ) {
            // Met à jour l'état des cellules d'origine et de destination.
            originSquare.classList.remove("clicked");
            if (fromI !== i) {
              this.setState({
                squares: {
                  ...this.state.squares,
                  [i]: {
                    ...this.state.squares[i],
                    [j]: movingPiece,
                  },
                  [fromI]: {
                    ...this.state.squares[fromI],
                    [fromJ]: "",
                  }
                },
              });
            } else {  // Si i === fromI.
              this.setState({
                squares: {
                  ...this.state.squares,
                  [i]: {
                    ...this.state.squares[i],
                    [j]: movingPiece,
                    [fromJ]: "",
                  },
                },
              });
            }

            // Remet à zéro l'état du mouvement.
            this.setState({
                isFirstClick: !this.state.isFirstClick,
                fromI: "",
                fromJ: 0,
                whiteIsNext: !this.state.whiteIsNext,
                isFirstWhiteMove: false,
                isFirstBlackMove: this.state.isFirstWhiteMove ? true : false,
            });

            // Gère la victoire.
            if (clickedPiece.charAt(0) === "K") {
              let enemy = this.state.whiteIsNext ? "B" : "W";
              let winner = this.state.whiteIsNext ? "Blanc" : "Noir";
              if (clickedPiece.charAt(2) === enemy) {
                this.setState({
                  winner: winner,
                });
              }
            }
          }
        }
      }
    }
  }

  render() {
    let status;
    if (this.state.winner === "") {
      status = "Prochain joueur : " + (this.state.whiteIsNext ? "blanc" : "noir");
    } else {
      status = this.state.winner + " gagne !";
    }

    return (
      <div className="game">
        <div className="game-info">
          <p>{status}</p>
        </div>
        <div className="game-controls">
          <button className="btn btn-secondary btn-sm" onClick={this.restart}>
            Recommencer
          </button>
          <button className="btn btn-secondary btn-sm" onClick={this.load}>
            Charger sauvegarde
          </button>
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

