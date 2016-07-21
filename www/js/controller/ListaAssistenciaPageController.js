/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('ListaAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService', '$rootScope',
    function ($scope, $http, InitService, DataService, $rootScope) {
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

        $scope.$watch(function(){
            return $rootScope.selectedEstado;
        }, function(newValue, oldValue) {
            if ((newValue!=oldValue) && ($scope.supports.length>0)){
                //console.log($scope.supports);
                DataService.getSupports("?where=estado LIKE '"+newValue+"'").then(function successResponse(result){
                    console.debug('Success:', result);
                    $scope.supports = result.data._embedded.servico;
                }, function errorResponse(err){
                    console.error('Request Error', err);
                    console.log(err);
                });
            }
        });

        $scope.$watch(function(){
            return $rootScope.selectedCidade;
        }, function(newValue, oldValue) {
            if ((newValue!=oldValue) && ($scope.supports.length>0)){
                if (newValue.length>0 && $rootScope.selectedEstado.length>0){
                    //console.log($scope.supports);
                    DataService.getSupports("?where=estado LIKE '"+$rootScope.selectedEstado+"' AND cidade LIKE '"+newValue+"'").then(function successResponse(result){
                        console.debug('Success:', result);
                        $scope.supports = result.data._embedded.servico;
                    }, function errorResponse(err){
                        console.error('Request Error', err);
                        console.log(err);
                    });
                }
            }
        });
    }
]);