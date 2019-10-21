import * as d3 from 'd3'

// const url = "https://udemy-react-d3.firebaseio.com/ages.json"
const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM


export default class D3Chart {
    constructor(element) {
        const svg = d3.select(element)
          .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
          .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
        
        d3.json(url).then(data => {
            const max = d3.max(data, d => d.height )
            const min = d3.min(data, d => d.height )

            const y = d3.scaleLinear() 
                .domain([min * 0.95, max])
                .range([HEIGHT, 0])

            const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, 800])
                .padding(0.4)

            const rects = svg.selectAll("rect")
                .data(data)
                
            const xAxisCall = d3.axisBottom(x)
            svg.append("g")
                .attr("transform", `translate(0, ${HEIGHT})`)
                .call(xAxisCall)
            
            // x label
            svg.append("text")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + 50)
                .attr("text-anchor", "middle")
                .text("The world's tallest men")

            svg.append("text")
                .attr("x", -(HEIGHT / 2))
                .attr("y", -50)
                .attr("text-anchor", "middle")
                .text("Height in cm")
                .attr("transform", "rotate(-90)")

            const yAxisCall = d3.axisLeft(y)
            svg.append("g").call(yAxisCall)

            rects.enter().append("rect")
                .attr("x",  d => x(d.name))
                .attr("y", d => y(d.height))
                .attr("width", x.bandwidth)
                .attr("height", d => HEIGHT - y(d.height))
                .attr("fill", "grey")

        })
        
        // d3.json(url).then(agesData => {
        //     console.log(agesData)
        //     const rects = svg.selectAll("rect")
        //         .data(agesData)
        
        //     rects.enter()
        //         .append("rect")
        //             .attr("x", (d, i) => i * 100)
        //             .attr("y", 50)
        //             .attr("width", 50)
        //             .attr("height", d => d.age + 5)
        //             .attr("fill", d => {
        //                 if (d.age > 10) return "red"
        //                 else return "green"
        //             })
        // })

        
    }
}