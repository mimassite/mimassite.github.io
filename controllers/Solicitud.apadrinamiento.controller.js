angular.module('mimasApp')
.controller('solicitudApadrinamientoController', solicitudApadrinamientoController);

function solicitudApadrinamientoController($scope, $location, $mdDialog, $timeout,$interval, solicitudApadrinamientoService) {
    var vm = this;
    vm.listarSolicitudes = listarSolicitudes;
    vm.numPages = numPages;
    vm.listaSolicitudes=[];
    listarSolicitudes();
    vm.$location = $location;
    vm.estadoSolicitud = estadoSolicitud;

    function listarSolicitudes(){
      solicitudApadrinamientoService.listarSolicitud().then(function(data){
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
      debugger;
      vm.$location.path('/estado-solicitudA/'+id)
    }

}