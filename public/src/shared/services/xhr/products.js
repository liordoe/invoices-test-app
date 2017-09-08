'use strict';

(function() {
    var ProductsFactory;

    ProductsFactory = function($http) {
        return function() {
            return {
                get: function() {
                    return $http.get('/api/products');
                },
                post: function(data) {
                    return $http.post('/api/products', data);
                },
                single: function(id) {
                    return {
                        get: function() {
                            return $http.get('/api/products/' + id);
                        },
                        update: function(data) {
                            return $http.put('/api/products/' + id, data);
                        },
                        delete: function() {
                            return $http.put('/api/products/' + id);
                        }
                    }
                }
            }
        }
    };

    ProductsFactory.$inject = ['$http'];

    angular
        .module('shared')
        .service('$productsXhr', ProductsFactory);
})();
