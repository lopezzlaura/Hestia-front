'use strict';

module.exports = function (app, callback) {
  const histories = [
    {
      "origin": " a été créé",
      "memberId": 6,
      "issueId": 1,
      "type": 1
    },
    {
      "origin": " a été créé ",
      "memberId": 1,
      "issueId": 2,
      "type": 1
    }, {
      "origin": " a été passé  En cours de résolution",
      "memberId": 3,
      "issueId": 5,
      "type": 3
    }
  ];

  const History = app.models.History;
  let promises = [];

  histories.forEach(history => {
    promises.push(new Promise((res, rej) => {
      History.findOrCreate({
        where: {
          origin: history.origin,
          memberId: history.memberId,
          issueId: history.issueId
        },
      }, history, (err, newHistory) => {
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
