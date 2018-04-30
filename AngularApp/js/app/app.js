// Define the Angular Module with the ngRoute as dependency
var movieApp = angular.module('movieApp', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

	//Configure our Angular Routing
    movieApp.config(['$routeProvider',function($routeProvider){

        $routeProvider
        .when('/',{ // index
            templateUrl:'home.html',
            controller:'MoviesController'
        })
        .when('/find/:id',{ // view movie by id
            templateUrl:'find.html',
            controller:'FindController'
		})
		.when('/addMovie',{ // add new movie
            templateUrl:'add.html',
            controller:'AddController'
		})
        .otherwise({ redirectTo:'/' });

    }]);

//$log = console log in Angular js
//$http = communicate/ or get details from SAILS.JS Server
//$scope defines the scope of controller
movieApp.controller('MoviesController',function($scope,$http,$log,$modal){
	// GET MOVIE LIST
	$scope.movieList=[];
	$scope.movieArray = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 5;
	$scope.maxSize = 5;

	$http.get("http://ipaddress:port/movies/index/")
		 .success(function(data){
			$scope.movieList=data;
		
            angular.forEach($scope.movieList, function(value, key){ // iterate over the movieList array
				$scope.movieList = value;
			});

           $log.info($scope.movieList);
		});

	// SORT ARROW	
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
		
	// CONFIRMATION MODAL FOR DELETE
	$scope.modal = function(index,id){
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/delete_confirmation.html',
			controller : 'DeleteController',
			scope: $scope
		  });

		modalInstance.result.then(function() {
			deleteMovie(index,id);
		});

		console.log($scope.selected);
	}

	// DELETE MOVIE
	var deleteMovie = function(index,id) {
		console.log('deleteMovie : index - ' + index + '; id - ' + id);
		$http.get("http://ipaddress:port/movies/destroy/"+id)
		  	.success(function(data){
		   	$log.info(data);
		});

		$scope.movieList.splice(index, 1);
	};
});

movieApp.controller('DeleteController',function($scope,$http,$log,$modalInstance){
	// OK BUTTON IN CONFIRMATION DELETE MESSAGE (this will call the deleteMovie function)
	$scope.ok = function() {
		$modalInstance.close();
	};

	// BACK BUTTON IN CONFIRMATION DELETE MESSAGE
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

movieApp.controller('FindController',function($scope,$http,$log,$routeParams){
	//Store id in Controller
	$scope.id = $routeParams.id;
	//Initialize the Movie Data
	$scope.movie={};
	//Initialise Error Handler
	$scope.notFound = false;
	//Do an API Call to movies/find with $routeParams.id
	$http.get("http://ipaddress:port/movies/find/"+$scope.id)
		 .success(function(data){
            $scope.movie=data;

			console.log('Scope ID : ' + $scope.id);

			angular.forEach($scope.movie, function(value, key){ // iterate over the movieList array
                $scope.movie = value;
			});
			
			console.log('Data : ' + $scope.movie);
		});

	// BACK BUTTON
	$scope.back = function(){
		window.location = "#/home.html";
	}
	
	// SAVE BUTTON
	$scope.updateMovie = function(){
		var title = (!$scope.title) ? $scope.movie.title : $scope.title;
		var genre = (!$scope.genre) ? $scope.movie.genre : $scope.genre;
		var description = (!$scope.description) ? $scope.movie.description : $scope.description;

		var objectM = "?title=" +title + "&genre=" + genre + "&description=" + description;

		console.log(objectM);

		$http.post("http://ipaddress:port/movies/find/" + $scope.id + objectM)
		   	.success(function(data){
				console.log('update done');
		});
		window.location = "#/home.html";
  	}
});

movieApp.controller('AddController',function($scope,$http,$log,$routeParams){
	// SUBMIT BUTTON
	$scope.addMovie = function() {
		var objectM = "?title=" + $scope.title + "&genre=" + $scope.genre + "&description=" + $scope.description;
  
		$http.post("http://ipaddress:port/movies/create/" + objectM)
	  	 	.success(function(data){
				console.log('saved');
		});
		  window.location.href = "#/home.html";
    };

	// BACK BUTTON
	$scope.back = function(){
		window.location = "#/home.html";
	}
});