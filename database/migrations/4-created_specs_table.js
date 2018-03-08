'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "specs", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "created_specs_table",
    "created": "2018-03-08T10:44:07.557Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "specs",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "type": {
                "type": Sequelize.STRING,
                "allowNull": false
            },
            "value": {
                "type": Sequelize.STRING,
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        },
        {}
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
