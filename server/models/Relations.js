const User = require("./User.js")
const Board = require("./Board.js")
const List = require("./List.js")
const Card = require("./Card.js")

// Relación uno a muchos entre el usuario y sus tableros
User.hasMany(Board, { onDelete: 'CASCADE' })
Board.belongsTo(User)

// Relación uno a muchos entre el tablero y sus listas
Board.hasMany(List, { onDelete: 'CASCADE' })
List.belongsTo(Board)

// Relación uno a muchos entre la lista y tarjeta
List.hasMany(Card, { onDelete: 'CASCADE' })
Card.belongsTo(List)

// Se exportan los modelos con sus relaciones
module.exports = {
    User,
    Board,
    List,
    Card
}