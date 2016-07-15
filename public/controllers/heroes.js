angular.module('comics')
        .component('heroesComponent', {
                templateUrl: 'pages/heroes.html',
                controller: function (MarvelApi) {

                var hrs = this;
                hrs.heroes = [];

// var heroesList = ["Black Panther", "Black Widow", "Captain America","Captain Marvel","Falcon", "Hank Pym", "Hawkeye", "Hulk", "Iron Man", "Luke Cage","Quicksilver","Scarlet Witch", "Spider-Woman", "Thor","Vision","Wasp","Wonder Man"];
// var heroesList = ["Angel", "Beast", "Colossus", "Cyclops", "Emma Frost", "Gambit", "Iceman","Jean Grey","Jubilee","Kitty Pryde","Magik","Nightcrawler","Northstar","Psylocke","Rogue","Storm","Wolverine"];
                // hrs.getData = function () {
                //         for(var i=0; i < heroesList.length; i++){
                //                 MarvelApi.getHeroes(heroesList[i]).then(function (res) {
                //                 hrs.heroes.push(res.data);
                //                 debugger
                //                 });
                //         };
                // };
                hrs.getData = function(){
                        debugger
                        MarvelApi.getHeroes().then(function (res) {
                        hrs.heroes = res.data;
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