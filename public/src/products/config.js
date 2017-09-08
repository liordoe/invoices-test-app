'use strict';

(function() {

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('products', {
                url: '/products',
                component: 'productsComponent',
                data: {
                    pageTitle: 'Products'
                }
            })
    }
}());
