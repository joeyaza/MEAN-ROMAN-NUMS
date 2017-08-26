var app = angular
		.module('app', []);	



app.controller('Main', ['$scope', '$http', function ($scope, $http) {
	$http.get('http://localhost:3001/conversions').success(function(res){
		$scope.all=res;
		var timeId =[];
		for(i=0;i<res.length;i++) {
			timeId.push(new Date(parseInt(res[i]._id.substring(0, 8), 16) * 1000));
		}
		console.log(timeId)
	})
}]);