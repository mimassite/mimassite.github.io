angular
.module('mimasApp')
.service('estadoSolicitudApadrinamientoService',estadoSolicitudApadrinamientoService);


estadoSolicitudApadrinamientoService.$inject = ['$http','$q'];

function estadoSolicitudApadrinamientoService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080'; 
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud;

  
      function consultarSolicitud(idSolicitud){
        var promesa = $q.defer();
        $http.get(ipserver+"/mimas/rest/apadrinamientoservices/apadrinamiento",{
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
      $http.put(ipserver+"/mimas/rest/apadrinamientoservices/apadrinamiento",auditJson)
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