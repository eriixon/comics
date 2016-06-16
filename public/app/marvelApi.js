(function () {
	'use strict';

	angular.module('comics').factory('MarvelApi', ['$q', '$http', function ($q, $http) {

		var urlBase = "http://gateway.marvel.com:80/v1/public";
		var comicsUrl = '/v1/public/comics?format=comic&apikey=479270933a18d0a5dbc60c4def569d731e92dac1';
		var MarvelUrl = "http://marvel.com/?url=";

		function getBooks() {
			var deferred = $q.defer();			
			$http.get(MarvelUrl+urlBase+comicsUrl).then(function (resp) {
				if (resp.status === 200) {
					deferred.resolve(resp.data);
					debugger
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