'use strict';

module.exports = (app, callback) => {

    const Member = app.models.Member;
    let superuser = {
        firstname: "Prune",
        lastname: "Pillone",
        realm: "root",
        email: "prune6@gmail.com",
        emailVerified: true,
        password: "rootroot"
    };

    Member.findOrCreate({
        where: {
          realm: superuser.realm
        }
    }, superuser)
        .then((newUser, isCreated) => {
            console.log(isCreated ? "The root user was created" : "The root user already exists");
            callback(null);
        }).catch(err => {
            callback(err);
        });
};
