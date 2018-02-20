const TIME_INCREMENT = 1;
const TIMER_DELAY = 10;	

const PROJECT_IDENTIFIER = 1;
const TAG_IDENTIFIER = 2;
const TIME_IDENTIFIER = 3;


class timerConfig{
	constructor($routeProvider){
		$routeProvider
		.when("/", {
			templateUrl : "_views/dashboard.html",
			
		})
		.when("/Dashboard", {
			templateUrl : "_views/dashboard.html",
			
		})
		.when("/Reports", {
			templateUrl : "_views/reports.html",
			
		})
		.otherwise({
			templateUrl : "_views/dashboard.html",
			
		})
	}
}


let timerApp = angular
	.module('timerApp',["ngRoute"])
	.controller('dashboardController', dashboardController)
	.controller('reportsController', reportsController)
	.filter('hhmmssmm', filter_hhmmssmm)
	.config(timerConfig);

	



	
	


