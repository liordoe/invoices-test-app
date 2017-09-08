'use strict';

(function() {
    var invoiceItemsXhr;

    invoiceItemsXhr = function($http) {
        return function(invoiceId) {
            return {
                get: function() {
                    return $http.get('/api/invoices/' + invoiceId + '/items');
                },
                post: function(data) {
                    return $http.post('/api/invoices/' + invoiceId + '/items', data);
                },
                single: function(id) {
                    return {
                        get: function() {
                            return $http.get('/api/invoices/' + invoiceId + '/items/' + id);
                        },
                        update: function(data) {
                            return $http.put('/api/invoices/' + invoiceId + '/items/' + id, data);
                        },
                        delete: function() {
                            return $http.delete('/api/invoices/' + invoiceId + '/items/' + id);
                        }
                    }
                }
            }
        }
    };

    invoiceItemsXhr.$inject = ['$http'];

    angular
        .module('shared')
        .service('$invoiceItemsXhr', invoiceItemsXhr);
})();
