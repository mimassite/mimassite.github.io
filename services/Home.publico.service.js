angular
.module('mimasApp')
.service('homePublicoService',homePublicoService);


homePublicoService.$inject = ['$http','$q','CONFIG'];

function homePublicoService($http,$q,CONFIG){
    var self = this;
    self.listarMascota = listarMascota;

    
    function listarMascota(){                
        var promesa = $q.defer();
        $http.get(CONFIG.APIURL+"Mascotaservices/listaMascota")
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