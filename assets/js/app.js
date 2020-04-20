var width = 800;
var height = 560;
var Text_Area = 100;
var margin = 20;

// Padding for the text at the bottom and left axes
var bottom = 40;
var left = 40;
var Radius;
// Canvas for the graph
var svg = d3
.select("#scatter")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "chart");
// Set the radius of the circle for each dot that will appear in the graph.
// Group element to nest our bottom axes labels.
svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

function Text_Refresh_X() {
xText.attr(
"transform",
"translate(" +
((width - Text_Area) / 2 + Text_Area) +
", " +
(height - margin - bottom) +
")"
);
}
Text_Refresh_X();

function RGrt() {
    if (width <= 530) {
    Radius = 5;
    }
    else {
    Radius = 10;
    }
    }
    RGrt();

// 1. Poverty
xText
.append("text")
.attr("y", -26)
.attr("data-name", "poverty")
.attr("data-axis", "x")
.attr("class", "aText active x")
.text("In Poverty (%)");
// 2. Age
xText
.append("text")
.attr("y", 0)
.attr("data-name", "age")
.attr("data-axis", "x")
.attr("class", "aText inactive x")
.text("Age (Median)");
// 3. Income
xText
.append("text")
.attr("y", 26)
.attr("data-name", "income")
.attr("data-axis", "x")
.attr("class", "aText inactive x")
.text("Household Income (Median)");

var leftTextX = margin + left;
var leftTextY = (height + Text_Area) / 2 - Text_Area;
// Second label group for the axis left of the chart.
svg.append("g").attr("class", "yText");
// yText will allows us to select the group without excess code.
var yText = d3.select(".yText");

function Text_Refresh_Y() {
yText.attr(
"transform",
"translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
);
}
Text_Refresh_Y();
// 1. Obesity
yText
.append("text")
.attr("y", -26)
.attr("data-name", "obesity")
.attr("data-axis", "y")
.attr("class", "aText active y")
.text("Obese (%)");
// 2. Smokes
yText
.append("text")
.attr("x", 0)
.attr("data-name", "smokes")
.attr("data-axis", "y")
.attr("class", "aText inactive y")
.text("Smokes (%)");
// 3. Lacks Healthcare
yText
.append("text")
.attr("y", 26)
.attr("data-name", "healthcare")
.attr("data-axis", "y")
.attr("class", "aText inactive y")
.text("Lacks Healthcare (%)");
d3.csv("./assets/data/data.csv").then(function(data) {
// Visualize the data
visualize(data);
});

function visualize(theData) {

var X1 = "poverty";
var Y1 = "obesity";

var xMin;
var xMax;
var yMin;
var yMax;
// Set up tooltip 
var toolTip = d3.tip()
.attr("class", "toolTip")
.offset([40, -60])
.html(function(d) {
console.log(d)

var X;

var State = "<div>" + d.state + "</div>";

var Y = "<div>" + Y1 + ": " + d[Y1] + "%</div>";

if (X1 === "poverty") {

X = "<div>" + X1 + ": " + d[X1] + "%</div>";
}
else {

X = "<div>" +
X1 +
": " +
parseFloat(d[X1]).toLocaleString("en") +
"</div>";
}

return State + X + Y;
});

svg.call(toolTip);

function xMinMax() {
xMin = d3.min(theData, function(d) {
return parseFloat(d[X1]) * 0.90;
});

xMax = d3.max(theData, function(d) {
return parseFloat(d[X1]) * 1.10;
});
}

function yMinMax() {
yMin = d3.min(theData, function(d) {
return parseFloat(d[Y1]) * 0.90;
});
yMax = d3.max(theData, function(d) {
return parseFloat(d[Y1]) * 1.10;
});
}

function labelChange(axis, clickedText) {
d3
.selectAll(".aText")
.filter("." + axis)
.filter(".active")
.classed("active", false)
.classed("inactive", true);

clickedText.classed("inactive", false).classed("active", true);
}
xMinMax();
yMinMax();
var xScale = d3
.scaleLinear()
.domain([xMin, xMax])
.range([margin + Text_Area, width - margin]);
var yScale = d3
.scaleLinear()
.domain([yMin, yMax])
.range([height - margin - Text_Area, margin]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

function tickCount() {
if (width <= 500) {
xAxis.ticks(5);
yAxis.ticks(5);
}
else {
xAxis.ticks(10);
yAxis.ticks(10);
}
}
tickCount();
svg
.append("g")
.call(xAxis)
.attr("class", "xAxis")
.attr("transform", "translate(0," + (height - margin - Text_Area) + ")");
svg
.append("g")
.call(yAxis)
.attr("class", "yAxis")
.attr("transform", "translate(" + (margin + Text_Area) + ", 0)");

var theCircles = svg.selectAll("g theCircles").data(theData).enter();
theCircles
.append("circle")
.attr("cx", function(d) {
return xScale(d[X1]);
})
.attr("cy", function(d) {
return yScale(d[Y1]);
})
.attr("r", Radius)
.attr("class", function(d) {
return "stateCircle " + d.abbr;
})
.on("mouseover", function(d) {
toolTip.show(d, this);
d3.select(this).style("stroke", "#323232");
})
.on("mouseout", function(d) {
toolTip.hide(d);
d3.select(this).style("stroke", "#e3e3e3");
});

theCircles
.append("text")
.text(function(d) {
return d.abbr;
})
.attr("dx", function(d) {
return xScale(d[X1]);
})
.attr("dy", function(d) {
return yScale(d[Y1]) + Radius / 2.5;
})
.attr("font-size", Radius)
.attr("class", "stateText")
.on("mouseover", function(d) {
toolTip.show(d);
d3.select("." + d.abbr).style("stroke", "#323232");
})
.on("mouseout", function(d) {
toolTip.hide(d);
d3.select("." + d.abbr).style("stroke", "#e3e3e3");
});

d3.selectAll(".aText").on("click", function() {
var self = d3.select(this);
if (self.classed("inactive")) {
var axis = self.attr("data-axis");
var name = self.attr("data-name");
if (axis === "x") {
X1 = name;
xMinMax();
xScale.domain([xMin, xMax]);
svg.select(".xAxis").transition().duration(300).call(xAxis);

d3.selectAll("circle").each(function() {
d3
.select(this)
.transition()
.attr("cx", function(d) {
return xScale(d[X1]);
})
.duration(300);
});

d3.selectAll(".stateText").each(function() {
d3
.select(this)
.transition()
.attr("dx", function(d) {
return xScale(d[X1]);
})
.duration(300);
});
labelChange(axis, self);
}
else {
Y1 = name;
yMinMax();
yScale.domain([yMin, yMax]);
svg.select(".yAxis").transition().duration(300).call(yAxis);

d3.selectAll("circle").each(function() {
d3
.select(this)
.transition()
.attr("cy", function(d) {
return yScale(d[Y1]);
})
.duration(300);
});

d3.selectAll(".stateText").each(function() {
d3
.select(this)
.transition()
.attr("dy", function(d) {
return yScale(d[Y1]) + Radius / 3;
})
.duration(300);
});
labelChange(axis, self);
}
}
});
}
