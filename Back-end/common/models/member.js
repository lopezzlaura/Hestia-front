'use strict';

const path = require('path');
const app = require('../../server/server');

module.exports = function (Member) {

  /**
   * Sets this member's role.
   * /!\ Usage of a arrow style function doesn't allow access to the pointer this.
   *
   * @param roleName
   * @param next
   */
  Member.prototype.setRole = function (roleName, next) {

    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    Role.findOne({
      where: {
        name: roleName
      }
    }).then(role => {

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: this.id
      }).then(() => {
        next(null);
      }).catch(err => {
        next(err);
      });

    }).catch(err => {
      next(err);
    });
  };

  Member.getAuthenticated = (options, next) => {

    // Récupération des informations de connexion
    const token = options && options.accessToken;
    const userId = token && token.userId;

    if (!userId) {
      const err = new Error("The user is not connected");
      err.code = 401;
      next(err);
    }

    const Member = app.models.Member;

    Member.findById(userId)
    .then(user => {
      next(null, user);
    }).catch(err => {
      next(err);
    });
  };

  Member.getRoles = (options, next) => {

    // Récupération des informations de connexion
    const token = options && options.accessToken;
    const userId = token && token.userId;

    if (!userId) {
      const err = new Error("The user is not connected");
      err.code = 401;
      next(err);
    }

    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    Role.getRoles({principalType: RoleMapping.USER, principalId: userId}, (err, roles) => {
      if (err) {
        next(err);
      }

      let promises = [];
      roles.forEach(role => {
        if (!isNaN(role)) {
          promises.push(Role.findById(role));
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
  };

  Member.testMethod = (options, data, number, next) => {

    // Récupération des informations de connexion
    const token = options && options.accessToken;
    const userId = token && token.userId;

    if (!userId) {
      const err = new Error("The user is not connected");
      err.code = 401;
      next(err);
    }

    Member.findById(userId)
    .then(user => {
      next(null, {
        firstname: user.firstname,
        lastname: user.lastname
      });
    }).catch(err => {
      next(err);
    });
  };

  Member.afterRemote('create', (ctx, userInstance, next) => {
    console.log('> Member.afterRemote create triggered');

    let options = {
      type: 'email',
      to: userInstance.email,
      from: 'hestia.polytech@gmail.com',
      subject: 'Hestia - Activation de votre compte',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: userInstance,
      host: '127.0.0.1',
      attachments: [{
        filename: 'logo-small.png',
        path: path.resolve(__dirname, '../../client/images/logo-small.png'),
        cid: 'logo-small'
      }]
    };

    userInstance.verify(options, err => {
      if (err) {
        console.log("error verify");
        Member.deleteById(userInstance.id);
        return next(err);
      }

      console.log("verify engaged...");
      next();
    });
  });
};
