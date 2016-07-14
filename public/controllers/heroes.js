angular.module('comics')
        .component('heroesComponent', {
                templateUrl: 'pages/heroes.html',
                controller: function (MarvelApi) {

                var hrs = this;
                hrs.heroes = [];

                // var heroesList = ["Jack of Hearts"];

                // hrs.getData = function () {
                //         for(var i=0; i < heroesList.length; i++){
                //                 MarvelApi.getHeroes(heroesList[i]).then(function (res) {
                //                 hrs.heroes.push(res.data);
                //                 debugger
                //                 });
                //         };
                // };
                hrs.getData = function(){
                        MarvelApi.getHeroes().then(function (res) {
                        hrs.heroes = res.data.founders;
                        debugger
                        })
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