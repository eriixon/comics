angular.module('comics')
        .component('moviesComponent', {
        templateUrl: '/pages/movies.html',
        controller: function () {

        var mvs = this;
        mvs.test =" Hello from Movies";

        }
});

angular.module('comics')
        .component('movieComponent', {
        templateUrl: 'pages/movie.html',
        controller: function () {

        var mv = this;
        mv.test =" Hello from Movie";

        }
});