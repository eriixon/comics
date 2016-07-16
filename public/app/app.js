(function(){angular.module('comics', ['ui.router', 'js-data'])})();


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
                    template: '<book-component></book-component>'
                })
                .state('avengers', {
                    url: '/avengers',
                    template: '<avengers-component></avengers-component>'
                })

});





