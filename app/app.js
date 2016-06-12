(function(){angular.module('comics', ['ui.router', 'js-data'])})();


angular.module('comics').config(function($stateProvider){
            
        $stateProvider  
                .state('books', {
                    url: '/books',
                    template: '<comicsbooks-component></comicsbooks-component>'
                })
                .state('book', {
                    url: '/book',
                    template: '<comicsbook-component></comicsbook-component>'
                })
                .state('movies', {
                    url: '/movies',
                    template: '<comicsbooks-component></comicsbooks-component>'
                })
                .state('movies', {
                    url: '/movie',
                    template: '<comicsbook-component></comicsbook-component>'
                })
                .state('heroes', {
                    url: '/heroes',
                    template: '<comicsbooks-component></comicsbooks-component>'
                })
                .state('hero', {
                    url: '/hero',
                    template: '<comicsbook-component></comicsbook-component>'
                })
});





