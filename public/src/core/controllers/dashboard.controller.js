(function() {
    'use strict';

    angular
        .module('core')
        .controller('DashboardController', DashboardCtrl)

    DashboardCtrl.$inject = ['$scope', '$state', '$log', '$invoicesXhr',
        '$customersXhr', '$q'
    ];

    function DashboardCtrl($scope, $state, $log, $invoicesXhr, $customersXhr, $q) {
        var vm = this,
            mapInvoices,
            invoices, customers;

        mapInvoices = function(invoice) {
            invoice.customer = customers.find(function(customer) {
                return customer.id === invoice['customer_id'];
            });
            return invoice;
        };

        vm.editInvoice = function(id) {
            $state.go('invoice', {
                id: id
            });
        };

        vm.$onInit = function() {
            vm.loadPromise = $q.all({
                customers: $customersXhr().get(),
                invoices: $invoicesXhr().get()
            }).then(function(res) {
                invoices = res.invoices.data;
                customers = res.customers.data;

                vm.invoices = invoices.map(mapInvoices);
            }).catch(function(errRes) {
                $log.error(errRes);
            });
        }
    }

}());
