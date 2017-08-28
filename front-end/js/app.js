var app = angular
	.module('app', []);	

app.controller('Main', ['$scope', '$http', function ($scope, $http) {
	$http.get('http://localhost:3001/conversions').success(function(res){
		$scope.all=res;
		console.log($scope.all);
	});
	$scope.submit = function() {
		conversionData = $scope.from
		$http.post("http://localhost:3001/conversions", {from:conversionData}, {headers: {'Content-Type': 'application/json'} })
	        .then(function (response) {
	            console.log(response)
	            $scope.answer = response.data.to;
	    });
	};
}]);