'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour une case de la planche de jeu
// La forme du présent code s'inspire du tutoriel introductif officiel de
// React, disponible à l'adresse : https://reactjs.org/tutorial/tutorial.html,
// que nous avons largement adapté et augmenté pour les fins du devoir.

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
