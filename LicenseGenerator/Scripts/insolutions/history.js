app.controller('HistoryController', ['$scope', '$http', '$filter', 'ngTableParams', function ($scope, $http, $filter, ngTableParams) {
        $scope.loadervisible = true;
        $scope.filter = "";
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 15
        }, {
            counts: [],
            getData: function ($defer, params) {
                $scope.loadervisible = true;
                $http.post('History/LoadLicenses', { filter: $scope.filter, page: params.page(), countPerPage: params.count() }).
                    success(function (data, status, headers, config) {
                    $scope.licenses = data.licenses;
                    params.total(data.count);
                    $defer.resolve($scope.licenses);
                    $scope.loadervisible = false;
                });
            }
        });
        $scope.filterChanged = function (filter) {
            $scope.filter = filter;
            $scope.tableParams.reload();
        };
        $scope.licenseClicked = function (license) {
            window.location.href = siteUrl + 'Home/HistoryLicense/' + license.id;
        };
    }]);
