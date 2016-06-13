angular.module('comics')
        .component('heroesComponent', {
        templateUrl: 'components/pages/heroes.html',
        controller: function () {

        var hrs = this;
        hrs.test =" Hello from Heroes";

        }
});

angular.module('comics')
        .component('heroComponent', {
        templateUrl: 'components/pages/hero.html',
        controller: function () {

        var hr = this;
        hr.test =" Hello from Hero";

        }
});