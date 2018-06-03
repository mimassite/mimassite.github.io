	angular
		.module('mimasApp')
		.service('loginServices',loginServices);
	loginServices.$inject = ['$http','$q','CONFIG'];
	function loginServices($http,$q,CONFIG){
        var self = this;
        self.login = login;
        self.consultarUsuario = consultarUsuario;

        function login(auditJson){                
            var promesa = $q.defer();
            debugger;
            $http.post(CONFIG.APIURL+"login",auditJson)
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
            debugger;                
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
   } 
