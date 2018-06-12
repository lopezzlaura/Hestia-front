'use strict';

const app = require('../../server/server');

module.exports = function (Issue) {

  Issue.beforeRemote('create', (ctx, issue, next) => {

    // If the stateId is not defined, add the default state "non resolved"
    const State = app.models.State;

    if (ctx && ctx.args && ctx.args.data && ctx.args.data.stateId && !isNaN(ctx.args.data.stateId)) {
      return next();
    }

    State.findOne({
      where: {
        value: -1
      }
    }).then(state => {
      ctx.args.data.stateId = state.id;
      return next();
    }).catch(err => {
      return next(err);
    });
  });

};
