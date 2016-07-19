/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('BuscarAssistenciaPageController', [
	'$scope', '$http', 'InitService', 'DataService',
	function ($scope, $http, InitService, DataService) {
		'use strict';

		InitService.addEventListener('ready', function () {
			// DOM ready
			console.log('BuscarAssistenciaPageController: ok, DOM ready');

			DataService.getCities().then(function successResponse(result){
				console.debug('Success:', result);
				$scope.cities = result.data;
			}, function errorResponse(err){
				console.error('Request Error', err);
				console.log(err);
			});

			DataService.getStates().then(function successResponse(result){
				console.debug('Success:', result);
				$scope.states = result.data;
			}, function errorResponse(err){
				console.error('Request Error', err);
				console.log(err);
			});

			// You can access angular like this:
			// MyApp.angular

			// And you can access Framework7 like this:
			// MyApp.fw7.app
		});  
	}
]);