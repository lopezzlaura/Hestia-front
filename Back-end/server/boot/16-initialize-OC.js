'use strict';

module.exports = function (app, callback) {
  const objects = [
    {
      "name": "Lights",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_1_(Up)",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_1_(Down)",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_2_(Up)",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_2_(Down)",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_3_(Up)",
      "areaId": 1,
    },
    {
      "name": "Roller_Shades_3_(Down)",
      "areaId": 1,
    }, {
      "name": "Roller_Shades_4_(Up)",
      "areaId": 1,
    }, {
      "name": "Roller_Shades_4_(Down)",
      "areaId": 1,
    }, {
      "name": "Heater",
      "areaId": 1,
    }, {
      "name": "Lights_1",
      "areaId": 2,
    }, {
      "name": "Lights_2",
      "areaId": 2,
    }, {
      "name": "Lights",
      "areaId": 3,
    }, {
      "name": "Lights_1",
      "areaId": 4,
    }, {
      "name": "Lights_2",
      "areaId": 4,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 4,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 4,
    }, {
      "name": "Heater",
      "areaId": 4,
    }, {
      "name": "Lights",
      "areaId": 5,
    }, {
      "name": "Heater",
      "areaId": 5,
    }, {
      "name": "Siren",
      "areaId": 5,
    }, {
      "name": "Alarm_Key_Pad_(Arm)",
      "areaId": 5,
    }, {
      "name": "Alarm_Key_Pad_(Disarm)",
      "areaId": 5,
    }, {
      "name": "Lights_1",
      "areaId": 6,
    }, {
      "name": "Lights_2",
      "areaId": 6,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 6,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 6,
    }, {
      "name": "Garage_Door_(Open)",
      "areaId": 6,
    }, {
      "name": "Garage_Door_(Close)",
      "areaId": 6,
    }, {
      "name": "Lights",
      "areaId": 7,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 7,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 7,
    }, {
      "name": "Heater_1",
      "areaId": 7,
    }, {
      "name": "Heater_2",
      "areaId": 7,
    }, {
      "name": "Lights",
      "areaId": 8,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 8,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 8,
    }, {
      "name": "Heater",
      "areaId": 8,
    }, {
      "name": "Lights_1",
      "areaId": 9,
    }, {
      "name": "Lights_2",
      "areaId": 9,
    }, {
      "name": "Heater",
      "areaId": 9,
    }, {
      "name": "Lights",
      "areaId": 10,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 10,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 10,
    }, {
      "name": "Heater",
      "areaId": 10,
    }, {
      "name": "Lights",
      "areaId": 11,
    }, {
      "name": "Heater",
      "areaId": 11,
    }, {
      "name": "Lights",
      "areaId": 12,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 12,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 12,
    }, {
      "name": "Heater",
      "areaId": 12,
    }, {
      "name": "Lights",
      "areaId": 13,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 13,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 13,
    }, {
      "name": "Heater",
      "areaId": 13,
    },
    {
      "name": "Lights_1",
      "areaId": 14,
    }, {
      "name": "Lights_2",
      "areaId": 14,
    }, {
      "name": "Lights_3",
      "areaId": 14,
    }, {
      "name": "Roller_Shades_(Up)",
      "areaId": 14,
    }, {
      "name": "Roller_Shades_(Down)",
      "areaId": 14,
    }, {
      "name": "Heater",
      "areaId": 14,
    }, {
      "name": "Lights_Porch_1",
      "areaId": 15,
    }, {
      "name": "Lights_Porch_2",
      "areaId": 15,
    }, {
      "name": "Lights_Pool",
      "areaId": 15,
    }, {
      "name": "Lights_Garden",
      "areaId": 15,
    }, {
      "name": "Lights_Entrance",
      "areaId": 15,
    }, {
      "name": "Siren",
      "areaId": 15,
    }, {
      "name": "Entrance_Gate_(Open)",
      "areaId": 15,
    }, {
      "name": "Entrance_Gate_(Close)",
      "areaId": 15,
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
