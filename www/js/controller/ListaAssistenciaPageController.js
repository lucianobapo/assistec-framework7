/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('ListaAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService',
    function ($scope, $http, InitService, DataService) {
        'use strict';

        InitService.addEventListener('ready', function () {
            // DOM ready
            console.log('ListaAssistenciaPageController: ok, DOM ready');

            DataService.getSupports().then(function successResponse(result){
                console.debug('Success:', result);
                $scope.supports = result.data._embedded.servico;
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