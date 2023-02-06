/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = 600;
const margin = 100;

const pastel1Colors = d3.scaleOrdinal(d3.schemePastel1);


/* LOAD DATA */

d3.csv('./film_data.csv', d3.autoType)
  .then(data => {

    console.log(data)

    let topFilms = data.sort((a, b) => b.lifetime_gross - a.lifetime_gross).slice(0, 5);
    topFilms = topFilms.map(film => {

        return {
            "lifetime_gross": film.lifetime_gross,
            "title": film.title.slice(0, 22)
        }
    })

    console.log(topFilms)

    /* SCALES */
    const xScale = d3.scaleBand()
        .domain(topFilms.map(d => d.title))
        .range([margin, width - margin])
        .paddingInner(.2)
        .paddingOuter(.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(topFilms.map(d => d.lifetime_gross))])
        .range([height - margin, margin])
        .nice();
    

    /* AXIS */

    const xAxis = d3.axisBottom()
        .scale(xScale);
    
    const yAxis = d3.axisLeft()
        .scale(yScale);


    /* HTML ELEMENTS */
    
    // SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .style("background-color", "lavender");

    // bars

    svg.selectAll(".bar")
        .data(topFilms)
        .join("rect")
        .attr("class", "bar")
        .attr("height", d => yScale(d.lifetime_gross))
        .attr("width", xScale.bandwidth())
        .attr("x", d => xScale(d.title))
        .attr("y", d => height - margin - yScale(d.lifetime_gross))
        .attr("fill", pastel1Colors)
        .attr("stroke", "black");


    // xAxis ticks
    svg.append("g")
        .attr("transform", `translate(${0}, ${height - margin})`)
        .style("font-size", "0.8rem")
        .call(xAxis);
    
    // yAxis ticks
    svg.append("g")
        .attr("transform", `translate(${margin}, 0)`)
        .style("font-size", "0.8rem")
        .call(yAxis);

  });



