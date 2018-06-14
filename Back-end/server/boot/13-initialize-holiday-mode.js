'use strict';

module.exports = function (app, callback) {
  const holidays = [
    {
      "isActivated": false,
      "temperature": 1,
      "areDectectorsOn": false,
      "areLightsRandom": true
    }
  ];

  const Holiday = app.models.Holiday;
  let promises = [];

  holidays.forEach(holiday => {
    promises.push(new Promise((res, rej) => {
      Holiday.findOrCreate({
        where: {
          id:1,
          isActivated: holiday.isActivated,
          temperature: holiday.temperature,
          areDectectorsOn: holiday.areDectectorsOn,
          areLightsRandom: holiday.areLightsRandom
        },
      }, holiday, (err, newHoliday) => {
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
