'use strict';

module.exports = function (app, callback) {
  const requests = [
    {
      "title": "Eteindre la lumière",
      "description": "Extinction des feux dans la chambre des enfants",
      "actionType": "Eteindre",
      "date": "A",
      "time": "A",
      "areaId": 2,
      "connectedObjectId": 1,
      "emergencyId": 1,
      "authorId": 1
    },
    {
      "title": "Allumer la lumière",
      "description": "Allumage des feux dans la chambre des enfants",
      "actionType": "Allumer",
      "date": "A",
      "time": "A",
      "areaId": 2,
      "connectedObjectId": 2,
      "emergencyId": 1,
      "authorId": 1
    }
  ];

  const Request = app.models.ConnectedObjectRequest;
  let promises = [];

  requests.forEach(request => {
    promises.push(new Promise((res, rej) => {
      Request.findOrCreate({
        where: {
          title: request.title,
          description: request.description,
          actionType: request.actionType,
          date: request.date,
          time: request.time,
          areaId: request.areaId,
          authorId: request.authorId,
          connectedObjectId: request.connectedObjectId,
          emergencyId: request.emergencyId
        },
      }, request, (err, newRequest) => {
        if (err) {
          rej(err);
        }
        res();
      });
    }));
  });
  !
    Promise.all(promises)
      .then(() => {
        callback();
      }).catch(err => {
      callback(err);
    });
};
