'use strict';

(function() {
    var InvoicesFactory;

    InvoicesFactory = function($http) {
        return function() {
            return {
                get: function() {
                    return $http.get('/api/invoices');
                },
                post: function(data) {
                    return $http.post('/api/invoices', data);
                },
                single: function(id) {
                    return {
                        get: function() {
                            return $http.get('/api/invoices/' + id);
                        },
                        update: function(data) {
                            return $http.put('/api/invoices/' + id, data);
                        },
                        delete: function() {
                            return $http.put('/api/invoices/' + id);
                        }
                    }
                }
            }
        }
    };

    InvoicesFactory.$inject = ['$http'];

    angular
        .module('shared')
        .service('$invoicesXhr', InvoicesFactory);
})();
