angular.module('mimasApp')
    .filter("estado", function(){
        return function(id) {
            if(id == 1){
                return "En adopción";
            }else if(id == 2){
                return "Adoptado";
            }else if(id == 3){
                return "Perdido";
            }else if(id == 4){
                return "Recuperado";
            }
        }
    })
    .filter("sexo", function(){
        return function(id) {
            if(id == 1){
                return "Hembra";
            }else if(id == 2){
                return "Macho";
            }
        }
    })