console.log('he');

var cycles = {
  gb: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  hu: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  lv: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  cz: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  sk: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  pl: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  de: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  ch: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  fi: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  tr: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  rs: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  at: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  ua: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  ee: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  lt: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  by: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  gr: ['.red', '.red', '.green', '.green', '.yellow'],
  ro: ['.red', '.red', '.green', '.green', '.yellow'],
  ie: ['.red', '.red', '.green', '.green', '.yellow'],
  fr: ['.red', '.red', '.green', '.green', '.yellow'],
  it: ['.red', '.red', '.green', '.green', '.yellow'],
  es: ['.red', '.red', '.green', '.green', '.yellow'],
  ru: ['.red', '.yellow', '.green', '.green,.blink', '.yellow']
};

var map;
var countries = [];
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
      countries.push(this.id);
      // d3.select(map).select("#"+this.id+"_light").select(".red").style("fill", "gray");
    });

  // d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");

  // window.setInterval(function() {
  //   if (state == 0) {
  //     d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
  //     d3.select(map).selectAll(".red").style("fill", "red");
  //     state = 1;
  //   }
  //   else if (state == 1) {
  //     d3.select(map).selectAll(".yellow").style("fill", "yellow");
  //     state = 2;
  //   }
  //   else if (state == 2) {
  //     d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
  //     d3.select(map).selectAll(".green").style("fill", "green");
  //     state = 3;
  //   }
  //   else if (state == 3) {
  //     d3.select(map).selectAll(".red,.green,.yellow").style("fill", "gray");
  //     d3.select(map).selectAll(".yellow").style("fill", "yellow");
  //     state = 0;
  //   }
  // }, 3000);


  function animate() {
    d3.select(map).selectAll(".red,.green,.yellow").classed("off", true);
    d3.select(map).selectAll(".red,.green,.yellow").classed("blink", false);
    for (var i = 0; i < countries.length; i++) {
      if (cycles.hasOwnProperty(countries[i])) {
        d3.select(map).select("#"+countries[i]+"_light").selectAll(cycles[countries[i]][state]).classed("off", false);
        if (cycles[countries[i]][state].includes("blink")) {
          d3.select(map).select("#"+countries[i]+"_light").selectAll(cycles[countries[i]][state]).classed("blink", true);
        }
        // if (cycles[countries[i]][state].includes("yellow")) {
        //   d3.select(map).select("#"+countries[i])
        //   .style("fill", "lightyellow")
        //   .selectAll("*").style("fill", "lightyellow");
        // }
      }
    }
    window.setTimeout(animate, [5000, 2000, 3000, 4000, 2000][state]);
    state = (state + 1) % 5;
  }
  animate();

  function fillBlue(tgt) {
    // document.body.innerHTML += light;
    // console.log("he");
    if (!cycles.hasOwnProperty(tgt.id)) { return; }
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
