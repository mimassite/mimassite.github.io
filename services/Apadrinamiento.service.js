angular
.module('mimasApp')
.service('apadrinamientoService',apadrinamientoService);


apadrinamientoService.$inject = ['$http','$q','CONFIG'];

function apadrinamientoService($http,$q,CONFIG){
    var self = this;
    self.enviarSolicitud = enviarSolicitud;
    self.consultarSolicitud = consultarSolicitud;
 //   self.actualizarSolicitud = actualizarSolicitud;

    var self = this;
    var ipserver = 'http://localhost:8081'; 
    self.enviarSolicitud = enviarSolicitud;

    // function actualizarSolicitud(auditJson){                
    //     var promesa = $q.defer();
    //     $http.post(CONFIG.APIURL+"apadrinamientoservices/apadrinamiento",auditJson)
    //         .success(function(data){
    //             promesa.resolve({
    //                 resultado:data
    //             })
    //         })
    //         .error(function(err){
    //             promesa.resolve({
    //                 resultado:err
    //             })
    //         })
    //         return promesa.promise      
        
    // }

    function enviarSolicitud(auditJson){                
        var promesa = $q.defer();
        $http.post(CONFIG.APIURL+"apadrinamientoservices/apadrinamiento",auditJson)
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

}