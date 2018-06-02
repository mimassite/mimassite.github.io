
	angular
		.module('mimasApp')
		.service('registarUsuarioServices',registarUsuarioServices);


	registarUsuarioServices.$inject =  ['$http','$q','CONFIG'];

	function registarUsuarioServices($http,$q,CONFIG){
         var self = this;
        self.registrarUsuario = registrarUsuario;

        function registrarUsuario(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"usuarioServices/registrarUsuario",auditJson)
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
