'use strict';

(function() {
    var ProductsCtrl;

    ProductsCtrl = function($log, $productsXhr, $state) {

        var vm = this;

        vm.editProduct = function(id) {
            $state.go('product', {
                id: id
            });
        };

        vm.$onInit = function() {
            vm.loadPromise = $productsXhr().get()
                .then(function(res) {
                    vm.products = res.data;

                    $log.debug(res);
                })
                .catch(function(err) {
                    $log.error(err);
                });
        };
    };

    ProductsCtrl.$inject = ['$log', '$productsXhr', '$state'];

    angular
        .module('core')
        .component('productsComponent', {
            controller: ProductsCtrl,
            templateUrl: 'src/products/products.html',
            controllerAs: 'vm'
        });
})();
