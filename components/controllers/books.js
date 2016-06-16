
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

	angular.module('comics')
	.component('booksComponent', {
		templateUrl: 'components/pages/books.html',
		controller: BooksController
	});
	debugger
	BooksController.$inject = ['MarvelApi'];	//FOR MINIFICATION

	function BooksController(MarvelApi) {
		
		var bks = this;
		bks.$onInit = activate;
		bks.books = [];

		function activate() {
            bks.getData = function(direction){
                vm.currentPage += direction
                starWarsApi.getPeople(vm.currentPage).then(function(data){
                    vm.people = data.results;
                    vm.next = data.next;
                    vm.prev = data.previous;
                });
            };
            vm.getData(1);
		}	

	}	
})();