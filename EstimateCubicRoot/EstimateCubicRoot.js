
google.load('visualization', '1', { packages: ['corechart'] });
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['estimateRootApp']);
});

var estimateRootApp = angular.module('estimateRootApp', []);
estimateRootApp.controller('estimateRootCtrl', function ($scope, $http) {
//angular.module('estimateRootApp', []).
//  controller('estimateRootCtrl', ['$scope',function($scope) {

    function derivative(a, b, c, d, xprev) {
        var deriv = 3 * a * Math.pow(xprev, 2) + 2 * b * Math.pow(xprev, 1) + c * 1;

        return deriv;
    }

    function f(a, b, c, d, xprev) {
        var f = a * Math.pow(xprev, 3) + b * Math.pow(xprev, 2) + c * xprev + d * 1;

        return f;
    }

    $scope.calculateRoot = function () {
        var x = [];
        var nmax = 10;
        var xnext;

        var a = $("#a").val();
        var b = $("#b").val();
        var c = $("#c").val();
        var d = $("#d").val();
        var prec = $("#prec").val();
        var i = $("#guess").val();


        var j = parseInt(i);
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Iteration');
        data.addColumn('number', 'Estimate');
        var N = new Array();
        var n = 0;
        N.push(n);
        x.push(j);


        do {

            var xprev = x[n];
            var fprev = f(a, b, c, d, xprev);
            var dprev = derivative(a, b, c, d, xprev);
            xnext = xprev - (fprev / dprev);


            var dx = xnext - xprev;
            var dx2 = Math.abs(dx);

            x.push(xnext);
            ++n;
            N.push(n);

            if (n > nmax) {

                break;
            }


        }
        while (dx2 > prec);

        if (n > nmax) {
            $("#error").addClass("selected");
            $("#error").html("Sorry Maximum Iteration Exceeded");
            $("#error").addClass("red");
            setTimeout(function () { $("#error").hide(); }, 3000);

        }

        else if (x.length > 2) {
            $("#error").html("Success! Approximation completed within iteration limits");
            $("#error").addClass("blue");
            setTimeout(function () { $("#error").hide(); }, 3000);
        }

        var showGraph = $("input:radio[name=choice]:checked").val()

        
        if (showGraph == "No") {

            $("#visualization").hide();

            $("#head2").hide();
            $("#error").show();
            $("#error").html("Best estimate so far is " + xnext);
        }

        else {

            $("#visualization").show();
            $scope.showChart = true;

            
            for (i = 0; i < x.length; i++) {
                data.addRow([N[i], x[i]]);
            }

            var nmax = data.getColumnRange(0).max;
            var xmax = data.getColumnRange(1).max;

            var options = {
                curveType: "function",
                width: 600, height: 400,
                title: "Newton method",
                hAxis: { title: "Iteration", maxValue: nmax + 1 },
                vAxis: { title: "Estimate", maxValue: xmax - 1 }

            };

            var chart = {};
            //$scope.data = data;
            //$scope.options = options;
            chart.data = data;
            chart.options = options;
            $scope.chart = chart;

            //var container = document.getElementById('visualization');
            //var chart = new google.visualization.ScatterChart(container);
            //chart.draw(data, options);
        } // end of generate graph

    } //end of controller

    function validateMyForm() {
        return false;
    }

});
//angular.module('estimateRootApp', [])
estimateRootApp.directive('gChart', function () {
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




