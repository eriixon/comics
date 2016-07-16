angular.module('comics')
        .component('avengersComponent', {
                templateUrl: 'pages/avengers.html',
                controller: function (MarvelApi) {

                var hrs = this;
                avg.heroes = [];

                avg.getData = function(){
                    MarvelApi.getHeroes().then(function (res) {
                    hrs.heroes = res.data;
                    debugger
                    })
                };
                hrs.getData();

        }
});