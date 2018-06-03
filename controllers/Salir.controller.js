angular.module('mimasApp')
.controller('salirController', salirController);

function salirController($scope,$location) {
    sessionStorage.setItem("user", '');
    sessionStorage.setItem("nombre", '');   
    sessionStorage.setItem("rol", '');
    sessionStorage.setItem("access", '');   
    $location.url("/"); 
}