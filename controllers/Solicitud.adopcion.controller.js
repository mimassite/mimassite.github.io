angular.module('mimasApp')
.controller('solicitudAdopcionController', solicitudAdopcionController);

function solicitudAdopcionController($scope, $location, $mdDialog, $timeout,$interval, solicitudAdopcionService) {
    var vm = this;
    vm.listarSolicitudes = listarSolicitudes;
    vm.numPages = numPages;
    vm.listaSolicitudes=[];
    listarSolicitudes();
    vm.$location = $location;
    vm.estadoSolicitud = estadoSolicitud;
    vm.rol = sessionStorage.getItem("rol");
    vm.bienvenidaUsuario = ", "+ sessionStorage.getItem("nombre");

    function listarSolicitudes(){
      solicitudAdopcionService.listarSolicitud().then(function(data){
         vm.listaSolicitudes = data.resultado;  
         vm.filteredTodos = []
         ,vm.currentPage = 1
         ,vm.numPerPage = 5
         ,vm.maxSize = 5;
        });
    }
    
    function numPages() {
      return Math.ceil(vm.listaSolicitudes.length / vm.numPerPage);
    };
    
    $scope.$watch('vm.currentPage + vm.numPerPage', function() {
      var begin = ((vm.currentPage - 1) * vm.numPerPage)
      , end = begin + vm.numPerPage;
      
      vm.filteredTodos = vm.listaSolicitudes.slice(begin, end);
    });

    function estadoSolicitud(id){
      vm.$location.path('/estado-solicitud/'+id)
    }

}