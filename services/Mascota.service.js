	angular
		.module('mimasApp')
		.service('registarMascotaServices',registarMascotaServices);


	registarMascotaServices.$inject = ['$http','$q','CONFIG'];

	function registarMascotaServices($http,$q,CONFIG){
         var self = this;
        self.registrarMascota = registrarMascota;
        self.consultarMascotaServices = consultarMascotaServices;
        self.actualizarMascota = actualizarMascota;
        self.eliminarMascota = eliminarMascota;

        function registrarMascota(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"Mascotaservices/registrarMacota",auditJson)
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

function consultarMascotaServices(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"Mascotaservices/consultarMascota",auditJson)
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

        function actualizarMascota(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"Mascotaservices/actualizarMascota",auditJson)
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

    
         function eliminarMascota(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"Mascotaservices/eliminarMascota",auditJson)
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
