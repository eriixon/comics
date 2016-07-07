angular.module('comics')
        .component('heroesComponent', {
                templateUrl: 'pages/heroes.html',
                controller: function (MarvelApi) {

                var hrs = this;
                hrs.heroes = [];


                hrs.getData = function () {
                        MarvelApi.getHeroes().then(function (res) {
                        hrs.heroes = res.data.heroes;
                        });
                };

                hrs.getData();

                }
        });

// angular.module('comics')
//         .component('heroComponent', {
//         templateUrl: 'pages/hero.html',
//         controller: function () {

//         var hr = this;
//         hr.test =" Hello from Hero";

//         }
// });