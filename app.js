angular.module('mimasApp', ['ngRoute','ngMaterial', 'ngMessages','ngMask','ngMdIcons','ui.bootstrap'])
 
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Home.publico.html',
            controller: 'homepublicoController',
        })
        .when('/login', {
            templateUrl: 'views/Login.html',
            controller: 'loginController'
        })
        .when('/login-adopcion/:idMascota', {
            templateUrl: 'views/Login.adopcion.html',
            controller: 'loginAdopcionController'
        })
        .when('/login-apadrinar/:idMascota', {
            templateUrl: 'views/Login.adopcion.html',
            controller: 'loginApadrinarController'
        })
        .when('/home-transaccional', {
            templateUrl: 'views/Home.transaccional.html',
            controller: 'homeController'
        })
        .when('/mascota', {
            templateUrl: 'views/Mascota.html',
            controller: 'mascotaController'
        })
        .when('/registra-suario', {
            templateUrl: 'views/Registrar_Usuario.html',
            controller: 'registrarUsuarioController'
        })
        .when('/usuario', {
            templateUrl: 'views/Usuario.html',
            controller: 'UsuarioController'
        })
        .when('/adopcion/:idMascota', {
            templateUrl: 'views/Adopcion.html',
            controller: 'adopcionController'
        })        
        .when('/apadrinamiento/:idMascota', {
            templateUrl: 'views/apadrinamiento.html',
            controller: 'apadrinamientoController'
        })
        .when('/solicitudes-adopcion', {
            templateUrl: 'views/SoliciudesAdopcion.html',
            controller: 'solicitudAdopcionController'
        })
        .when('/solicitud-adopcion', {
            templateUrl: 'views/Lista.Solicitud.adopcion.html',
            controller: 'solicitudAdopcionController'
        })
        .when('/estado-solicitud/:idSolicitud', {
            templateUrl: 'views/Estado.solicitud.adopcion.html',
            controller: 'estadoSolicitudAdopcionController'
        })
        .when('/solicitudes-apadrinamiento', {
            templateUrl: 'views/SoliciudesApadrinamiento.html',
            controller: 'solicitudApadrinamientoController'
        })
        .when('/solicitud-apadrinamiento', {
            templateUrl: 'views/Lista.Solicitud.apadrinamiento.html ',
            controller: 'solicitudApadrinamientoController'
        })
        .when('/estado-solicitudA/:idSolicitud', {
            templateUrl: 'views/Estado.solicitud.apadrinamiento.html',
            controller: 'estadoSolicitudApadrinamientoController'
        })
        .when('/salir', {
            templateUrl: 'views/Salir.html',
            controller: 'salirController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);