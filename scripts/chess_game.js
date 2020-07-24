'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour le jeu d'échecs
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      squares: JSON.parse(_this.init),
      whiteIsNext: true
    };
    return _this;
  }

  _createClass(ChessGame, [{
    key: "render",
    value: function render() {
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
          squares: this.state.squares
        })
      );
    }
  }]);

  return ChessGame;
}(React.Component);

var domContainer = document.querySelector('#chess_game');
ReactDOM.render(React.createElement(ChessGame, null), domContainer);

// ============================================================================