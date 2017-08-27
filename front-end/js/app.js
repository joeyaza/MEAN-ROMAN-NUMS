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
	});

// 	$scope.submit = function() {
// 		conversionData = $scope.from;
//     	if ($scope.from) {   
//     		console.log(conversionData);
//     	   $http({
// 		        url: 'http://localhost:3001/conversions',
// 		        method: "POST",
// 				headers: {'Content-Type': 'application/json; charset=UTF-8' },
// 		        data: {"from":conversionData}
// 		    })
// 		    .then(function(response) {
// 		            console.log(response);
// 		    })

//     }
// }
$scope.submit = function() {
	conversionData = $scope.from
$http.post("http://localhost:3001/conversions", {from:conversionData}, {headers: {'Content-Type': 'application/json'} })
        .then(function (response) {
            console.log(response)
        });
    }

  //     var data = {
  //       "conversion" : $scope.to
  //     };
  //     var config = {
  //         headers : {
  //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
  //         }
  //     }
  //     console.log(data);
  //     $http({
  //       method: 'POST',
  //       url : 'http://localhost:3001/conversions',
  //       headers : config.headers,
  //       data: data

  //     }).then(function (res) {
  //     	console.log(res)
  //         $scope.PostDataResponse = data;
  //       });
    
  //   } 
  // }  
}]);