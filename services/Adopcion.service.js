angular
.module('mimasApp')
.service('adopcionService',adopcionService);


adopcionService.$inject = ['$http','$q','CONFIG'];

function adopcionService($http,$q,CONFIG){
    var self = this;
    self.consultarSolicitud = consultarSolicitud;
    self.actualizarSolicitud = actualizarSolicitud;
    self.enviarSolicitud = enviarSolicitud; 

    function enviarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.post(CONFIG.APIURL+"adopcionservices/adopcion",auditJson)
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

}