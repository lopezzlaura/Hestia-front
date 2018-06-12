'use strict';

module.exports = function (app, callback) {
  const managers = [
    {
      "username": "paul",
      "email": "paul.durand@gmail.com",
      "firstname": "Paul",
      "lastname": "Durand",
      "password": "12345678",
      "emailVerified": true,
    },
    {
      "username": "sarah",
      "email": "sarah.durand@gmail.com",
      "firstname": "Sarah",
      "lastname": "Durand",
      "password": "12345678",
      "emailVerified": true,
    },
    {
      "username": "christine",
      "email": "christine.pennec@gmail.com",
      "firstname": "Christine",
      "lastname": "Pennec",
      "password": "12345678",
      "emailVerified": true,
    }
  ];

  const users = [
    {
      "username": "victor",
      "email": "victor.durand@gmail.com",
      "firstname": "Victor",
      "lastname": "Durand",
      "password": "12345678",
      "emailVerified": true,
    }
  ];

  const guests = [
    {
      "username": "fred",
      "realm": "guest",
      "email": "fred.ejamy@gmail.com",
      "firstname": "Fred",
      "lastname": "Ejamy",
      "password": "12345678",
      "emailVerified": true,
    }
  ];

  const Member = app.models.Member;
  let promises = [];

  managers.forEach(member => {
    promises.push(new Promise((res, rej) => {
    Member.findOrCreate({
    where: {
      email: member.email,
    },
  }, member, (err, newUser) => {
    if (err) {
      rej(err);
    }

    newUser.setRole('manager', err => {
    if (err) rej(err);
  res();
});
});
}));
});
  users.forEach(member => {
    promises.push(new Promise((res, rej) => {
    Member.findOrCreate({
    where: {
      email: member.email,
    },
  }, member, (err, newUser) => {
    if (err) {
      rej(err);
    }

    newUser.setRole('member', err => {
    if (err) rej(err);
  res();
});
});
}));
});
  guests.forEach(member => {
    promises.push(new Promise((res, rej) => {
    Member.findOrCreate({
    where: {
      email: member.email,
    },
  }, member, (err, newUser) => {
    if (err) {
      rej(err);
    }

    newUser.setRole('guest', err => {
    if (err) rej(err);
  res();
});
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
