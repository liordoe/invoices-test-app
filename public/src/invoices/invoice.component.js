'use strict';

(function() {
    var InvoiceCtrl;

    InvoiceCtrl = function($log, $productsXhr, $customersXhr, $invoicesXhr,
        $invoiceItemsXhr, $q, $stateParams, $timeout) {

        var vm = this,
            id, isEditMode, calculateTotal, invoicePromise,
            addNewItemToInvoice, removeItemFromInvoice,
            mergeItemVsProduct, applyTimeout, callOnStopChanges;

        calculateTotal = function() {
            var total = vm.items.reduce(function(accum, curr, ind) {
                return accum + curr.price * curr.quantity || 1;
            }, 0);

            vm.invoice.total = total - (total / 100 * parseInt(vm.invoice.discount));
            return $invoicesXhr().single(id).update(vm.invoice);
        };

        mergeItemVsProduct = function(item) {
            var prod = vm.products.find(function(product) {
                return product.id === item.product_id;
            });
            item.name = prod.name;
            item.price = prod.price;
            return item;
        };

        callOnStopChanges = function(callback, timer) {
            timer = timer || 1000;
            $timeout.cancel(applyTimeout);
            applyTimeout = $timeout(callback, timer);
        }

        vm.updateInvoice = function() {
            callOnStopChanges(function() {
                vm.loadPromise = $invoicesXhr().single(id)
                    .update(vm.invoice)
                    .then(function(res) {
                        $log.debug(res);
                    }).catch(function(res) {
                        $log.error(res);
                    }).finally(function() {
                        calculateTotal();
                    });
            }, 500);
        };

        vm.selectItem = function(item) {
            var existingItem = vm.items.find(function(exItem) {
                return item.id === exItem.product_id;
            });
            if (existingItem !== undefined) {
                existingItem.quantity++;
                return;
            }
            vm.itemPromise = $invoiceItemsXhr(id).post({
                product_id: item.id,
                quantity: 1
            }).then(function(res) {
                $log.debug(res);
                vm.items.push(mergeItemVsProduct(res.data));
            }).catch(function(res) {
                $log.error(res);
            }).finally(function() {
                calculateTotal();
            });
        };

        vm.deleteItem = function(item) {
            vm.itemPromise = $invoiceItemsXhr(id).single(item.id)
                .delete().then(function(res) {
                    $log.debug(res);
                    vm.items.splice(vm.items.indexOf(item), 1);
                }).catch(function(res) {
                    $log.error(res);
                }).finally(function() {
                    calculateTotal();
                });
        };

        vm.selectCustomer = function(customer) {
            vm.invoice.customer_id = customer.id;
            vm.customer = customer;
            vm.updateInvoice();
        }

        vm.saveItemChange = function(item) {
            callOnStopChanges(function() {
                vm.itemPromise = $invoiceItemsXhr(id).single(item.id)
                    .update(item).then(function(res) {
                        $log.debug(res);
                    }).catch(function(res) {
                        $log.error(res);
                    }).finally(function() {
                        calculateTotal();
                    });
            }, 500);
        }

        vm.filterDropdownItems = function(key) {
            if (!key) {
                return vm.searchItems = angular.copy(vm.products);
            }
            key = key.toLowerCase();

            vm.searchItems = vm.products.filter(function(item) {
                return item.name.toLowerCase().includes(key) ||
                    String(item.price).includes(key);
            });
        };

        vm.uiCanExit = function() {
            calculateTotal();
        };

        vm.$onInit = function() {
            id = $stateParams.id;
            invoicePromise = id === 'new' ?
                $invoicesXhr().post({
                    customer_id: null,
                    discount: 0,
                    total: 0
                }) : $invoicesXhr().single(id).get();

            vm.loadPromise = $q.all({
                    invoice: invoicePromise,
                    invoiceItems: $invoiceItemsXhr(id).get(),
                    products: $productsXhr().get(),
                    customers: $customersXhr().get()
                })
                .then(function(res) {
                    vm.invoice = res.invoice.data;
                    id = vm.invoice.id;
                    vm.products = res.products.data;
                    vm.customers = res.customers.data;
                    vm.items = res.invoiceItems.data.filter(function(item) {
                        return item.invoice_id === vm.invoice.id;
                    }).map(mergeItemVsProduct);

                    vm.customer = vm.customers.find(function(customer) {
                        return customer.id === vm.invoice.customer_id;
                    });

                    vm.filterDropdownItems('');

                    $log.debug(res);
                })
                .catch(function(err) {
                    $log.error(err);
                })
                .finally(function() {
                    calculateTotal();
                });
        };
    };

    InvoiceCtrl.$inject = ['$log', '$productsXhr', '$customersXhr',
        '$invoicesXhr', '$invoiceItemsXhr', '$q', '$stateParams', '$timeout'
    ];


    angular
        .module('core')
        .component('invoiceComponent', {
            controller: InvoiceCtrl,
            templateUrl: 'src/invoices/invoice.html',
            controllerAs: 'vm',
            bindings: {
                invoiceRes: '<'
            }
        });
})();
