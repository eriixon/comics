angular.module('comics')
        .component('xmenComponent', {
                templateUrl: 'pages/xmen.html',
                controller: function (MarvelApi) {

                var xm = this;
                xm.heroes = [];

                xm.getData = function(){
                    MarvelApi.getHeroes().then(function (res) {
                        debugger
                    xm.heroes = res.data.x-men;
                    debugger
                    })
                };
                xm.getData();

        }
});