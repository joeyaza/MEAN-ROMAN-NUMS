var app = angular
	.module('app', []);	

app.controller('Main', ['$scope', '$http', function ($scope, $http) {

	$http.get('http://localhost:3001/conversions').success(function(res){
		$scope.all=res;
	});

	$scope.submit = function() {
		if(!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i.test($scope.from)) {
			$scope.error = 'Please enter a valid roman numeral!';
			$scope.answer = '';
			return;
		} else {
			$scope.error = '';
			conversionData = $scope.from;
			$http.post("http://localhost:3001/conversions", {from:conversionData}, {headers: {'Content-Type': 'application/json'} })
		        .then(function (response) {
		            $scope.answer = response.data.to;
		    });
		}
	};
}]);