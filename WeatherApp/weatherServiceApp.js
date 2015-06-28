
google.load('visualization', '1', { packages: ['corechart'] });
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['weatherServiceApp']);
});

var weatherServiceApp = angular.module('weatherServiceApp', []);
weatherServiceApp.controller('weatherServiceCtrl', function ($scope, $http, $timeout) {

    $scope.getWeatherService = function () {

        var url;
        var locationBy = $scope.locationBy;
        var location = $scope.location;

        switch (locationBy) {
            case "zip":
                url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + location;
                break;
            case "city":
                url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location;
                break;
                
            case "lanLon":
                url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + $scope.lat + '&lon=' + $scope.lon;
                break;
        }

        $http.get(url).success(function (data) {
                $scope.weather = data;
                
                $scope.showWeather = data.message == null ? true : false;
                $scope.displayMessage = !$scope.showWeather;   //prints out current weather
                $("#message").show();
                $("#message").addClass("red");
                setTimeout(function () { $("#message").hide(); }, 3000);
            })
            .error(function () {
                $scope.error = "An Error has occured while loading weather data from openweathermap.org!";
                $scope.loading = false;
            });
    } //end of function: getWeatherService()

    $scope.onLocationByChange = function () {
        //var timer;
        //if (timer) {
        //    $timeout.cancel(timer);
        //}
        if ($scope.locationBy != 'lanLon') {
            $scope.showLanlon = false;
            //timer = $timeout(function () {        //used to enter in default text
                $scope.location = "---- Enter " + $scope.locationBy + " here ----";
            //}, 100);
        } else {
            $scope.showLanlon = true;
            //$('#lat').attr('type', 'text');
            //$('#lon').attr('type', 'text');
            $scope.lat = "---- Enter lat in degree here ----";
            $scope.lon = "---- Enter lon in degree here ----";
        }
    }
    

}); // end of controller

//angular.module('weatherServiceApp', [])
weatherServiceApp.directive('gChart', function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            $scope.$watch('chart', function () {
            //    var type = $scope.chart.type;
                var chart = " ";
                //if(type=="1"){
                    chart = new google.visualization.LineChart(elm[0]);
                //}
                //else if(type=="2"){
                //    chart = new google.visualization.BarChart(elm[0]);
                //}
                //else if(type=="3"){
                //    chart = new google.visualization.ColumnChart(elm[0]);
                //}
                //else if(type=="4"){
                //    chart = new google.visualization.PieChart(elm[0]);
                //}
        	
            //chart.draw($scope.chart.data, $scope.chart.options);
                    chart.draw($scope.chart.data, $scope.chart.options);
            },true);
        } //end of link function
    } // end of return statement
}); 




