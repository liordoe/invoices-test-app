'use strict';

(function() {

    angular
        .module('core')
        .config(bootstrapConfig)

    function bootstrapConfig($compileProvider, $locationProvider) {
        // $locationProvider.html5Mode(true).hashPrefix('!');
        $compileProvider.debugInfoEnabled(true);
    }

    bootstrapConfig.$inject = ['$compileProvider', '$locationProvider'];

}());
