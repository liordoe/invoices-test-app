'use strict';

(function() {

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('customer', {
                url: '/customers/:id',
                params: {
                    id: 'new'
                },
                component: 'customerComponent',
                data: {
                    pageTitle: 'Customer'
                },
                resolve: {
                    customerRes: function($customersXhr, $stateParams, $q) {
                        if ($stateParams.id !== 'new') {
                            return {
                                data: {
                                    id: $stateParams.id
                                }
                            };
                        }
                        return $customersXhr().post({
                            customer_id: null,
                            discount: 0,
                            total: 0
                        });
                    }
                }
            })
    }
}());
