<script>
    export let data;
    export let width;
    export let height;

    import { fly, fade } from "svelte/transition";

    let tooltipWidth;
    let tooltipHeight;

    const xNudge = 5;

    let x;
    let y;
    
    document.addEventListener('mousemove', function(event) {
        x = event.clientX;
        y = event.clientY - 30;
    });

    $: xPosition = x + tooltipWidth + xNudge > width + 120 ? x - tooltipWidth - xNudge : x + xNudge;
    $: yPosition = y + tooltipHeight > height ? y - tooltipHeight : y;

</script>

<div
    class="Tooltip" 
    in:fly={{y: 10, duration: 200, delay: 200}}
    out:fade
    style="position:absolute; top:{yPosition}px; left:{xPosition}px"
    bind:clientWidth={tooltipWidth} bind:clientHeight={tooltipHeight}>
        <h1>{data.country}</h1>
        <h2>{(data.data / 1_000_000).toFixed()} millones</h2>
</div>

<style>
    .Tooltip {
        background: white;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.15);
        padding: 8px 6px;
        border-radius: 3px;
        pointer-events:none;
        transition: top 100ms ease, left 100ms ease;
    }

    h1 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
    }
    
    h2 {
        font-weight: 400;
        font-size: 12px;
        fill: #8f8f8f;
    }



</style>