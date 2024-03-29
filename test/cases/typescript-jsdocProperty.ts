/**
 * @namespace
 * @property {object}  defaults               - The default values for parties.
 * @property {number}  defaults.players       - The default number of players.
 * @property {string}  defaults.level         - The default level for the party.
 * @property {object}  defaults.treasure      - The default treasure.
 * @property {number}  defaults.treasure.gold - How much gold the party starts with.
 */
var config = {
    defaults: {
        players: 1,
        level:   'beginner',
        treasure: {
            gold: 0
        }
    }
};
/**
 * @class MyClass
 * @param {string} name It is a Input Name
 * @prop {string} name It is a Prop Name
 */
class MyClass {
    constructor(name) {
        this.name = name || 'NoName';
    }
}