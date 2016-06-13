angular.module('comics')
        .component('homeComponent', {
        templateUrl: 'components/pages/home.html',
        controller: function () {

        var vm = this;
        vm.test =" Hello from home";

        }
});