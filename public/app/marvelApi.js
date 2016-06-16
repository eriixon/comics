(function () {
	'use strict';

angular.module('comics').service('MarvelApi', ['$q', '$http', function ($q, $http) {



		this.getBooks = function (books) {
			return $http.get('/books', books)
		}



			// var deferred = $q.defer();			
			// $http.get(urlBase+comicsUrl).then(function (resp) {
			// 	if (resp.status === 200) {
			// 		deferred.resolve(resp.data);
			// 		debugger
			// 	}
			// 	else {
			// 		deferred.reject(resp.statusText);
			// 	}
			// });		
			// return deferred.promise;

		
	}]);
})();