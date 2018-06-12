'use strict';

module.exports = function(app, callback) {
  const assignments = [
    {
      "thirdPartyId": 2,
      "issueId" : 2
    },
    {
      "thirdPartyId" : 2,
      "issueId" : 6
    }
  ];

  const Assignment = app.models.Assignment;
  let promises = [];

  assignments.forEach(assignment => {
    promises.push(new Promise((res, rej) => {
      Assignment.findOrCreate({
        where: {
          thirdPartyId: assignment.thirdPartyId,
          issueId: assignment.issueId
        },
      }, assignment, (err, newAssignment) => {
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
