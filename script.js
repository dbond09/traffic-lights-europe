var cycles = {
  gb: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  hu: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  dk: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  bg: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  mk: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  ba: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  is: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  hr: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  si: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  cy: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  mt: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  no: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  se: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  lv: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  cz: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  sk: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  pl: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  de: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  ch: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  fi: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  tr: ['.red', '.red,.yellow', '.green', '.green', '.yellow'],
  rs: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  me: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  at: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  ua: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  md: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  ee: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  lt: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  by: ['.red', '.red,.yellow', '.green', '.green,.blink', '.yellow'],
  gr: ['.red', '.red', '.green', '.green', '.yellow'],
  ro: ['.red', '.red', '.green', '.green', '.yellow'],
  ie: ['.red', '.red', '.green', '.green', '.yellow'],
  fr: ['.red', '.red', '.green', '.green', '.yellow'],
  it: ['.red', '.red', '.green', '.green', '.yellow'],
  lu: ['.red', '.red', '.green', '.green', '.yellow'],
  al: ['.red', '.red', '.green', '.green', '.yellow'],
  pt: ['.red', '.red', '.green', '.green', '.yellow'],
  nl: ['.red', '.red', '.green', '.green', '.yellow'],
  be: ['.red', '.red', '.green', '.green', '.yellow'],
  es: ['.red', '.red', '.green', '.green', '.yellow'],
  ru: ['.red', '.yellow', '.green', '.green,.blink', '.yellow']
};

var finetune = {
  no: {x: -30, y: 40, scale: 0.6},
  mt: {x: 0, y: 0, scale: 10},
  cy: {x: 0, y: 0, scale: 3},
  hr: {x: -5, y: 0, scale: 1},
  gb: {x: 10, y: 20, scale: 1},
  lu: {x: 0, y: 0, scale: 3},
  at: {x: 10, y: 0, scale: 1},
  is: {x: 0, y: 5, scale: 1},
  dk: {x: -10, y: 0, scale: 1.3}
};

var fillstyles = {
  '.red': 'lightcoral',
  '.yellow': 'khaki',
  '.green': 'lightgreen',
  '.red,.yellow': 'lightsalmon',
  '.green,.blink': 'url(#diagonalHatch)'
}

var map;
var countries = [];
var state = 0;
var sc = 0; // last state-change
var STATETIMES = [5000, 3000, 3000, 3000, 2000];
var started = false;

var light = document.querySelector("#light").innerHTML;

function main() {
  map = document.querySelector("#map").contentDocument;

  d3.select(map).selectAll("#layer1 > *")
    .attr("visibility", function() {return cycles.hasOwnProperty(this.id) ? "visible" : "hidden"})
    .filter(function() {return cycles.hasOwnProperty(this.id)})
    // .each(function() {console.log(this.id)})
    .classed("country", true);

  d3.select(map).selectAll(".country")
    .each(function() {
      addLight(this);
      countries.push(this.id);
    });


  function animate(timestamp) {
    if (timestamp - sc > stateTime((state+4) % 5) || !started) {
      started = true;
      d3.select(map).selectAll(".red,.green,.yellow").classed("off", true);
      d3.select(map).selectAll(".red,.green,.yellow").classed("blink", false);
      for (var i = 0; i < countries.length; i++) {
        if (cycles.hasOwnProperty(countries[i])) {
          d3.select(map).select("#"+countries[i]+"_light").selectAll(cycles[countries[i]][state]).classed("off", false);
          if (cycles[countries[i]][state].includes("blink")) {
            d3.select(map).select("#"+countries[i]+"_light").selectAll(cycles[countries[i]][state]).classed("blink", true);
          }
          d3.select(map).select("#"+countries[i])
            .style("fill", fillstyles[cycles[countries[i]][state]])
            .selectAll("*").style("fill", fillstyles[cycles[countries[i]][state]]);
        }
      }
      // window.setTimeout(animate, [5000, 3000, 3000, 3000, 2000][state]);
      if (state == 0) { sc = timestamp; }
      state = (state + 1) % 5;

      // var degree = (((timestamp - sc) % stateTime(4)) / stateTime(4)) * 360;

      // console.log(degree);
    }
    // var degree = (((timestamp - sc) % stateTime(5)) / stateTime(5)) * 360 + 90;
    // var degree = (state-1) * 72 + (timestamp - sc + stateTime((state + 3) % 5)) / stateTime(5) * 360 + 90;
    // var degree = (state) * 72 + ((timestamp - sc - stateTime((state + 4) % 5)) / STATETIMES[(state + 4) % 5]) * 72 + 90;
    // var degree = 90;
    // console.log(degree);
    // var crc = document.querySelector("#circle").contentDocument;
    // d3.select(crc).select("line")
    // .attr("x2", -Math.cos(degree / 180 * Math.PI) * 163 + 163)
    // .attr("y2", -Math.sin(degree / 180 * Math.PI) * 164 + 164);
    // console.log(degree);
    window.requestAnimationFrame(animate)
  }
  animate(0);

  function stateTime(state) {
    return STATETIMES.slice(0, state+1).reduce((a, b) => a+b, 0);
  }

  function addLight(tgt) {
    // document.body.innerHTML += light;
    // console.log("he");
    if (!cycles.hasOwnProperty(tgt.id)) { return; }
    var c = tgt.getBoundingClientRect();
    var x = c.x + (c.width / 2) + (finetune.hasOwnProperty(tgt.id) ? finetune[tgt.id].x : 0);
    var y = c.y + (c.height / 2) + (finetune.hasOwnProperty(tgt.id) ? finetune[tgt.id].y : 0);
    var scale = (c.height / 750 / 2) * (finetune.hasOwnProperty(tgt.id) ? finetune[tgt.id].scale : 1);
    // var scale = 0;
    var e = d3.select(tgt.parentElement);
    e.append("g").html(light)
    .attr("transform", "translate(" + (x - (138 * scale)) + ", " + (y - (375 * scale)) + ") scale(" + scale + ")")
    .attr("id", tgt.id + "_light")
    // console.log(e)
  }

  // createLegend();
}

function createLegend() {
  var legend = d3.select("#legend");
  legend.append("svg").append("g").html(light).attr("transform", "scale(0.05)");
}
