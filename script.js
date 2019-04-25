console.log('he');

var map;
var countries;

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

  countries = map.querySelectorAll("path");
  for (var i = 0; i < countries.length; i++) {
    countries[i].onclick = fillBlue;
  }

  function fillBlue(event) {
    // document.body.innerHTML += light;
    // console.log("he");
    var c = event.currentTarget.getBBox();
    var x = c.x + (c.width / 2);
    var y = c.y + (c.height / 2);
    var scale = c.height / 750 / 2;
    // var scale = 1;
    var e = d3.select(event.currentTarget.parentElement);
    e.append("g").html(light).attr("transform", "translate(" + (x - 138 * scale) + ", " + (y - 375 * scale) + ") scale(" + scale + ")");
    console.log(e)
  }
}
