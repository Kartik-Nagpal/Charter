
function onload()
{
  var app = angular.module("Charter", []);
  console.log("Running");


  app.controller("controller", ["$scope", function($scope) {

    $scope.f = "pls work";

    $scope.show = {
      name: "Show Boolean: ",
      isON: false,
    };

    $scope.update = function(t) {
      console.log("Works");
      this.product = t;

      $scope.$apply(function () {
          $scope.show.isON = true;
      });
    }
    //this.product = show;

    /*$scope.parse = function(n) {
      var d;
      if(n === 1) {
        Papa.parse($("#URLdata").val(), {
        	download: true,
        	complete: function(results) {
        		d = results;
        	}
        });

        setTimeout(function () {
            var x = d.data[0];
            console.log(x);
            var t = document.createElement("table");
            var row = t.appendChild(document.createElement('tr'));
            for (var i = 0; i < x.length; i++) {
                var cell = row.appendChild(document.createElement('td'));
                cell.id = x[i];
                cell.click(function() {
                  console.log(this.id);
                })
            }

            $("#options").append(t);
            $scope.show.isON = true;
            console.log("What??");
        }, 2000);
      }
      else {
        console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      }
    };*/
  }]);
}


function create() {

    Plotly.d3.csv($("#URLdata").val(), function(err, rows) {
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
            ticksuffix: ' ' + $("#Units").val(),
            title: $("#LegendTitle").val()
          }
          }];

      var layout = {
        title: $("#ChartTitle").val(),
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


function parse(n) {
  var d;
  if(n === 1) {
    Papa.parse($("#URLdata").val(), {
    	download: true,
    	complete: function(results) {
    		d = results;
    	}
    });

    setTimeout(function () {
        var x = d.data[0];
        console.log(x);

        var d1 = $("<div></div>").addClass("form-group");
        var label = $("<label></label>").addClass("col-lg-2 control-label").html("X-Axis");
        var d2 = $("<div></div>").addClass("col-lg-10");
        var d3 = $("<div></div>").addClass("form-group");
        var label2 = $("<label></label>").addClass("col-lg-2 control-label").html("Y-Axis");
        var d4 = $("<div></div>").addClass("col-lg-10");
        var selectX = $("<select></select>").addClass("form-control");
        var selectY = $("<select></select>").addClass("form-control");


        var t = $("<table></table>").addClass("table table-striped table-hover");
        var row = $("<tr></tr>").addClass("active");
        for (var i = 0; i < x.length; i++) {
            var cell = $("<th></th>").text(x[i]);
            row.append(cell);

            var option = $("<option></option>").html(x[i]);
            var option2 = $("<option></option>").html(x[i]);
            selectX.append(option);
            selectY.append(option2);
        }
        t.append(row);

        d1.append(label);
        d2.append(selectX);
        d3.append(label2);
        d4.append(selectY);
        d1.append(d2);
        d3.append(d4);

        var r = $("<div></div>").addClass("row");
        r.append(d1);
        r.append(d3);

        $("#options").append($(t));
        $("#options").append(r);

        angular.element($('#cont')).scope().update(t);
        angular.element($('#cont')).scope().$apply();
        console.log("Done");
    }, 500);
  }
  else {
    console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  }
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
