'use strict';

module.exports = (app, callback) => {

    let hestiadb = app.dataSources.hestiadb;
    let tables = [];

    // Add all the models created with this datasource
    for (let modelName in app.models) {
        if (app.models[modelName].dataSource.name === hestiadb.name) {
            tables.push(modelName);
        }
    }

    // Create the tables in the database if they don't exist
    hestiadb.autoupdate(tables, err => {
        if (err) {
            callback(err);
        }

        console.log('Tables [' + tables + '] created in ', hestiadb.adapter.name);
        callback();
    });
};
