'use strict';

module.exports = (app, callback) => {

    const Member = app.models.Member;
    const RoleMapping = app.models.RoleMapping;
    const Role = app.models.Role;

    Member.findOne({
        where: {
            realm: "root"
        }
    }).then(rootUser => {

        Role.findOne({
            where: {
                name: "admin"
            }
        }).then(adminRole => {

            adminRole.principals.create({
                principalType: RoleMapping.USER,
                principalId: rootUser.id
            }).then(newMapping => {
                console.log("The root user is admin now !");
                callback(null);
            }).catch(err => {
                callback(err);
            });
        }).catch(err => {
            callback(err);
        });
    }).catch(err => {
        callback(err);
    });
};
