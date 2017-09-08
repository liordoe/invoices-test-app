'use strict';

(function() {
    var CustomerCtrl;

    CustomerCtrl = function($log, $customersXhr, $timeout) {

        var vm = this,
            id, applyTimeout;

        vm.updateCustomer = function() {
            $timeout.cancel(applyTimeout);
            applyTimeout = $timeout(function() {
                vm.loadPromise = $customersXhr().single(id)
                    .update(vm.customer)
                    .then(function(res) {
                        $log.debug(res);
                    })
                    .catch(function(err) {
                        $log.error(err);
                    });
            }, 500);
        };

        vm.uiCanExit = function() {
            vm.updateCustomer();
        }

        vm.$onInit = function() {
            id = vm.customerRes.data.id;
            vm.loadPromise = $customersXhr().single(id).get()
                .then(function(res) {
                    vm.customer = res.data;
                    $log.debug(res);
                })
                .catch(function(err) {
                    $log.error(err);
                });
        };
    };

    CustomerCtrl.$inject = ['$log', '$customersXhr', '$timeout'];


    angular
        .module('core')
        .component('customerComponent', {
            controller: CustomerCtrl,
            templateUrl: 'src/customers/single/customer.html',
            controllerAs: 'vm',
            bindings: {
                customerRes: '<'
            }
        });
})();
