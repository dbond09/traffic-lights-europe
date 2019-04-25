console.log('he');

var map;
var countries;
var state = 0;

var light = document.querySelector("#light").innerHTML;

// window.fetch("./light.svg")
//   .then(function(res) {
//     return res.text();
//   })
//   .then(function(res) {
//     light = res;
//   });

function main() {
  map = document.querySelector("#map").contentDocument;

  // countries = map.querySelectorAll("path");
  // for (var i = 0; i < countries.length; i++) {
  //   countries[i].onclick = fillBlue;
  // }

  d3.select(map).selectAll("*")
    .filter(function() {return this.id.length == 2})
    // .each(function() {console.log(this.id)})
    .classed("country", true);

  d3.select(map).selectAll(".country")
    .each(function() {
      fillBlue(this);
      console.log(this.id);
      // d3.select(map).select("#"+this.id+"_light").select(".red").style("fill", "gray");
    });

  d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");

  window.setInterval(function() {
    if (state == 0) {
      d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
      d3.select(map).selectAll(".red").style("fill", "red");
      state = 1;
    }
    else if (state == 1) {
      d3.select(map).selectAll(".yellow").style("fill", "yellow");
      state = 2;
    }
    else if (state == 2) {
      d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
      d3.select(map).selectAll(".green").style("fill", "green");
      state = 3;
    }
    else if (state == 3) {
      d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
      d3.select(map).selectAll(".yellow").style("fill", "yellow");
      state = 0;
    }
  }, 2000);

  function fillBlue(tgt) {
    // document.body.innerHTML += light;
    // console.log("he");
    var c = tgt.getBoundingClientRect();
    var x = c.x + (c.width / 2);
    var y = c.y + (c.height / 2);
    var scale = c.height / 750 / 2;
    // var scale = 1;
    var e = d3.select(tgt.parentElement);
    e.append("g").html(light)
    .attr("transform", "translate(" + (x - (138 * scale)) + ", " + (y - (375 * scale)) + ") scale(" + scale + ")")
    .attr("id", tgt.id + "_light")
    // console.log(e)
  }
}
