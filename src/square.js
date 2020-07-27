'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour une case de la planche de jeu
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

class Square extends React.Component {
  render() {
    return (
      <div id={this.props.id} className="square" onClick={this.props.onClick}>
        <Piece
          value={this.props.piece}
        />
      </div>
    );
  }
}
