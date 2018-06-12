'use strict';

module.exports = function(app, callback) {
  const states = [
    {
      "name": "En cours de résolution",
      "value": 0
    },
    {
      "name": "Résolu",
      "value": 1
    },
    {
      "name": "Non résolu",
      "value": -1
    }
  ];

  const State = app.models.State;
  let promises = [];

  states.forEach(state => {
    promises.push(new Promise((res, rej) => {
      State.findOrCreate({
        where: {
          name: state.name,
        },
      }, state, (err, newState) => {
        if (err) {
          rej(err);
        }
        res();
      });
    }));
  });
  Promise.all(promises)
    .then(() => {
      callback();
    }).catch(err => {
      callback(err);
    });
};
