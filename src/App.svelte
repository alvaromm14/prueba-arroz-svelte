<script>
  import data from "$data/data.js"
  import AxisX from "$components/AxisX.svelte"
  import Tooltip from "$components/Tooltip.svelte"


  import { scaleLinear, scaleBand } from "d3-scale";
  import { interpolateRgb } from "d3-interpolate";

  let margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 110
  }

  let width;
  let height = 500;

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  $: xScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.data))])
    .range([0, innerWidth])

  let yScale = scaleBand()
    .domain(data.map(d => d.country))
    .range([0, innerHeight])

  const colorScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.data))]) // Reemplaza con el rango de tus datos
    .range(['#cce5ff', '#003366']) // Colores de inicio y fin
    .interpolate(interpolateRgb);

  let hovered;
</script>

<h1>Mayores productores de arroz</h1>
<h2>Millones de toneladas (2023)</h2>
<div bind:clientWidth={width}>
  <svg width={width} height={height}>
    <g transform="translate({margin.left},{margin.top})">
      <AxisX {xScale} height={innerHeight}/>
      {#each data as bar}
        <text class="countries"
        y={yScale(bar.country) + 1}>{bar.country}</text>
        <image 
          class="flag"
          x={8} 
          y={yScale(bar.country) + 1} 
          width="30" 
          height="20"
          href={`https://flagcdn.com/256x192/${bar.code.toLowerCase()}.png`} />
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <rect
        x=47
        y={yScale(bar.country)}
        width={xScale(bar.data)}
        height={22}
        fill={colorScale(bar.data)}
        stroke={hovered ? hovered === bar ? "black" : "" : ""}
        stroke-width={hovered ? hovered === bar ? 0.5 : 0 : 0}
        on:mouseover={() => {
          hovered = bar;
        }}
        on:mouseleave={() => {
          hovered = null;
        }}/>
      {/each}
    </g>
  </svg>
  {#if hovered}
  <Tooltip data={hovered} width={innerWidth} height={innerHeight} />
{/if}
</div>
<div class="credits">
  <span class="source">Autor: Álvaro Merino | Fuente: ONU (2024)</span>
  <img
    src="https://elordenmundial.com/wp-content/uploads/2025/05/EOM-logo.png"
    alt="Logo EOM"
    class="eom-logo" />
</div>

<style>
  .countries {
    alignment-baseline:text-before-edge;
    text-anchor: end;
    font-size: 14px;
    font-weight: 500;
  }

  .flag {
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.12));
  }

  h1 {
    font-size: 20px;
    margin-bottom: 2px;
    font-weight: 600;
  }

  h2 {
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
  }

  .credits {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 12px;
}

.source {
  font-size: 12px;
}

.eom-logo {
  width: 80px;
  height: auto;
}
</style>