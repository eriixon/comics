(function () {
	'use strict';

angular.module('comics').service('MarvelApi', ['$q', '$http', function ($q, $http) {

		this.getBooks = function (books) {
			return $http.get('/books', books)
		}
		this.getHeroes = function (heroes) {
			return $http.get('/heroes', heroes)
		}
		
	}]);
})();