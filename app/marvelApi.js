(function () {
	'use strict';

	angular.module('comics').factory('MarvelApi', ['$q', '$http', function ($q, $http) {

		var urlBase = 'http://gateway.marvel.com';
		var comicsUrl = '/v1/public/comics?format=comic&apikey=fdd93787da3c53e3ff3f0b877d8df680'

		function getBooks() {
			var deferred = $q.defer();			
			$http.get('http://gateway.marvel.com:80/v1/public/comics?format=comic&apikey=fdd93787da3c53e3ff3f0b877d8df680').then(function (resp) {
				if (resp.status === 200) {
					deferred.resolve(resp.data);
				}
				else {
					deferred.reject(resp.statusText);
				}
			});		
			return deferred.promise;
		}
		
		// function getBook(id) {
		// 	var deferred = $q.defer();			
		// 	$http.get(urlBase + 'people/' + id).then(function (data) {
		// 		if (resp.status === 200) {
		// 			deferred.resolve(resp.data.results);
		// 		}
		// 		else {
		// 			deferred.reject(resp.statusText);
		// 		}
		// 	});
			
		// 	return deferred.promise;
		// }

		return {
			getBooks: getBooks
			// getPerson: getPerson
		};
	}]);
})();