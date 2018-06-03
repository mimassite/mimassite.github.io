angular
.module('mimasApp')
.controller('homeController', homeController);

function homeController($scope,$location) {
  
  if(sessionStorage.getItem("access") != 'true' ){
    $location.url("/"); 
   }

   var vm = this;
   vm.rol = sessionStorage.getItem("rol");
   vm.bienvenidaUsuario = ", "+ sessionStorage.getItem("nombre");



   

} 
    
