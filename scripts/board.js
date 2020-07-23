'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour la planche de jeu
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = { liked: false };
    return _this;
  }

  _createClass(Board, [{
    key: "renderSquare",
    value: function renderSquare(i, j) {
      return React.createElement(Square, null);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("a", 1),
          this.renderSquare("a", 2),
          this.renderSquare("a", 3),
          this.renderSquare("a", 4),
          this.renderSquare("a", 5),
          this.renderSquare("a", 6),
          this.renderSquare("a", 7),
          this.renderSquare("a", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("b", 1),
          this.renderSquare("b", 2),
          this.renderSquare("b", 3),
          this.renderSquare("b", 4),
          this.renderSquare("b", 5),
          this.renderSquare("b", 6),
          this.renderSquare("b", 7),
          this.renderSquare("b", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("c", 1),
          this.renderSquare("c", 2),
          this.renderSquare("c", 3),
          this.renderSquare("c", 4),
          this.renderSquare("c", 5),
          this.renderSquare("c", 6),
          this.renderSquare("c", 7),
          this.renderSquare("c", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("d", 1),
          this.renderSquare("d", 2),
          this.renderSquare("d", 3),
          this.renderSquare("d", 4),
          this.renderSquare("d", 5),
          this.renderSquare("d", 6),
          this.renderSquare("d", 7),
          this.renderSquare("d", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("e", 1),
          this.renderSquare("e", 2),
          this.renderSquare("e", 3),
          this.renderSquare("e", 4),
          this.renderSquare("e", 5),
          this.renderSquare("e", 6),
          this.renderSquare("e", 7),
          this.renderSquare("e", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("f", 1),
          this.renderSquare("f", 2),
          this.renderSquare("f", 3),
          this.renderSquare("f", 4),
          this.renderSquare("f", 5),
          this.renderSquare("f", 6),
          this.renderSquare("f", 7),
          this.renderSquare("f", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("g", 1),
          this.renderSquare("g", 2),
          this.renderSquare("g", 3),
          this.renderSquare("g", 4),
          this.renderSquare("g", 5),
          this.renderSquare("g", 6),
          this.renderSquare("g", 7),
          this.renderSquare("g", 8)
        ),
        React.createElement(
          "div",
          { className: "board-row" },
          this.renderSquare("h", 1),
          this.renderSquare("h", 2),
          this.renderSquare("h", 3),
          this.renderSquare("h", 4),
          this.renderSquare("h", 5),
          this.renderSquare("h", 6),
          this.renderSquare("h", 7),
          this.renderSquare("h", 8)
        )
      );
    }
  }]);

  return Board;
}(React.Component);