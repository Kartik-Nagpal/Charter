var app = angular.module("Charter", [])

app.controller("cont", ["$scope", function($scope) {
  $scope.show = false;

  $scope.change = function() {
    $scope.show = true;
    console.log("here");
  }

}]);


function create() {
  var ltd = $("#URLdata").val();
  console.log(ltd);


  Plotly.d3.csv(ltd, function(err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) {
              return row[key];
            });
        }

      var data = [{
          type: 'choropleth',
          locationmode: "country names",
          locations: unpack(rows, 'country'),
          z: unpack(rows, 'beer_servings'),
          text: unpack(rows, 'spirit_servings'),
          colorscale: [
              [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
              [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
              [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
          autocolorscale: false,
          reversescale: true,
          marker: {
              line: {
                  color: 'rgb(180,180,180)',
                  width: 0.5
              }
          },
          tick0: 0,
          zmin: 0,
          dtick: 1000,
          colorbar: {
            autotic: false,
            ticksuffix: ' Liters',
            title: 'Beer Servings by Country'
          }
          }];

      var layout = {
        title: 'Alcohol Servings by Country',
        showlegend: true,
        geo: {
            projection: {
                type: 'robinson'
            }
        }
      };

      $("#Selection").remove();
      $("nav").hide();

      Plotly.plot(chart, data, layout, {displayModeBar: false}, {showLink: false});
  });
}

function popup() {
  $(".modal").show();
}

function cancel() {
  $(".modal").hide();
}

function reset() {
  console.log("CLEARED");
  window.location.reload();
}
