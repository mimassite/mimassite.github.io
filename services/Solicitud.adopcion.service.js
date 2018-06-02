angular
.module('mimasApp')
.service('solicitudAdopcionService',solicitudAdopcionService);


solicitudAdopcionService.$inject = ['$http','$q','CONFIG'];

function solicitudAdopcionService($http,$q,CONFIG){
    var self = this;
    self.listarSolicitud = listarSolicitud;

    
    function listarSolicitud(){                
        var promesa = $q.defer();
        $http.get(CONFIG.APIURL+"adopcionservices/list-adopcion")
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