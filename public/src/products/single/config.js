'use strict';

(function() {

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {

        $stateProvider
            .state('product', {
                url: '/products/:id',
                params: {
                    id: 'new'
                },
                component: 'productComponent',
                data: {
                    pageTitle: 'Product'
                },
                resolve: {
                    productRes: function($productsXhr, $stateParams, $q) {
                        if ($stateParams.id !== 'new') {
                            return {
                                data: {
                                    id: $stateParams.id
                                }
                            };
                        }
                        return $productsXhr().post({
                            product_id: null,
                            discount: 0,
                            total: 0
                        });
                    }
                }
            })
    }
}());
