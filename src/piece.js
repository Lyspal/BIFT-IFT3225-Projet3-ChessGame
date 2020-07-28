'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour une pièce de jeu
// La forme du présent code s'inspire du tutoriel introductif officiel de
// React, disponible à l'adresse : https://reactjs.org/tutorial/tutorial.html,
// que nous avons largement adapté et augmenté pour les fins du devoir.

function Piece(props) {
    let value = props.value !== "" ? props.value : "empty";
    let src = `images/${value}.svg`;

    return (
        <img className="piece" src={src} alt=""></img>
    );
  }