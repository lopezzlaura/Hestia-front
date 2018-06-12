'use strict';

module.exports = function (app, callback) {
  const rankings = [
    {
      "familyMember": 1,
      "points": 50
    },
    {
      "familyMember": 3,
      "points": 30
    },
    {
      "familyMember": 4,
      "points": 20
    },
    {
      "familyMember": 5,
      "points": 20
    },
  ];

  const Ranking = app.models.Ranking;
  let promises = [];

  rankings.forEach(state => {
    promises.push(new Promise((res, rej) => {
      Ranking.findOrCreate({
        where: {
          familyMember: rankings.id,
          points: rankings.points,
        },
      }, state, (err, newRanking) => {
        if (err) {
          rej(err);
        }
        res();
      });
    }));
  });
  Promise.all(promises)
    .then(() => {
      console.log("Ranking init done");
      callback();
    }).catch(err => {
    callback(err);
  });
};
