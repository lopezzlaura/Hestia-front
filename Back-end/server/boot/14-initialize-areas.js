'use strict';

module.exports = function (app, callback) {
  const histories = [
    {
      "name": "Chambre 1",
      "identifier": "H"
    },
    {
      "name": "Chambre 2",
      "identifier": "J"
    },
    {
      "name": " Chambre 3",
      "identifier": "L"
    },
    {
      "name": "Buanderie",
      "identifier": "M"
    },
    {
      "name": "Couloir",
      "identifier": "G"
    },
    {
      "name": "Cuisine",
      "identifier": "D"
    },
    {
      "name": "Entrée",
      "identifier": "E"
    },
    {
      "name": "Extérieur",
      "identifier": "O"
    }, {
      "name": "Garage",
      "identifier": "F"
    }, {
      "name": "Placard",
      "identifier": "C"
    },
    {
      "name": "Salle de bain",
      "identifier": "K"
    },
    {
      "name": "Salle de bain",
      "identifier": "I"
    },
    {
      "name": "Salon",
      "identifier": "A"
    },
    {
      "name": "Toilettes",
      "identifier": "B"
    },
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
