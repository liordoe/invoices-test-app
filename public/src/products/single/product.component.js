'use strict';

(function() {
    var ProductCtrl;

    ProductCtrl = function($log, $productsXhr, $timeout) {

        var vm = this,
            id, applyTimeout;

        vm.updateProduct = function() {
            $timeout.cancel(applyTimeout);
            applyTimeout = $timeout(function() {
                vm.loadPromise = $productsXhr().single(id)
                    .update(vm.product)
                    .then(function(res) {
                        $log.debug(res);
                    })
                    .catch(function(err) {
                        $log.error(err);
                    });
            }, 500);

        };

        vm.uiCanExit = function() {
            vm.updateProduct();
        }

        vm.$onInit = function() {
            id = vm.productRes.data.id;
            vm.loadPromise = $productsXhr().single(id).get()
                .then(function(res) {
                    vm.product = res.data;
                    $log.debug(res);
                })
                .catch(function(err) {
                    $log.error(err);
                });
        };
    };

    ProductCtrl.$inject = ['$log', '$productsXhr', '$timeout'];


    angular
        .module('core')
        .component('productComponent', {
            controller: ProductCtrl,
            templateUrl: 'src/products/single/product.html',
            controllerAs: 'vm',
            bindings: {
                productRes: '<'
            }
        });
})();
