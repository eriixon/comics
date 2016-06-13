
angular.module('comics')
        .component('booksComponent', {
        templateUrl: 'components/pages/books.html',
        controller: function () {

        var bks = this;
        bks.test =" Hello from books";

        }
});

angular.module('comics')
        .component('bookComponent', {
        templateUrl: 'components/pages/book.html',
        controller: function () {

        var bk = this;
        bk.test =" Hello from Book";

        }
});