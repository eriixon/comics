angular.module('comics')
        .component('xmenComponent', {
                templateUrl: 'pages/xmen.html',
                controller: function (MarvelApi) {

                var xm = this;
                xm.heroes = [];

                xm.getData = function(){
                    MarvelApi.getHeroes().then(function (res) {
                    xm.heroes = res.data.xmen;
                    debugger
                    })
                };
                xm.getData();

        }
});