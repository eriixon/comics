
angular.module('comics')
        .component('comicsbooksComponent', {
            templateUrl: 'components/pages/comicsbooks.html',
            controller: function () {

            var cbs = this;
            cbs.test =" Hello from books";

            }
})