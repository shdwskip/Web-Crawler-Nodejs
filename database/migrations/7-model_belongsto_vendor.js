'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "modelId" from table "vendors"
 * addColumn "vendorId" to table "models"
 *
 **/

var info = {
    "revision": 7,
    "name": "model_belongsto_vendor",
    "created": "2018-03-08T13:28:42.727Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["vendors", "modelId"]
    },
    {
        fn: "addColumn",
        params: [
            "models",
            "vendorId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "vendors",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    }
];

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
