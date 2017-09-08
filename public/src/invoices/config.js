'use strict';

(function() {

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('invoice', {
                url: '/invoice/:id',
                params: {
                    id: 'new'
                },
                component: 'invoiceComponent',
                data: {
                    pageTitle: 'Invoice'
                }
            })
    }
}());
