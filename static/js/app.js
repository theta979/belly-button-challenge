// Begin building Dashboard menu starting with Dropdown menu
function initializeDashboard() {
  let dropdownMenu = d3.select("#selDataset");
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let sampleID = data.names;
    console.log(sampleID); // Log sampleIDs to confirm they were pulled properly

    for (let ea = 0; ea < sampleID.length; ea++) {
      dropdownMenu
      .append("option")
      .text(sampleID[ea])
      .property("value", sampleID[ea]);
    }

    let initialSample = sampleID[0];
    buildCharts(initialSample);
    buildMetadata(initialSample);
  });
}

// Build the metadata panel
function buildMetadata(selectedSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadataAll = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let metadataFiltered = metadataAll.filter(sampleObj => sampleObj.id == selectedSample);
    let sampleData = metadataFiltered[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for(let info in sampleData) {
      metadataPanel.append("h6").text(`${info.toUpperCase()}:  ${sampleData[info]}`);
    }
  });
}

// function to build both charts
function buildCharts(selectedSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let allSamples = data.samples;
    console.log(allSamples); // Log allSamples to confirm they were pulled properly

    // Filter the samples for the object with the desired sample number
    let samplesFiltered = allSamples.filter(sampleObj => sampleObj.id == selectedSample);
    let chartData = samplesFiltered[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuID = chartData.otu_ids;
    let otuLabels = chartData.otu_labels;
    let sampleValues = chartData.sample_values;
    

    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let chartYTicks = otuID.map(otuID => `OTU: ${otuID}`);
    let barChartData = [
      {
        y: chartYTicks.slice(0,10).reverse(),
        x: sampleValues.slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let barChartLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30 }
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let slicedChart = 

    // Render the Bar Chart
    Plotly.newPlot("bar", barChartData, barChartLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
initializeDashboard();
