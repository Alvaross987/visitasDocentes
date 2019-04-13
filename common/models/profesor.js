'use strict';

var _ = require('lodash');

module.exports = function (Profesor) {
    Profesor.beforeRemote('__create__visitas', function (context, instance, next) {
        var fechaManyana = new Date();
        fechaManyana.setDate(fechaManyana.getDate() + 1);
        context.args.data.date = fechaManyana;
        next();
    });

    /**
* Devuelve los docentes que no tienen ninguna valoracion negativa(<4)
* @param {Function(Error, array)} callback
*/
    var async = require('async');
    Profesor.buenos = function (callback) {

        async.parallel({
            buenosDocentes: async.apply(getBuenosDocentes),
            visitasNegativas: async.apply(getVisitasNegativas),
        }, function (err, results) {
            if (err) throw err;
            console.log(results.buenosDocentes);
            console.log(results.visitasNegativas);

            callback(null, results.buenosDocentes);
        });
    };
    function getBuenosDocentes(cb) {
        Profesor.find(null, cb);
    }
    function getVisitasNegativas(cb) {
        var Visita = Profesor.app.models.Visita;
        var filtro = { where: { rating: { lt: 4 } } }
        Visita.find(filtro, cb);
    }


    /**
 * Muestra los familiares que han visitado a un determinado profesor
 * @param {Function(Error, array)} callback
 */

Profesor.prototype.familiaresVisitantes = function(callback) {
    
    var esteProfesor = this;
    esteProfesor.familiares(function(err,familiares) {
        if (err) callback(err);
        let familiaresSinDuplicar = 
        _.uniqBy(familiares,'id');
        callback(err, familiaresSinDuplicar);
    });

  };


    /**
 * Muestra los familiares que no han visitado a un determinado profesor
 * @param {Function(Error, array)} callback
 */


  Profesor.prototype.familiaresNoVisitantes = function(callback) {
    
    var esteProfesor = this;
    var familiar = Profesor.app.models.Familiar;

    esteProfesor.familiares(function(err,familiares) {
        if (err) callback(err);
        let familiaresSinDuplicar = 
        _.uniqBy(familiares,'id');
        familiar.find(function(err,todosLosFamiliares) {
        
        let familiaresNoVisitantes = 
        _.differenceBy(todosLosFamiliares,familiaresSinDuplicar,'id');
             callback(err, familiaresNoVisitantes);
    });


    });
    
       


  };
  



};
