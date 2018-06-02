angular.module('mimasApp')
.controller('apadrinamientoController', apadrinamientoController);

function apadrinamientoController($scope, $mdDialog, $timeout,$interval, apadrinamientoService,$routeParams,$location) {
    
    if(sessionStorage.getItem("access") != 'true' ){
        $location.url("/"); 
    }
   
    var vm = this;
    vm.usuario = sessionStorage.getItem("user");
    var archivoBase64='';
    var extenciones = new Array( "jpg", "png", "doc", "pdf")
    vm.extencionesPermitidas=' Extenciones permitidas: jpg, png, doc y pdf. ';
    vm.mensajeAdjunto = '';
    var fileReader;
    vm.mascota = $routeParams.idMascota != 0 ? $routeParams.idMascota : "";
    vm.rol = sessionStorage.getItem("rol");
    vm.bienvenidaUsuario =", "+ sessionStorage.getItem("nombre");
  
    vm.functionMascota = function(){
         if(vm.mascota.length > 0){
             vm.mensajeMascota ="";
         }
    }

    vm.functionNombreAdjunto = function(){
         if(vm.nombreAdjunto.length > 0){
             vm.mensajeNombreAdjunto ="";
           }
    }


    vm.limpiar = function(){
        vm.mascota = '';
        vm.nombreAdjunto = '';
        vm.adjunto = '';
        document.getElementById("file").value = "";
        
    }

    $scope.fileChanged = function(files){
        //Read File
        debugger;
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
        
    
    vm.enviar = function(){
        if(vm.mascota == undefined || vm.mascota =='' ){
           vm.mensajeMascota = "Debes ingresar un dato valido."
           return;
        }

        if(vm.nombreAdjunto == undefined || vm.nombreAdjunto =='' ){
            vm.mensajeNombreAdjunto = "Debes ingresar un dato valido."
            return;
         }

         if(fileReader == undefined || fileReader.result =='' ){
            vm.mensajeAdjunto = "Debes adjuntar un archivo."
            return;
         }
        
         var requestJson ={
                'usuario' : vm.usuario,
                'idMascota' : vm.mascota,
                'nombreAdjunto' : vm.nombreAdjunto,
                'adjunto' : fileReader.result 
         };
         jQuery(window).spin();
         apadrinamientoService.enviarSolicitud(requestJson).then(function(data){
            jQuery(window).spin();
            if(data.resultado[0].codRespuesta == "200") {     
                   $mdDialog.show(
                     $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#dialogContainer')))
                        .clickOutsideToClose(true)
                        .title('Solicitud de apadrinamiento')
                        .textContent('Se envió la solicitud exitósamente.')
                        .ariaLabel('Se envió la solicitud exitósamente.')
                        .ok('Cerrar')                     
                    );
                    
                   vm.mascota = "";
                   vm.nombreAdjunto = "";
                   document.getElementById("file").value = "";
                  

              }else if(data.resultado[0].codRespuesta == "501"){
                     $mdDialog.show(
                     $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#dialogContainer')))
                     .clickOutsideToClose(true)
                     .title('Solicitud de apadrinamiento')
                     .textContent('La identificación de la mascota no existe, la solicitud no fue enviada.')
                     .ariaLabel('No se envió la solicitud.')
                     .ok('Cerrar')                     
                    );

                    vm.mascota = "";
                    vm.nombreAdjunto = "";
                    document.getElementById("file").value = "";
              }         
           });

    }
    
    

}