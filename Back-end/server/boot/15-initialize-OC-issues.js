'use strict';

module.exports = function (app, callback) {
  const requests = [
    {
      "title": "Eteindre la lumière",
      "actionType": "Eteindre",
      "date": " ",
      "time": " ",
      "areaId": 10,
      "connectedObjectId": 42,
      "emergencyId": 1,
      "authorId": 1,
      "stateId" : -1
    },
    {
      "title": "Allumer la lumière",
      "actionType": "Allumer",
      "date": " ",
      "time": " ",
      "areaId": 10,
      "connectedObjectId": 42,
      "emergencyId": 1,
      "authorId": 1,
      "stateId" : -1
    }
  ];

  const Request = app.models.ConnectedObjectRequest;
  let promises = [];

  requests.forEach(request => {
    promises.push(new Promise((res, rej) => {
      Request.findOrCreate({
        where: {
          title: request.title,
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
  Promise.all(promises)
    .then(() => {
      callback();
    }).catch(err => {
    callback(err);
  });
};
