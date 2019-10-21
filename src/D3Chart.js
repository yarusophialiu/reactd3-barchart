import * as d3 from 'd3'
// const url = "https://udemy-react-d3.firebaseio.com/ages.json"
const tallest_men = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
const tallest_women = "https://udemy-react-d3.firebaseio.com/tallest_women.json"
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM


export default class D3Chart {
    constructor(element) {
        const vis = this
        vis.svg = d3.select(element)
          .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
          .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
        
        // x label
        vis.xLabel = vis.svg.append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 50)
            .attr("text-anchor", "middle")

        vis.svg.append("text")
            .attr("x", -(HEIGHT / 2))
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .text("Height in cm")
            .attr("transform", "rotate(-90)")

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
        
        vis.yAxisGroup = vis.svg.append("g")
        
        Promise.all([
            d3.json(tallest_men),
            d3.json(tallest_women)
        ]).then(datasets => {
            vis.men = datasets[0]
            vis.women = datasets[1]
            vis.update("men")
        })
    }

    update(gender) {
        const vis = this
        vis.data = (gender == "men") ? vis.men : vis.women
        vis.xLabel.text(`The world's tallest ${gender}`)
        const data = vis.data
        const max = d3.max(data, d => d.height )
        const min = d3.min(data, d => d.height )

        const y = d3.scaleLinear() 
            .domain([min * 0.95, max])
            .range([HEIGHT, 0])

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, 800])
            .padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup.transition().duration(500).call(xAxisCall)
        
        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        // DATA JOIN
        const rects = vis.svg.selectAll("rect")
            .data(data)
        
        // EXIT
        rects.exit()
            .transition().duration(500)
                .attr("height", 0)
                .attr("y", HEIGHT)
                .remove()

        // UPDATE
        rects.transition().duration(500)
            .attr("x",  d => x(d.name))
            .attr("y", d => y(d.height))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.height))

        // ENTER
        rects.enter().append("rect")
            .attr("x",  d => x(d.name))
            .attr("width", x.bandwidth)
            .attr("fill", "grey")
            .attr("y", HEIGHT)
            .transition().duration(500)
                .attr("height", d => HEIGHT - y(d.height))
                .attr("y", d => y(d.height))


        console.log(rects)
            
    }
}