(function() {
    'use strict';

    angular
        .module('core')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope'];

    function HeaderController($scope) {
        var vm = this;

        vm.sideBarOpen = false;

        function toggleSideNav() {
            vm.sideBarOpen = !vm.sideBarOpen;
        }
        vm.toggleSideNav = toggleSideNav;

        $scope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess() {
            // Collapsing the menu after navigation
            if (vm.sideBarOpen) toggleSideNav();
        }
    }
}());
