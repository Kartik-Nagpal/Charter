
function onload()
{
  var app = angular.module("Charter", []);
  console.log("Angular Prepped");


  app.controller("controller", ["$scope", function($scope) {

    $scope.show = {
      name: "Show Boolean: ",
      isON: false,
    };

    $scope.update = function(t) {
      console.log("Updating");
      this.product = t;

      $scope.$apply(function () {
          $scope.show.isON = true;
      });
    }
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
        showlegend: false,
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

var y;
function loadBar() {
  $("#loadingBar").show()
  var x = $("#loading");
  var i = 0;
  y = setInterval(function() {
    x.css("width", i+"%");
    i++;
    if(i >= 140)
    {
      clearInterval(y);
      y = 0;
      $("#loadingBar").hide();
      $(".brs").show()
    }
  }, 50);
}


function parse(n) {
  loadBar();

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
    }, 7000);
  }
  else {
    console.log("NOOOOOOOOOOOOOO");
  }
}

function popup() {
  $(".modal").show();
}

function cancel() {
  $(".modal").hide();
}

function reset() {
  window.location.reload();
}
