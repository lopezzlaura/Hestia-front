'use strict';

module.exports = function(app, callback) {
  const emergencies = [
    {
      'name': 'Faible',
      'value': 1
    },
    {
      'name': 'Moyenne',
      'value': 2
    },
    {
      'name': 'Urgent',
      'value': 3
    },
  ];

  const Emergency = app.models.Emergency;
  let promises = [];

  emergencies.forEach(emergency => {
    promises.push(new Promise((res, rej) => {
      Emergency.findOrCreate({
        where: {
          name: emergency.name,
        },
      }, emergency, (err, newEmergency) => {
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
