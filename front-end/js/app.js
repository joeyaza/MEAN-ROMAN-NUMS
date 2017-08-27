var app = angular
	.module('app', []);	

app.controller('Main', ['$scope', '$http', function ($scope, $http) {

	// times need to be added here
	$http.get('http://localhost:3001/conversions').success(function(res){
		$scope.all=res;
		var timeId =[];
		for(i=0;i<res.length;i++) {
			timeId.push(new Date(parseInt(res[i]._id.substring(0, 8), 16) * 1000));
		}
		console.log(timeId);
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