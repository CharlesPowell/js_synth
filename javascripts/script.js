var svg;
var colorGradient = d3.scale.linear()
    .domain([.25, 0.5, 1])
    .range(['#ff0000', '#0000ff', '#00ff00']);

d3.selection.prototype.last = function() {
  var last = this.size() - 1;
  return d3.select(this[0][last]);
};

function d3Project(data){

  var nodes = svg.selectAll('circle')

  console.log(nodes);
  nodes
  //nodes.last()
      .data(data)
      .enter()
        .append('circle');

  // NOTE!!!!
    //    Numbers here... are chosen for effect... they do not come from ANYWHERE...
    //    Someone played with random numbers... till... it... looked.... nice
    //    Play with these numbers... see what happens!!
  svg.selectAll('circle')
    .data(data).last()
        .attr('r', 15)
        .attr('cx', 900+'px')
        .attr('cy', function(d){return (700-d)+'px';})
        .attr('class','bubble')
        .style('fill',function(d){ return colorGradient(120/d);})
        .style('opacity', function(d){ return d/200;})
        .transition()
        .duration(3000)
        .attr('cx', -50+'px')
        .transition()
        .remove()

    return svg;
}
$(document).ready(function(){



  svg = d3.select('body')
        .append('svg')
          .attr('width', '900px')
          .attr('height', '600px');

  //var freqs = [440, 493, 523, 554, 587, 659, 698];
  var vco = T("saw", {freq:T("param"), mul:0.8});
  var vcf = T("MoogFF", {freq:T("param"), gain:2.1, mul:0.25}, vco).play();
  var synth = T("OscGen", {wave:"saw", gain:2.1, mul:0.25}, vco).play();
  var arr =[]
  var keydict = T("ndict.key");
  var midicps = T("midicps");
  T("keyboard").on("keydown", function(e) {
    var midi = keydict.at(e.keyCode);
    if (midi) {
      var freq = midicps.at(midi);
      //console.log(freq);
      synth.noteOnWithFreq(freq, 150);
      arr.push(freq);
      d3Project(arr);

      //arr.pop(freq);
      //setTimeout(function(){arr.pop()}, 100)
      // console.log(vco);
      // console.log(vcf);
      // vco.freq.linTo(freq, "60ms");
      // vcf.freq.sinTo(880 * 2, "180ms");
    }
  }).on("keyup", function(e) {
    var midi = keydict.at(e.keyCode);
    if (midi) {
    synth.noteOff(midi, 100);

    }
  }).start();
  //setInterval(function(){d3Project(arr)}, 100)

})
