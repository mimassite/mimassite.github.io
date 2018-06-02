angular
    .module('mimasApp')
    .controller('loginApadrinarController', loginApadrinarController);

  function loginApadrinarController($scope, $mdDialog,loginServices, $location, $window,$routeParams) {
        var vm = this;
        vm.ingresar = ingresar;
        vm.cancelar = cancelar;
        vm.mensajeUsuario = '';
        vm.mensajeContrasena = '';
        vm.functionUsuario = functionUsuario ;
        vm.functionContrasena = functionContrasena;        
        vm.login = login;
        localStorage.setItem("user", '');
        vm.idMascota = $routeParams.idMascota;
        console.log("idmascota: "+vm.idMascota);

      function functionUsuario(){
        if (vm.usuario.length > 0) {
          vm.mensajeUsuario = '';
        }

      }

      function functionContrasena(){
         if (vm.contrasena.length > 0) {
          vm.mensajeContrasena = '';
        }

      }

      function ingresar() {
        // jQuery(window).spin();
            if(vm.usuario == undefined || vm.usuario == ''){
               vm.mensajeUsuario = 'Ingrese un valor válido';
               return;
              }
              
              if(!/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(vm.usuario)){
                vm.mensajeUsuario   = "Ingrese un correo valido";
                return;
              }

            if(vm.contrasena == undefined || vm.contrasena == ''){
               vm.mensajeContrasena = 'Ingrese un valor válido';
               return;
            }

           grecaptcha.execute();
   }


   function cancelar(){
     vm.usuario = "";
     vm.contrasena = "";
   }


    function login(){
           jQuery(window).spin();
            var requestJson = {
                    "email" : vm.usuario,
                    "contrasena" : vm.contrasena
                    }        
            vm.modalShown2 = true;
            console.log(JSON.stringify(requestJson));                      
            loginServices.login(requestJson).then(function(data){
              jQuery(window).spin();  
            if(data.resultado[0].codRespuesta == "200") {   
                var usuario = vm.usuario;                    
                sessionStorage.setItem("user", vm.usuario.trim());
                sessionStorage.setItem("nombre", data.resultado[0].nombre1);   
                sessionStorage.setItem("rol", data.resultado[0].rol);
                sessionStorage.setItem("access", true);                
                $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Ingresar')
                     .textContent('Usuario valido')
                     .ariaLabel('Usuario registrado')
                     .ok('Cerrar')                     
               );                
               $location.url("/apadrinar/"+vm.idMascota);      
            }else{
                $mdDialog.show(
                  $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Ingresar')
                     .textContent('Usuario no valido')
                     .ariaLabel('Usuario no registrado')
                     .ok('Cerrar')
               );
            }  
       });
  } 
    
 }