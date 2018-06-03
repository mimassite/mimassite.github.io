angular.module('mimasApp')
.controller('estadoSolicitudAdopcionController', estadoSolicitudAdopcionController);

function estadoSolicitudAdopcionController($scope,$location, $mdDialog, $timeout,$interval, estadoSolicitudAdopcionService,$routeParams) {
    
    if(sessionStorage.getItem("access") != 'true' ){
        $location.url("/"); 
    }

    var vm = this;
    var archivoBase64='';
    var extenciones = new Array("pdf")
    vm.extencionesPermitidas=' Extenciones permitidas: pdf. ';
    vm.mensajeAdjunto = '';
    var fileReader;
    vm.estado = "";
    vm.consultar = consultar;
    vm.actualizar = actualizar;
    vm.descargarPDF = descargarPDF;
    vm.idSolicitud = $routeParams.idSolicitud;
    vm.archivo = '' ;
    vm.$location = $location;
    vm.atras = atras;
    vm.rol = sessionStorage.getItem("rol");
    vm.bienvenidaUsuario = ", "+ sessionStorage.getItem("nombre");
    consultar();
  
    $scope.fileChanged = function(files){
        //Read File
        var selectedFile = files;
        if (selectedFile.length > 0) {
            var extension = selectedFile[0].name.split(".")[1]; 
            if(extencionesContains(extension)){
                var fileToLoad = selectedFile[0];
                fileReader = new FileReader();
                var base64;
                fileReader.onload = function(fileLoadedEvent) {
                    base64 = fileLoadedEvent.target.result;
                    console.log(base64);
                };
                 fileReader.readAsDataURL(fileToLoad);
                 console.log(fileReader.result);
                 vm.mensajeAdjunto = '';
            }else{
                vm.mensajeAdjunto = 'La extención del archivo no es permitida.';
                document.getElementById("file").value = "";
            }
        }
      }
      
      function extencionesContains(obj) {
        var i = extenciones.length;
        while (i--) {
           if (extenciones[i] === obj) {
               return true;
           }
        }
        return false;
    }
        
    

    function descargarPDF(){
        var dlnk = document.getElementById('dwnldLnk');
        dlnk.href = vm.archivo;    
        dlnk.click();
    }


    function consultar(){
         jQuery(window).spin();
         estadoSolicitudAdopcionService.consultarSolicitud(vm.idSolicitud).then(function(data){
            jQuery(window).spin();
            if(data.resultado[0].codRespuesta == "200") { 
                vm.mensajeMascota ='';
                vm.mensajeNombreAdjunto = '';
                vm.mensajeAdjunto = '';  
                vm.usuario = data.resultado[0].usuario;
                vm.mascota = data.resultado[0].idMascota;
                vm.nombreAdjunto = data.resultado[0].nombreAdjunto;
                vm.estado = data.resultado[0].estado;
                vm.archivo =  data.resultado[0].adjunto ;
             
                vm.Id = ""; 
                vm.idDisabled = true;
                vm.DisabledActualizar = false;
                vm.DisabledEnviar = true;
                vm.DisabledConsultar = true; 
            }else {
                  $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Consultar solicitud')
                   .textContent('Solicitud no consultada.')
                   .ariaLabel('Verifique el id de la solicitud.')
                   .ok('Cerrar')                     
                  );
            }            
         });
    }
    
     function actualizar(){
         var requestJson ={
                'idAdopcion' : vm.idSolicitud ,
                'usuario' : vm.usuario,
                'idMascota' : vm.mascota,
                'nombreAdjunto' : vm.nombreAdjunto,
                'estadoSolicitud' : vm.estado,
                'adjunto' :vm.archivo
         };
         jQuery(window).spin();
         estadoSolicitudAdopcionService.actualizarSolicitud(requestJson).then(function(data){
            jQuery(window).spin();
            if(data.resultado[0].codRespuesta == "200") {     
                   $mdDialog.show(
                     $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#dialogContainer')))
                        .clickOutsideToClose(true)
                        .title('Solicitud de adopción')
                        .textContent('Se actualizó la solicitud exitósamente.')
                        .ariaLabel('Se actualizó la solicitud exitósamente.')
                        .ok('Cerrar')                     
                    );
                    
                   vm.mascota = '';
                   vm.nombreAdjunto = '';
                   vm.adjunto = '';
                   vm.Id = ""; 
                   vm.idDisabled = false;
                   vm.DisabledActualizar = true;
                   vm.DisabledEnviar = false;
                   vm.DisabledConsultar = false; 
                  

              }else if(data.resultado[0].codRespuesta == "201"){
                     $mdDialog.show(
                     $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Solicitud de adopción')
                     .textContent('La identificación de la solicitud no existe, la solicitud no fue actualizada.')
                     .ariaLabel('No se actualizó la solicitud.')
                     .ok('Cerrar')                     
                    );

                    vm.mascota = "";
                    vm.nombreAdjunto = "";
                    document.getElementById("file").value = "";
              }         
           });

    }

    function atras(){;
        vm.$location.path('/solicitud-adopcion')
    }
}