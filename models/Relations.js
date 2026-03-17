const User = require("./User.js")
const Board = require("./Board.js")
const List = require("./List.js")
const Card = require("./Card.js")


User.hasMany(Board)
Board.belongsTo(User)

Board.hasMany(List)
List.belongsTo(Board)

List.hasMany(Card)
Card.belongsTo(List)

module.exports = {
    User,
    Board,
    List,
    Card
}