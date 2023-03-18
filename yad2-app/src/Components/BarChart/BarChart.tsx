import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { apiService } from '../../service/ApiService';

function BarChart() {
    const chartRef = useRef(null);
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        createBarChart();
    }, [data]);

    useEffect(() => {
        apiService.getAmountOfProductsByCategorie().then((res) => setData(res));

    }, [])

    function getMaxValue() {
        const values: any = data.map((d: any) => d.value);
        return Number(Math.floor(Math.max(values)))
    }

    function createBarChart() {
        const svg = d3.select(chartRef.current);

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;

        const x = d3
            .scaleBand()
            .range([0, width])
            .padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);

        const chartGroup = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        data.forEach((d: any) => {
            d.value = +d.value;
        });

        x.domain(data.map((d: any) => d.name));
        y.domain([0, d3.max(data, (d: any) => d.value) as any]);

        chartGroup
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d: any) => x(d.name) as any)
            .attr('y', (d: any) => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', (d: any) => height - y(d.value));

        chartGroup
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        chartGroup
            .append('g')
            .call(d3.axisLeft(y).tickFormat(d3.format('d')).ticks(getMaxValue()));
    }


    return <svg ref={chartRef} width="400" height="400"></svg>;
}

export default BarChart;