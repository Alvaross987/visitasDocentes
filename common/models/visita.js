'use strict';

module.exports = function(Visita) {
    Visita.beforeRemote('create', function(context, instance, next) {
        context.args.data.date = Date.now();
        context.args.data.profesorId = context.req.accessToken.userId;
        next();
      });
};
