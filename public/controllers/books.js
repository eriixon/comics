
// angular.module('comics')
//         .component('booksComponent', {
//         templateUrl: 'components/pages/books.html',
//         controller: function () {

//         var bks = this;
//         bks.test =" Hello from books";

//         }
// });

// angular.module('comics')
//         .component('bookComponent', {
//         templateUrl: 'components/pages/book.html',
//         controller: function () {

//         var bk = this;
//         bk.test =" Hello from Book";

//         }
// });

(function () {
	'use strict';

	angular.module('comics').component('booksComponent', {
		templateUrl: 'pages/books.html',
		controller: function (MarvelApi) {
		
		var bks = this;
		bks.books = [];

		bks.getData = function(){
			MarvelApi.getBooks().then(function(res){
				bks.books = res.data.books.data;
			});
        };

        bks.getData();
	}	
})})();