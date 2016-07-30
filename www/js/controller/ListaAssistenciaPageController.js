/*jslint browser: true*/
/*global console, MyApp*/

MyApp.angular.controller('ListaAssistenciaPageController', [
    '$scope', '$http', 'InitService', 'DataService', '$rootScope',
    function ($scope, $http, InitService, DataService, $rootScope) {
        'use strict';

        $scope.selectSupport = function (id){
            $scope.supports.forEach(function(item){
                if (item.id==id) {
                    console.log(item);
                    $rootScope.supportSelected = item;
                }
            });

            $scope.paidSupports.forEach(function(item){
                if (item.id==id) {
                    console.log(item);
                    $rootScope.supportSelected = item;
                }
            });
        };

        $scope.attribData = function (result){
            console.debug('Success:', result);
            //$scope.supports = result.data._embedded.servico;
            $scope.supports = [];
            $scope.paidSupports = [];
            result.data._embedded.servico.forEach(function(item){
                if (item.perfil=="patrocinado") $scope.paidSupports.push(item);
                if (item.perfil!="patrocinado") $scope.supports.push(item);
            });
        };

        InitService.addEventListener('ready', function () {
            // DOM ready
            console.log('ListaAssistenciaPageController: ok, DOM ready');

            DataService.getSupports().then(function successResponse(result){
                $scope.attribData(result);
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
            if (newValue!=oldValue){
                if (newValue.length>0){
                    DataService.getSupports("?where=estado LIKE '"+newValue+"'").then(function successResponse(result){
                        $scope.attribData(result);
                    }, function errorResponse(err){
                        console.error('Request Error', err);
                        console.log(err);
                    });
                }
            }
        });

        $scope.$watch(function(){
            return $rootScope.selectedCidade;
        }, function(newValue, oldValue) {
            if (newValue!=oldValue){
                if (newValue.length>0 && $rootScope.selectedEstado.length>0){
                    DataService.getSupports("?where=estado LIKE '"+$rootScope.selectedEstado+"' AND cidade LIKE '"+newValue+"'").then(function successResponse(result){
                        $scope.attribData(result);
                    }, function errorResponse(err){
                        console.error('Request Error', err);
                        console.log(err);
                    });
                }
            }
        });
    }
]);