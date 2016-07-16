
(function(){
    
    angular.module('comics', ['ui.router']);


angular.module('comics').config(function($stateProvider){
            
        $stateProvider
                .state('home',{
                    url: "",
                    template: "<home-component></home-component>"
                })
                .state('creater', {
                    url: '/creater',
                    template: '<creater-component></creater-component>'
                })
                .state('xmen', {
                    url: '/xmen',
                    template: '<xmen-component></xmen-component>'
                })
                .state('avengers', {
                    url: '/avengers',
                    template: '<avengers-component></avengers-component>'
                })

});

})();





