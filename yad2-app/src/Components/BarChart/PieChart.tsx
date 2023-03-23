import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { apiService } from "../../service/ApiService";

interface PriceData {
  label: string;
  value: number;
}

interface Props {
  data: PriceData[];
  width: number;
  height: number;
}

const PieChart: React.FC<Props> = ({ data, width, height }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);

    const radius = Math.min(width, height) / 2 - 10;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<PriceData>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<PriceData>>()
      .innerRadius(0)
      .outerRadius(150);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text((d) => `$${d.data.value} ` + d.data.label);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, width, height]);

  return <svg ref={chartRef} width={width} height={height} />;
};

export default PieChart;
