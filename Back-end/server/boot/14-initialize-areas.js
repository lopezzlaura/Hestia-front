'use strict';

module.exports = function (app, callback) {
  const areas = [

    {
      "name": "Salon",
      "identifier": "A"
    },
    {
      "name": "Toilettes",
      "identifier": "B"
    },
    {
      "name": "Placard",
      "identifier": "C"
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
      "name": "Garage",
      "identifier": "F"
    },
    {
      "name": "Couloir",
      "identifier": "G"
    },
    {
      "name": "Chambre 1",
      "identifier": "H"
    },
    {
      "name": "Salle de bain",
      "identifier": "I"
    },
    {
      "name": "Chambre 2",
      "identifier": "J"
    },
    {
      "name": "Salle de bain",
      "identifier": "K"
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
      "name": "Extérieur",
      "identifier": "O"
    }
  ];

  const Area = app.models.Area;
  let promises = [];

  areas.forEach(area => {
    promises.push(new Promise((res, rej) => {
      Area.findOrCreate({
        where: {
          name: area.name,
          identifier: area.identifier
        },
      }, area, (err, newArea) => {
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
