let kickstarterDataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

let kickstarterData;

let cavnas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawTreeMap = () => {
  let hierarchy = d3
    .hierarchy(kickstarterData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  let kickstarterTiles = hierarchy.leaves();
  console.log(kickstarterTiles);

  let block = cavnas
    .selectAll("g")
    .data(kickstarterTiles)
    .enter()
    .append("g")
    .attr("transform", (kickstarter) => {
      return "translate (" + kickstarter["x0"] + ", " + kickstarter["y0"] + ")";
    });

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (kickstarter) => {
      let category = kickstarter["data"]["category"];
      if (category === "Product Design") {
        return "blue";
      } else if (category === "Technology") {
        return "tan";
      } else if (category === "Gaming Hardware") {
        return "red";
      } else if (category === "Television") {
        return "lavender";
      } else if (category === "Food") {
        return "pink";
      } else if (category === "Apparel") {
        return "grey";
      } else if (category === "Tabletop Games") {
        return "skyblue";
      } else if (category === "Hardware") {
        return "green";
      } else if (category === "Narrative Film") {
        return "darksalmon";
      } else if (category === "Web") {
        return "brown";
      } else if (category === "Games") {
        return "lightpink";
      } else if (category === "Art") {
        return "lightgreen";
      } else if (category === "Video Games") {
        return "orange";
      } else if (category === "Sound") {
        return "darkgreen";
      } else if (category === "3D Printing") {
        return "purple";
      } else if (category === "Wearables") {
        return "cyan";
      } else if (category === "Sculpture") {
        return "gainsboro";
      } else if (category === "Gadgets") {
        return "fuchsia";
      } else if (category === "Drinks") {
        return "dodgerblue";
      }
    })
    .attr("data-name", (kickstarter) => {
      return kickstarter["data"]["name"];
    })
    .attr("data-category", (kickstarter) => {
      return kickstarter["data"]["category"];
    })
    .attr("data-value", (kickstarter) => {
      return kickstarter["data"]["value"];
    })
    .attr("width", (kickstarter) => {
      return kickstarter["x1"] - kickstarter["x0"];
    })
    .attr("height", (kickstarter) => {
      return kickstarter["y1"] - kickstarter["y0"];
    })
    .on("mouseover", (event, kickstarter) => {
      tooltip.transition().style("visibility", "visible");

      let pledge = kickstarter["data"]["value"]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      tooltip.html("$ " + pledge + "<hr />" + kickstarter["data"]["name"]);

      tooltip
        .attr("data-value", kickstarter["data"]["value"])
        .style("left", event.pageX + 10 + "px") // Position near the cursor
        .style("top", event.pageY + 10 + "px"); // Adjust for better visibility
    })
    .on("mouseout", (kickstarter) => {
      tooltip.transition().style("visibility", "hidden");
    });

  block
    .append("text")
    .text((kickstarter) => {
      return kickstarter["data"]["name"];
    })
    .attr("x", 5)
    .attr("y", 20);
};

d3.json(kickstarterDataUrl).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    kickstarterData = data;
    console.log(kickstarterData);
    drawTreeMap();
  }
});
