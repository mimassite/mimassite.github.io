angular
.module('mimasApp')
.service('estadoSolicitudAdopcionService',estadoSolicitudAdopcionService);


estadoSolicitudAdopcionService.$inject = ['$http','$q','CONFIG'];

function estadoSolicitudAdopcionService($http,$q,CONFIG){
    var self = this;
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud;

  
      function consultarSolicitud(idSolicitud){
        var promesa = $q.defer();
        $http.get(CONFIG.APIURL+"adopcionservices/adopcion",{
            params: {
                id: idSolicitud
            }  
        })
        .success(function(data){
            promesa.resolve({
                resultado:data
            })
        })
        .error(function(err){
            promesa.resolve({
                resultado:err
            })
        })
        return promesa.promise   
    }

    function actualizarSolicitud(auditJson){                
      var promesa = $q.defer();
      $http.put(CONFIG.APIURL+"adopcionservices/adopcion",auditJson)
          .success(function(data){
              promesa.resolve({
                  resultado:data
              })
          })
          .error(function(err){
              promesa.resolve({
                  resultado:err
              })
          })
          return promesa.promise      
      
    }

}