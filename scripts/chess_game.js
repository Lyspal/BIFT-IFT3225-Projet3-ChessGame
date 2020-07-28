'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour le jeu d'échecs
// La forme du présent code s'inspire du tutoriel introductif officiel de
// React, disponible à l'adresse : https://reactjs.org/tutorial/tutorial.html,
// que nous avons largement adapté et augmenté pour les fins du devoir.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChessGame = function (_React$Component) {
  _inherits(ChessGame, _React$Component);

  function ChessGame(props) {
    _classCallCheck(this, ChessGame);

    var _this = _possibleConstructorReturn(this, (ChessGame.__proto__ || Object.getPrototypeOf(ChessGame)).call(this, props));

    _this.init = "{\n      \"a\": {\n        \"1\": \"R-B\",\n        \"2\": \"N-B\",\n        \"3\": \"B-B\",\n        \"4\": \"Q-B\",\n        \"5\": \"K-B\",\n        \"6\": \"B-B\",\n        \"7\": \"N-B\",\n        \"8\": \"R-B\"\n      },\n      \"b\": {\n        \"1\": \"P-B\",\n        \"2\": \"P-B\",\n        \"3\": \"P-B\",\n        \"4\": \"P-B\",\n        \"5\": \"P-B\",\n        \"6\": \"P-B\",\n        \"7\": \"P-B\",\n        \"8\": \"P-B\"\n      },\n      \"c\": {\n        \"1\": \"\",\n        \"2\": \"\",\n        \"3\": \"\",\n        \"4\": \"\",\n        \"5\": \"\",\n        \"6\": \"\",\n        \"7\": \"\",\n        \"8\": \"\"\n      },\n      \"d\": {\n        \"1\": \"\",\n        \"2\": \"\",\n        \"3\": \"\",\n        \"4\": \"\",\n        \"5\": \"\",\n        \"6\": \"\",\n        \"7\": \"\",\n        \"8\": \"\"\n      },\n      \"e\": {\n        \"1\": \"\",\n        \"2\": \"\",\n        \"3\": \"\",\n        \"4\": \"\",\n        \"5\": \"\",\n        \"6\": \"\",\n        \"7\": \"\",\n        \"8\": \"\"\n      },\n      \"f\": {\n        \"1\": \"\",\n        \"2\": \"\",\n        \"3\": \"\",\n        \"4\": \"\",\n        \"5\": \"\",\n        \"6\": \"\",\n        \"7\": \"\",\n        \"8\": \"\"\n      },\n      \"g\": {\n        \"1\": \"P-W\",\n        \"2\": \"P-W\",\n        \"3\": \"P-W\",\n        \"4\": \"P-W\",\n        \"5\": \"P-W\",\n        \"6\": \"P-W\",\n        \"7\": \"P-W\",\n        \"8\": \"P-W\"\n      },\n      \"h\": {\n        \"1\": \"R-W\",\n        \"2\": \"N-W\",\n        \"3\": \"B-W\",\n        \"4\": \"Q-W\",\n        \"5\": \"K-W\",\n        \"6\": \"B-W\",\n        \"7\": \"N-W\",\n        \"8\": \"R-W\"\n      }\n    }";
    _this.state = {
      isFirstWhiteMove: true,
      isFirstBlackMove: true,
      squares: JSON.parse(_this.init),
      isFirstClick: true,
      fromI: "",
      fromJ: 0,
      whiteIsNext: true,
      winner: ""
    };
    _this.restart = _this.restart.bind(_this);
    _this.load = _this.load.bind(_this);
    return _this;
  }

  _createClass(ChessGame, [{
    key: "restart",
    value: function restart() {
      this.setState({
        isFirstWhiteMove: true,
        isFirstBlackMove: true,
        squares: JSON.parse(this.init),
        isFirstClick: true,
        fromI: "",
        fromJ: 0,
        whiteIsNext: true,
        winner: ""
      });
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      fetch('http://www-ens.iro.umontreal.ca/~levestev/resources/ift3225/tp3/chess.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          squares: data
        });
      });
    }
  }, {
    key: "isCurrentPlayerPiece",
    value: function isCurrentPlayerPiece(piece) {
      var player = this.state.whiteIsNext ? "-W" : "-B";
      return piece.includes(player);
    }
  }, {
    key: "isMoveLegal",
    value: function isMoveLegal(piece, i, j) {
      // Convertit les indices de ligne en nombre.
      var numI = i.charCodeAt(0) - 96;
      var fromI = this.state.fromI.charCodeAt(0) - 96;

      //Inverse les indices de ligne pour les blancs.
      if (this.state.whiteIsNext) {
        numI = 9 - numI;
        fromI = 9 - fromI;
      }

      var fromJ = this.state.fromJ;

      // Test
      console.log(numI + ", " + j);
      console.log(fromI + ", " + fromJ);

      // Ne pas capturer sa propre pièce.
      // if (this.state.squares[i][j])

      switch (piece.charAt(0)) {
        case 'P':
          // TODO Cas du premier coup.
          var isStartPos = fromI === 2;
          var inFront = this.state.whiteIsNext ? "f" : "c";
          var isMiddleEmpty = this.state.squares[inFront][fromJ] === "";
          var isUpByTwo = numI - fromI === 2 && j - fromJ === 0;
          var isPremier = isStartPos && isUpByTwo && isMiddleEmpty;
          // Coup régulier.
          var isEmpty = this.state.squares[i][j] === "";
          var isForward = numI - fromI === 1 && j - fromJ === 0;
          var isReg = isEmpty && isForward;
          // Coup de capture.
          var enemy = this.state.whiteIsNext ? "B" : "W";
          var isEnemy = this.state.squares[i][j].charAt(2) === enemy;
          var isDiagMove = numI - fromI === 1 && Math.abs(j - fromJ) === 1;
          var isCapture = isDiagMove && isEnemy;
          return isPremier || isReg || isCapture;
        case 'R':
          return Math.abs(numI - fromI) === 0 || Math.abs(j - fromJ) === 0;
        case 'N':
          var isVL = Math.abs(numI - fromI) === 2 && Math.abs(j - fromJ) === 1;
          var isHL = Math.abs(numI - fromI) === 1 && Math.abs(j - fromJ) === 2;
          return isVL || isHL;
        case 'B':
          return Math.abs(numI - fromI) === Math.abs(j - fromJ);
        case 'Q':
          var likeR = Math.abs(numI - fromI) === 0 || Math.abs(j - fromJ) === 0;
          var likeB = Math.abs(numI - fromI) === Math.abs(j - fromJ);
          return likeR || likeB;
        case 'K':
          return Math.abs(numI - fromI) <= 1 && Math.abs(j - fromJ) <= 1;
        default:
          return false;
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(i, j) {
      if (this.state.winner === "") {
        var clickedPiece = this.state.squares[i][j];

        // First, click a square containing a current player's piece.
        if (this.state.isFirstClick) {
          if (clickedPiece !== "" && this.isCurrentPlayerPiece(clickedPiece)) {
            document.getElementById(i + j).classList.add("clicked");
            this.setState({
              // Update move state.
              isFirstClick: !this.state.isFirstClick,
              fromI: i,
              fromJ: j
            });
          }
        } else {
          // Then, click the destination square to move the piece.
          var fromI = this.state.fromI;
          var fromJ = this.state.fromJ;
          var movingPiece = this.state.squares[fromI][fromJ];
          console.log(movingPiece); // Test
          var originSquare = document.getElementById(fromI + fromJ);

          // If click the same square, unselect it. 
          if (i === fromI && j === fromJ) {
            originSquare.classList.remove("clicked");
            this.setState({
              // Reset move state.
              isFirstClick: !this.state.isFirstClick,
              fromI: "",
              fromJ: 0
            });
          } else {
            // Else, try moving the piece.
            if (!this.isCurrentPlayerPiece(clickedPiece) && this.isMoveLegal(movingPiece, i, j)) {
              // Update squares' states.
              originSquare.classList.remove("clicked");
              if (fromI !== i) {
                var _Object$assign3;

                // Corrige un bug dans l'écriture de squares.
                this.setState({
                  squares: Object.assign({}, this.state.squares, (_Object$assign3 = {}, _defineProperty(_Object$assign3, i, Object.assign({}, this.state.squares[i], _defineProperty({}, j, movingPiece))), _defineProperty(_Object$assign3, fromI, Object.assign({}, this.state.squares[fromI], _defineProperty({}, fromJ, ""))), _Object$assign3))
                });
              } else {
                var _Object$assign4;

                // Si i === fromI.
                this.setState({
                  squares: Object.assign({}, this.state.squares, _defineProperty({}, i, Object.assign({}, this.state.squares[i], (_Object$assign4 = {}, _defineProperty(_Object$assign4, j, movingPiece), _defineProperty(_Object$assign4, fromJ, ""), _Object$assign4))))
                });
              }

              // Reset move state.
              this.setState({
                isFirstClick: !this.state.isFirstClick,
                fromI: "",
                fromJ: 0,
                whiteIsNext: !this.state.whiteIsNext,
                isFirstWhiteMove: false,
                isFirstBlackMove: this.state.isFirstWhiteMove ? true : false
              });

              // Victory management.
              if (clickedPiece.charAt(0) === "K") {
                var enemy = this.state.whiteIsNext ? "B" : "W";
                var winner = this.state.whiteIsNext ? "Blanc" : "Noir";
                if (clickedPiece.charAt(2) === enemy) {
                  this.setState({
                    winner: winner
                  });
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var status = void 0;
      if (this.state.winner === "") {
        status = "Prochain joueur : " + (this.state.whiteIsNext ? "blanc" : "noir");
      } else {
        status = this.state.winner + " gagne !";
      }

      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "p",
            null,
            status
          )
        ),
        React.createElement(
          "div",
          { className: "game-controls" },
          React.createElement(
            "button",
            { className: "btn btn-secondary btn-sm", onClick: this.restart },
            "Recommencer"
          ),
          React.createElement(
            "button",
            { className: "btn btn-secondary btn-sm", onClick: this.load },
            "Charger sauvegarde"
          )
        ),
        React.createElement(Board, {
          squares: this.state.squares,
          onClick: function onClick(i, j) {
            return _this3.handleClick(i, j);
          }
        })
      );
    }
  }]);

  return ChessGame;
}(React.Component);

var domContainer = document.querySelector('#chess_game');
ReactDOM.render(React.createElement(ChessGame, null), domContainer);