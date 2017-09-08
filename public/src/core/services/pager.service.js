(function() {
  'use strict';

  angular
    .module('core')
    .service('PagerService', PagerService);

  function PagerService() {
    var service = {};

    service.GetPager = GetPager;

    return service;

    function GetPager(totalItems, currentPage, pageSize) {
      currentPage = currentPage || 1;

      pageSize = pageSize || 10;

      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      function range(start, count) {
        if (count < 0) count = 0;
        return Array.apply(0, Array(count))
          .map(function(element, index) {
            return index + start;
          });
      }

      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      var pages = range(startPage, endPage);

      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
    }
  }
})();