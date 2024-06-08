// Sample data for K-means clustering plot
const kmeansData = [
  {x: 5, y: 3, z: 2e6, cluster: 0},
  {x: 15, y: 4, z: 6e6, cluster: 1},
  {x: 7, y: 3.5, z: 1e6, cluster: 0},
  {x: 20, y: 5, z: 8e6, cluster: 1},
  {x: 8, y: 2, z: 3e6, cluster: 0},
  {x: 25, y: 4, z: 10e6, cluster: 1},
  {x: 10, y: 4.5, z: 2.5e6, cluster: 0}
];

// Create SVG container
const svg = d3.select("#plot")
  .append("svg")
  .attr("width", 800)
  .attr("height", 600)
  .style("border", "1px solid black");

// Create scales
const xScale = d3.scaleLinear().domain([0, 30]).range([50, 750]);
const yScale = d3.scaleLinear().domain([0, 10]).range([550, 50]);
const zScale = d3.scaleLinear().domain([0, 12e6]).range([5, 50]);
const colorScale = d3.scaleOrdinal().domain([0, 1]).range(["purple", "yellow"]);

// Add axes
svg.append("g")
  .attr("transform", "translate(0, 550)")
  .call(d3.axisBottom(xScale));
svg.append("g")
  .attr("transform", "translate(50, 0)")
  .call(d3.axisLeft(yScale));

// Create tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Add points
svg.selectAll("circle")
  .data(kmeansData)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", d => zScale(d.z))
  .attr("fill", d => colorScale(d.cluster))
  .on("mouseover", function(event, d) {
      tooltip.transition()
          .duration(200)
          .style("opacity", .9);
      tooltip.html(`Cluster: ${d.cluster}<br>X: ${d.x}<br>Y: ${d.y}<br>Z: ${d.z}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function() {
      tooltip.transition()
          .duration(500)
          .style("opacity", 0);
  });
