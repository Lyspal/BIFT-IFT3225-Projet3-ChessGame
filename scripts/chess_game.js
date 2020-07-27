'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour le jeu d'échecs
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

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
      whiteIsNext: true
    };
    return _this;
  }

  _createClass(ChessGame, [{
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
          var isReg = numI - fromI === 1 && j - fromJ === 0;
          // Coup de capture.
          var enemy = this.state.whiteIsNext ? "B" : "W";
          var isEnemy = this.state.squares[i][j].charAt(2) === enemy;
          var isDiagMove = numI - fromI === 1 && Math.abs(j - fromJ) === 1;
          var isCapture = isDiagMove && isEnemy;
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
          return Math.abs(numI - fromI) <= 1 && Math.abs(j - fromJ);;
        default:
          return false;
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(i, j) {
      var _this2 = this;

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
            this.setState(function (prevState) {
              var _Object$assign3;

              return {
                squares: Object.assign({}, prevState.squares, (_Object$assign3 = {}, _defineProperty(_Object$assign3, i, Object.assign({}, prevState.squares[i], _defineProperty({}, j, movingPiece))), _defineProperty(_Object$assign3, fromI, Object.assign({}, prevState.squares[fromI], _defineProperty({}, fromJ, ""))), _Object$assign3)),
                // Reset move state.
                isFirstClick: !prevState.isFirstClick,
                fromI: "",
                fromJ: 0,
                whiteIsNext: !prevState.whiteIsNext,
                isFirstWhiteMove: false,
                isFirstBlackMove: _this2.state.isFirstWhiteMove ? true : false
              };
            });
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var status = "Prochain joueur : " + (this.state.whiteIsNext ? "blanc" : "noir");

      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "div",
            null,
            status
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

// ============================================================================