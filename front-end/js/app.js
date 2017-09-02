var app = angular
	.module('app', []);	

app.factory('GetAllFactory', ['$http', function($http) {
	 var GetAllFactory = {
	 	data: []
	 }
	 GetAllFactory.getData = function()  {
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
			  if(!Number($scope.from)) {
   				 $scope.from = $scope.from.toUpperCase();  
 			 }
			conversionData = $scope.from;
			$http.post("http://localhost:3001/conversions", 
				{from:conversionData}, 
				{headers: {'Content-Type': 'application/json'} })
	        .then(function (response) {
	        	console.log(response.data.to, $scope.from)
	        	if (response.data.to===$scope.from) {
	        		console.log('top')
	        		$scope.answer = response.data.from;
	        	} else {
	        		console.log('bottom')
	        		$scope.answer = response.data.to;
	        	}
        		GetAllFactory.getData();
				$scope.all=GetAllFactory;
	    	});
		} else {
			$scope.error = 'Please enter a valid roman numeral or number!!';
			$scope.answer = '';
			return;
		}
	};
	$scope.deleteAll = function() {
		$http.delete("http://localhost:3001/conversions").then(function(response){
			console.log(response)
			if(response.status===200 && response.data.n === 0 ) {
					$scope.error = 'Nothing to delete!!';
			} else if(response.status===200 ) {
				$scope.error = 'All deleted!!';
				$scope.all='';
			} else $scope.error = 'Sorry, could not delete - please try again!!';
		});
	}
}]);
