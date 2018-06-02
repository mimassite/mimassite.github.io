	angular
		.module('mimasApp')
		.service('UsuarioServices',UsuarioServices);


	UsuarioServices.$inject = ['$http','$q','CONFIG'];

	function UsuarioServices($http,$q,CONFIG){
         var self = this;
        self.registrarUsuario = registrarUsuario;
        self.consultarUsuario = consultarUsuario;
        self.actualizarUsuario = actualizarUsuario;
        self.eliminarUsuario = eliminarUsuario;

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


          function consultarUsuario(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"usuarioServices/consultarUsuario",auditJson)
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


        function actualizarUsuario(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"usuarioServices/actualizarUsuario",auditJson)
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


        function eliminarUsuario(auditJson){                
            var promesa = $q.defer();
            $http.post(CONFIG.APIURL+"usuarioServices/eliminarUsuario",auditJson)
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
