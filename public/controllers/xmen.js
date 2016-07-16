angular.module('comics')
        .component('xmenComponent', {
                templateUrl: 'pages/xmen.html',
                controller: function (MarvelApi) {

                var hrs = this;
                xm.heroes = [];

                xm.getData = function(){
                    MarvelApi.getHeroes().then(function (res) {
                    hrs.heroes = res.data;
                    debugger
                    })
                };
                xm.getData();

        }
});