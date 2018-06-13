'use strict';

module.exports = function(app, callback) {
  const types = [
    {
      "value":1,
      "name": "Matériel",
    },
    {
      "value":2,
      "name": "Dégât des eaux",
    },
    {
      "value":3,
      "name": "Electrique",
    },
    {
      "value":4,
      "name": "Incendie",
    },
    {
      "value":5,
      "name": "Autres",
    },
    {
      "value":6,
      "name": "Objets connectés",
    },
  ];

  const Type = app.models.Type;
  let promises = [];

  types.forEach(type => {
    promises.push(new Promise((res, rej) => {
      Type.findOrCreate({
        where: {
          name: type.name,
          value:type.value,
        },
      }, type, (err, newType) => {
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
