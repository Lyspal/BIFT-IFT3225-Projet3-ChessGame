'use strict';

// author: Sylvain Laporte
// program: chess_game.js
// date: 2020-07-29
// object: Component React pour une pièce de jeu
// Le présent code contient ______ adaptations de code tiers. Les sources du
// code original sont citées en commentaire du code adapté.

function Piece(props) {
    var value = props.value !== "" ? props.value : "empty";
    var src = "images/" + value + ".svg";

    return React.createElement("img", { className: "piece", src: src, alt: "" });
}