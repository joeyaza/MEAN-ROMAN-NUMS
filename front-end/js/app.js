var app = angular
	.module('app', []);	


app.factory('GetAllFactory', ['$http', function($http) {
	 var GetAllFactory = {
	 	data: []
	 }
	 GetAllFactory.getData = function()  {
	 	if (GetAllFactory.data.length) return;
	 	return $http.get('http://localhost:3001/conversions').success(function(res){
			GetAllFactory.data=res;
		});
	 }
	 return GetAllFactory;
}])

app.controller('Main', ['$scope', '$http', 'GetAllFactory', function ($scope, $http, GetAllFactory) {
	GetAllFactory.getData();
	$scope.all=GetAllFactory;
	$scope.submit = function() {
		if(/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i.test($scope.from) || /^\d+$/i.test($scope.from)) {
			$scope.error = '';
			conversionData = $scope.from;
			$http.post("http://localhost:3001/conversions", {from:conversionData}, {headers: {'Content-Type': 'application/json'} })
		        .then(function (response) {
		    	$scope.answer = response.data.to;
		    });
		} else {
			$scope.error = 'Please enter a valid roman numeral or number!!';
			$scope.answer = '';
			return
		}
	};
}]);
