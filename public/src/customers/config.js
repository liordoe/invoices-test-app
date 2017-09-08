'use strict';

(function() {

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('customers', {
                url: '/customers',
                component: 'customersComponent',
                data: {
                    pageTitle: 'Customers'
                }
            })
    }
}());
