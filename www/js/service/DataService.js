/*jslint browser: true*/
/*global console, Framework7, MyApp, $document*/

MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
    'use strict';

    var pub = {};
    var eventListeners = {'ready': []};

    // var urlBase = 'http://guiaassistenciatecnica.com/assistec-apigility/public';
    var urlBase = 'http://app.guiaassistenciatecnica.com';
    // var urlBase = 'http://assistec.ilhanet.com';
    //var urlBase = 'http://localhost:8888';

    function sendHttp(url){
        var params = {
            headers: {
                //'X-Requested-With': 'XMLHttpRequest',
                //'Accept': 'application/json'
            },
            method: 'GET',
            url: url
        };
        return $http(params);
    }

    pub.getCities = function (params) {
        if (!params) params='';
        return sendHttp(urlBase+'/cidade'+params);
    };

    pub.getStates = function () {
        return sendHttp(urlBase+'/estado');
    };

    pub.getSupports = function (params) {
        if (!params) params='';
        return sendHttp(urlBase+'/servico'+params);
    };

    pub.addEventListener = function (eventName, listener) {
        eventListeners[eventName].push(listener);
    };

    function onReady() {
        var fw7 = MyApp.fw7,
            i;

        fw7.views.push(fw7.app.addView('.view-main', fw7.options));

        for (i = 0; i < eventListeners.ready.length; i = i + 1) {
            eventListeners.ready[i]();
        }
    }

    return pub;
}]);