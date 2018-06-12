'use strict';

module.exports = function (app, callback) {
  const issues = [
    {
      "title": "Toilette cassée",
      "description": "...",
      "impact": 1,
      "emergencyId": 3,
      "location": "Salle de bain du 2ème étage",
      "authorId": 1,
      "typeId": 1,
      "stateId": 3,
    },
    {
      "title": "Départ de feu",
      "description": "Il faut appeler les pompiers !",
      "impact": 1,
      "emergencyId": 3,
      "location": "Jardin",
      "authorId": 6,
      "typeId": 2,
      "stateId": 2,
    },
    {
      "title": "L'escalier est mal fixé",
      "description": "J'ai failli tomber et mourir.",
      "impact": 1,
      "emergencyId": 2,
      "location": "Escalier",
      "authorId": 6,
      "typeId": 1,
      "stateId": 1,
    },
    {
      "title": "Fuite d'eau",
      "description": "Il y a de l'eau partout ça fuit du robinet !",
      "impact": 1,
      "emergencyId": 2,
      "location": "Cuisine",
      "authorId": 3,
      "typeId": 5,
      "stateId": 3,
    },
    {
      "title": "Plus d'électricité dans la salle de bain",
      "description": "Tout est dans le titre. ",
      "impact": 1,
      "emergencyId": 1,
      "location": "Salle de bain",
      "authorId": 3,
      "typeId": 4,
      "stateId": 2,
    },
    {
      "title": "Clé de voiture perdue",
      "description": "J'ai perdu mes clés de voiture dans le jardin. ",
      "impact": 1,
      "emergencyId": 2,
      "location": "Jardin",
      "authorId": 5,
      "typeId": 3,
      "stateId": 1,
    }, {
      "title": "Tonte de la pelouse",
      "description": "Il faut tondre la pelouse, son état est lamentable. ",
      "impact": 1,
      "emergencyId": 3,
      "location": "Jardin",
      "authorId": 1,
      "typeId": 6,
      "stateId": 1,
    },
    {
      "title": "Cahier perdu",
      "description": "Cahier de brouillon perdu ",
      "impact": 1,
      "emergencyId": 3,
      "location": "Maison",
      "authorId": 1,
      "typeId": 6,
      "stateId": 3,
    }
  ];

  const Issue = app.models.Issue;
  let promises = [];

  issues.forEach(issue => {
    promises.push(new Promise((res, rej) => {
      Issue.findOrCreate({
        where: {
          title: issue.title,
          description: issue.description,
          impact: issue.impact,
          location: issue.location,
          authorId: issue.authorId,
          stateId: issue.stateId,
          typeId: issue.typeId
        },
      }, issue, (err, newIssue) => {
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
