'use strict';

const app = require('../../server/server');

module.exports = function (Area) {

  Area.getAreasOfType = function (areaType, next) {
    const Area = app.models.Area;

    Area.getAreas({}, (err, areas) => {
      if (err) {
        next(err);
      }

      let promises = [];
      areas.forEach(area => {
        if (area.type === areaType) {
          promises.push(area);
        }
      });

      Promise.all(promises)
        .then(rolesFound => {
          let roleNames = [];

          rolesFound.forEach(roleFound => {
            roleNames.push(roleFound.name);
          });

          next(null, roleNames);
        }).catch(err => {
        next(err);
      })
    });
  }
}
