'use strict';

const path = require('path');

module.exports = function(app) {
    // Install a `/` route that returns app status
    let router = app.loopback.Router();

    router.get('/', app.loopback.status());
    app.use(router);

    app.get('/verified', function(req, res) {
        res.render('verified');
    });
};
