angular.module('mimasApp')
.controller('adopcionController', adopcionController);

function adopcionController($scope, $mdDialog, $timeout,$interval, adopcionService,$routeParams,$location) {
    
    if(sessionStorage.getItem("access") != 'true' ){
        $location.url("/"); 
    }
    
    var vm = this;
    vm.usuario = sessionStorage.getItem("user");
    var archivoBase64='';
    var extenciones = new Array("pdf")
    vm.extencionesPermitidas=' Extenciones permitidas: pdf. ';
    vm.mensajeAdjunto = '';
    var fileReader;
    vm.estado = "";
    vm.consultar = consultar;
    vm.actualizar = actualizar;
    vm.cancelar = cancelar;
    vm.enviar = enviar;
    vm.descargarPDF = descargarPDF;
    vm.idSolicitud = "";
    vm.archivo = '' ;
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


    function cancelar(){
        vm.mascota = '';
        vm.nombreAdjunto = '';
        vm.adjunto = '';
        vm.Id = ""; 
        vm.idDisabled = false;
        vm.DisabledActualizar = true;
        vm.DisabledEnviar = false;
        vm.DisabledConsultar = false; 
        vm.archivo = '';
        vm.estado = '';
        vm.mensajeMascota ='';
        vm.mensajeNombreAdjunto = '';
        vm.mensajeAdjunto = '';
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
        
    
    function enviar(){
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
                'estadoSolicitud' : '1',
                'adjunto' : fileReader.result 
         };
         jQuery(window).spin();
         adopcionService.enviarSolicitud(requestJson).then(function(data){
            jQuery(window).spin();
            if(data.resultado[0].codRespuesta == "200") {     
                   $mdDialog.show(
                     $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#dialogContainer')))
                        .clickOutsideToClose(true)
                        .title('Solicitud de adopción')
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
                     .title('Solicitud de adopción')
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

    function descargarPDF(){
        var dlnk = document.getElementById('dwnldLnk');
        dlnk.href = vm.archivo;    
        dlnk.click();
    }


    function consultar(){
        if(vm.Id == undefined  || vm.Id  == ''){
               vm.mensajeId = "Debes ingresar un id para consultar";
               return;
         }
         jQuery(window).spin();
         adopcionService.consultarSolicitud(vm.Id).then(function(data){
            jQuery(window).spin();
            if(data.resultado[0].codRespuesta == "200") { 
                 $mdDialog.show(
                   $mdDialog.alert()
                   .parent(angular.element(document.querySelector('#dialogContainer')))
                   .clickOutsideToClose(true)
                   .title('Consultar solicitud')
                   .textContent('Solicitud consultada.')
                   .ariaLabel('Solicitud consultada.')
                   .ok('Cerrar')                     
                  );
                vm.mensajeMascota ='';
                vm.mensajeNombreAdjunto = '';
                vm.mensajeAdjunto = '';  
                vm.idSolicitud = vm.Id;
                vm.usuario = data.resultado[0].usuario;
                vm.mascota = data.resultado[0].idMascota;
                vm.nombreAdjunto = data.resultado[0].nombreAdjunto;
                
                vm.archivo =  data.resultado[0].adjunto ;
           
               
                switch(data.resultado[0].estado){
                    case "1":
                        vm.estado = 'En proceso' ;
                        break;
                    case "2":
                        vm.estado = 'Aceptado' ;
                        break;
                    case "3": 
                        vm.estado = 'Rechazado' ;
                        break;
                    case "4": 
                        vm.estado = 'Cacelado' ;
                        break;    
                    default: 
                        vm.estado = 'En proceso' ;
                }

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
        if(vm.mascota == undefined || vm.mascota =='' ){
           vm.mensajeMascota = "Debes ingresar un dato valido."
           return;
        }

        if(vm.nombreAdjunto == undefined || vm.nombreAdjunto =='' ){
            vm.mensajeNombreAdjunto = "Debes ingresar un dato valido."
            return;
         }

       if(fileReader != undefined && fileReader.result !='' ){
           vm.archivo = fileReader.result;
        }
        
         var requestJson ={
                'idAdopcion' : vm.idSolicitud,
                'usuario' : vm.usuario,
                'idMascota' : vm.mascota,
                'nombreAdjunto' : vm.nombreAdjunto,
                'estadoSolicitud' : vm.estado,
                'adjunto' :vm.archivo
         };
         jQuery(window).spin();
         adopcionService.actualizarSolicitud(requestJson).then(function(data){
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
                   document.getElementById("file").value = "";
                  

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
}