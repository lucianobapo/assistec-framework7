/*global Framework7, Dom7, angular, myAppAngular */
// Inicialização do APP - index

var myAppAngular = null;
var myApp = null;
var $$ = null;
var mainView = null;

myAppAngular = angular.module('MyApp', []);

function onAppReady() {
    myApp = new Framework7({});

    $$ = Dom7;
    mainView = myApp.addView('.view-main', {
        dynamicNavbar: true
    });
// enviar mensagem no post
    $$('.ac-3').on('click', function () {
        var buttons1 = [
            {
                text: '<div class="list-block list-block-2">' +
                '<ul>' +
                '<li class="align-top">' +
                '<div class="item-content">' +
                '<div class="item-media"><i class="icon icon-form-comment"></i></div>' +
                '<div class="item-inner">' +
                '<div class="item-input">' +
                '<textarea placeholder="Escreva um comentário..."></textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>',
                label: true
            }
        ];
        var buttons2 = [
            {
                text: 'Confirmar',
                color: 'green'
            }
        ];
        var groups = [buttons1, buttons2];
        myApp.actions(groups);
    });


    myApp.onPageInit('buscar-assistencia', function (page) {
        $$('.open-info').on('click', function () {
            myApp.pickerModal('.picker-info')
        });
        $$('.close-info').on('click', function () {
            myApp.closeModal('.picker-info')
        });
    });
}
document.addEventListener("app.Ready", onAppReady, false);
$(document).ready(function () {
    onAppReady();
});
