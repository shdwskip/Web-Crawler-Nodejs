'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "value" on table "specs"
 *
 **/

var info = {
    "revision": 3,
    "name": "complex-unique-key-specs",
    "created": "2018-03-09T17:16:04.284Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "specs",
        "value",
        {
            "type": Sequelize.STRING(255),
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
