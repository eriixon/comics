(function(){angular.module('comics', ['ui.router', 'js-data'])})();


angular.module('comics').config(function($stateProvider){
            
        $stateProvider  
                .state('comicsbooks', {
                    url: '',
                    template: '<comicsbooks-component></comicsbooks-component>'
                })
                .state('comicsbook', {
                    url: '/:book',
                    template: '<comicsbook-component></comicsbook-component>'
                })
});





