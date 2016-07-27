angular.module('comics')
        .component('createrComponent', {
                templateUrl: 'pages/creater.html',
                controller: function (MarvelApi) {

                var cr = this;
                cr.heroes = [];
                cr.test = "hello";
                debugger
                console.log(" TEST TEST")

// var heroesList = ["Black Panther", "Black Widow", "Captain America","Captain Marvel","Falcon", "Hank Pym", "Hawkeye", "Hulk", "Iron Man", "Luke Cage","Quicksilver","Scarlet Witch", "Spider-Woman", "Thor","Vision","Wasp","Wonder Man"];
//var heroesList = ["Beast", "Colossus", "Cyclops", "Emma Frost", "Gambit", "Iceman","Jean Grey","Jubilee","Kitty Pryde","Magik","Nightcrawler","Northstar","Psylocke","Rogue","Storm","Wolverine"];
                
                cr.getData = function () {
                        for(var i=0; i < heroesList.length; i++){
                                console.log(heroesList[i])
                                MarvelApi.createHeroes(heroesList[i]).then(function (res) {
                                console.log(res.data);
                                });
                        };
                };
       
                // cr.getData();

                }
        });