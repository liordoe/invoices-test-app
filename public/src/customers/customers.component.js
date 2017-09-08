'use strict';

(function() {
    var CustomersCtrl;

    CustomersCtrl = function($log, $customersXhr, $state) {

        var vm = this;

        vm.editCustomer = function(id) {
            $state.go('customer', {
                id: id
            });
        };

        vm.$onInit = function() {
            vm.loadPromise = $customersXhr().get()
                .then(function(res) {
                    vm.customers = res.data;

                    $log.debug(res);
                })
                .catch(function(err) {
                    $log.error(err);
                });
        };
    };

    CustomersCtrl.$inject = ['$log', '$customersXhr', '$state'];

    angular
        .module('core')
        .component('customersComponent', {
            controller: CustomersCtrl,
            templateUrl: 'src/customers/customers.html',
            controllerAs: 'vm'
        });
})();
