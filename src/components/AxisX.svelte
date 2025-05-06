<script>
    export let height;
    export let xScale;

    $: ticks = xScale.ticks(4);

</script>

<g class="axis x">
    {#each ticks as tick, index}
    {#if index > 0}
      <g class="tick" transform="translate({xScale(tick)}, 0)">
        <text y={height} dy={15}>{tick/1000000}</text>
        <line
          x1=0
          x2=0
          y1=0
          y2={height}
          stroke="hsla(215, 15%, 91%, 1)"
        />
      </g>
      {/if}
    {/each}
  </g>

  <style>
    .tick {
        text-anchor: middle;
    }

    .tick{
    font-weight: 400;
    font-size: 12px;
    fill: #8f8f8f;
  }
  </style>