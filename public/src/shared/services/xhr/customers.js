'use strict';

(function() {
    var CustomersFactory;

    CustomersFactory = function($http) {
        return function() {
            return {
                get: function() {
                    return $http.get('/api/customers');
                },
                post: function(data) {
                    return $http.post('/api/customers', data);
                },
                single: function(id) {
                    return {
                        get: function() {
                            return $http.get('/api/customers/' + id);
                        },
                        update: function(data) {
                            return $http.put('/api/customers/' + id, data);
                        },
                        delete: function() {
                            return $http.delete('/api/customers/' + id);
                        }
                    }
                }
            }
        }
    };

    CustomersFactory.$inject = ['$http'];

    angular
        .module('shared')
        .service('$customersXhr', CustomersFactory);
})();
