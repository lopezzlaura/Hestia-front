'use strict';

module.exports = function (app, callback) {
  const objects = [
    {
      "name": "Lights",
    }, {
      "name": "Roller_Shades_1",
    }, {
      "name": "Roller_Shades_2",
    }, {
      "name": "Roller_Shades_3",
    }, {
      "name": "Roller_Shades_4",
    }, {
      "name": "Heater",
    }, {
      "name": "Lights_1",
    }, {
      "name": "Lights_2",
    }, {
      "name": "Roller_Shades",
    }, {
      "name": "Siren",
    }, {
      "name": "Alarm_Key_Pad_(Arm)",
    }, {
      "name": "Alarm_Key_Pad_(Disarm)",
    }, {
      "name": "Garage_Door",
    }, {
      "name": "Heater_1",
    }, {
      "name": "Heater_2",
    }, {
      "name": "Lights_3",
    }, {
      "name": "Lights_Porch_1",
    }, {
      "name": "Lights_Porch_2",
    }, {
      "name": "Lights_Pool",
    }, {
      "name": "Lights_Garden",
    }, {
      "name": "Lights_Entrance",
    }, {
      "name": "Entrance_Gate",
    }
  ];

  const ConnectedObject = app.models.ConnectedObject;
  let promises = [];

  objects.forEach(object => {
    promises.push(new Promise((res, rej) => {
      ConnectedObject.findOrCreate({
        where: {
          name: object.name,
          areaId: object.areaId
        },
      }, object, (err, newObject) => {
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
