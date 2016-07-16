angular.module('comics')
        .component('avengersComponent', {
                templateUrl: 'pages/avengers.html',
                controller: function (MarvelApi) {

                var avg = this;
                avg.heroes = [];

                avg.getData = function(){
                        MarvelApi.getHeroes().then(function (res) {
                debugger
                        avg.heroes = res.data.avengers;
                        debugger
                        })
                };        
                avg.getData();

                }
        });
