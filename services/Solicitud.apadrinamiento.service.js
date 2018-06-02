angular
.module('mimasApp')
.service('solicitudApadrinamientoService',solicitudApadrinamientoService);


solicitudApadrinamientoService.$inject = ['$http','$q'];

function solicitudApadrinamientoService($http,$q){
    var self = this;
    var ipserver = 'http://localhost:8080'; 
    self.listarSolicitud = listarSolicitud;

    
    function listarSolicitud(){                
        var promesa = $q.defer();
        $http.get(ipserver+"/mimas/rest/apadrinamientoservices/list-apadrinamiento")
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