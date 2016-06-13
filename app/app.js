(function(){angular.module('comics', ['ui.router', 'js-data'])})();


angular.module('comics').config(function($stateProvider){
            
        $stateProvider  
                .state('books', {
                    url: '/books',
                    template: '<books-component></books-component>'
                })
                .state('book', {
                    url: '/book',
                    template: '<book-component></book-component>'
                })
                .state('movies', {
                    url: '/movies',
                    template: '<movies-component></movies-component>'
                })
                .state('movie', {
                    url: '/movie',
                    template: '<movie-component></movie-component>'
                })
                .state('heroes', {
                    url: '/heroes',
                    template: '<heroes-component></heroes-component>'
                })
                .state('hero', {
                    url: '/hero',
                    template: '<hero-component></hero-component>'
                })
});





