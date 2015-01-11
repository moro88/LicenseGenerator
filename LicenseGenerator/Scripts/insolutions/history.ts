﻿declare var siteUrl;

var app = angular.module('licensegenerator', ['ui.bootstrap', 'ngTable']);

app.controller('HistoryController', ['$scope', '$http', '$filter', 'ngTableParams', function ($scope, $http, $filter, ngTableParams) {

    $scope.filter = "";

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 15          // count per page
    }, {
            total: $scope.licenses, // length of data
            counts: [],
            getData: function ($defer, params) {

                $http.post(siteUrl + 'History/LoadLicenses', { filter: $scope.filter, page: params.page(), countPerPage: params.count() }).
                    success(function (data, status, headers, config) {
                        $scope.licenses = data.licenses;

                        params.total(data.count); // set total for recalc pagination
                        $defer.resolve($scope.licenses);
                    });

                // use build-in angular filter
                //var orderedData = params.filter() ?
                //    $filter('filter')(data, params.filter()) :
                //    data;
                //var orderedData = $scope.licenses;
                //$scope.licenses = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                //params.total(orderedData.length); // set total for recalc pagination
                //$defer.resolve($scope.licenses);
            }
        });

    $scope.filterChanged = function (filter) {
        $scope.filter = filter;
        $scope.tableParams.reload();
    }

}]);