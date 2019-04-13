'use strict';

module.exports = function (Familiar) {
    /**
     * Indica el horario en el que se reciben visitas
     * @param {date} hora El momento en el que el usuario desea ser recibido o el momento actual en caso de que no se haya enviado ninguno
     * @param {Function(Error, string)} callback
     */

    Familiar.puedoVisitar = function (hora, callback) {
        var horarioValido;
        if(!hora){
            hora = new Date();
        }
        var OPEN_HOUR= new Date();
        OPEN_HOUR.setHours(8);
        OPEN_HOUR.setMinutes(15);
        OPEN_HOUR.setSeconds(0);

        var CLOSE_HOUR= new Date();
        CLOSE_HOUR.setHours(14);
        CLOSE_HOUR.setMinutes(15);
        CLOSE_HOUR.setSeconds(0);

        hora.setFullYear(OPEN_HOUR.getFullYear());
        hora.setMonth(OPEN_HOUR.getMonth());
        hora.setDate(OPEN_HOUR.getDate());
        console.log(OPEN_HOUR);
        console.log(CLOSE_HOUR);
        console.log('La hora solicitada es %d', hora);
        if (hora >= OPEN_HOUR && hora < CLOSE_HOUR) {
            horarioValido = 'Puede venir a visitarnos.';
        } else {
            horarioValido = 'Lo sentimos, nuestro horario es de 8:15AM a 2:15PM.';
        }
        callback(null, horarioValido);
    };

    /**
 * Devuelve el nombre de un determinado familiar
 * @param {Function(Error, string)} callback
 */

Familiar.prototype.getNombre = function(callback) {
    var nombre={};

    nombre.nombre = this.getSoloNombre();
    nombre.apellido= this.getApellidos();
    
    callback(null, nombre);
  };

  Familiar.prototype.getSoloNombre = function() {
    var nombreCompleto = this.nombre;
    var ultimoEspacio = nombreCompleto.lastIndexOf(" ");

    
    return nombreCompleto.substr(0,ultimoEspacio);
  };

  Familiar.prototype.getApellidos = function(callback) {
    var nombreCompleto = this.nombre;
    var ultimoEspacio = nombreCompleto.lastIndexOf(" ");

    
    return nombreCompleto.slice(ultimoEspacio+1);
  };
  

  /**
 * Añadimos un nuevo familiar a un alumno ya existente
 * @param {string} nombreFamiliar El nombre completo del nuevo familiar
 * @param {Function(Error, object)} callback
 */

Familiar.prototype.nuevoFamiliar = function(nombreFamiliar, callback) {

    Familiar.create({
        nombre: nombreFamiliar,
        alumno: this.alumno
    }, function(err, familiar){

        callback(err,familiar);
    });
    
  };
  
  

};
