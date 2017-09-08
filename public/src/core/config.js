(function() {
    'use strict';

    angular
        .module('core')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                var newPath = path.substr(0, path.length - 1);
                $location.replace().path(newPath);
            }
        });

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function($injector, $location) {
            $injector.get('$state').transitionTo('not-found', null, {
                location: false
            });
        });

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/core/views/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Dashboard'
                }
            })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'src/core/views/404.html',
                data: {
                    ignoreState: true,
                    pageTitle: 'Not-Found'
                }
            });
    }
}());
