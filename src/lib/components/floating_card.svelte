<script>
    //This is floating_card.svelte
    import { onMount } from "svelte";

    export let data
    export let randomPosition;
    export let color;

    //console.log("Color:", color)

</script>

    <div
        class="floater_container closed"
        style="top: {randomPosition.top};
            left: {randomPosition.left};
            z-index: {randomPosition.zIndex};
            animation-delay: {randomPosition.animationDelay};">

        {#if data.Img}
            <div class="floater_image">
                <enhanced:img src={data.Img} alt="">
            </div>
        {/if}
        
        <div
            class="floater_bottom"
            style="background-color: {color}">
            
            {#if data.Title}
                <p class="s2">
                    {data.Title}
                </p>
            {/if}

            <a style="transform: rotate(-45deg);">
                <p class="s2">
                    →
                </p>
            </a>
        </div>
    </div>

<style>
    :global(.floater_container) {
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 50%;
        left: 80%;
        z-index: 500;

        display: flex;
        flex-direction: column;
        gap: 0;

        overflow: hidden;
        
        will-change: transform, max-height; 

        transition: 
            max-height 0.3s ease-in-out, 
            box-shadow 0.45s ease-in-out, 
            width 1s ease-in-out, 
            padding 0.3s ease-in-out;
            
        cursor: grab; 
        touch-action: none;
        user-select: none;
    }

    :global(.floater_container.closed) {
        max-height: 150px;
    }
    :global(.floater_container.open) {
        max-height: 500px;
    }

    :global(.floater_container > .floater_bottom > p) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    :global(.floater_container.closed > .floater_bottom > p) {
        display: none;
    }

    :global(.floater_container.open > .floater_bottom > p) {
        display: block;
    }

    :global(.floater_container.closed > .floater_bottom) {
        padding: var(--spacing-S);
        transition: padding 0.3s ease-in-out;
    }

    :global(.floater_container.open > .floater_bottom) {
        padding-right: var(--spacing-L);
        padding-left: var(--spacing-L);
        padding-top: var(--spacing-S);
        padding-bottom: var(--spacing-S);
        transition: padding 0.3s ease-in-out;
    }

    :global(.floater_container *), 
    :global(.floater_container a) {
        user-select: none;
    }

    :global(.floater_container:hover) {
        animation-play-state: paused; /* Pause the animation on hover */
        box-shadow: 3px 3px 22px 5px rgba(0,0,0,0.12);
        transition: box-shadow 0.45s ease-in-out, width 3s ease-in-out, font-size 3s ease-in-out;
    }

    :global(.floater_image) {
        aspect-ratio: 5 / 3;
        object-fit: cover;
        width: 100%;
        height: 50%;
        filter: grayscale(1);
        z-index: 2;
    }

    :global(.floater_bottom) {
        width: 100%;
        height: 100%;
        display: inline-flex;
        
        padding-right: var(--spacing-L);
        padding-left: var(--spacing-L);
        padding-top: var(--spacing-S);
        padding-bottom: var(--spacing-S);

        justify-content: center;
        align-items: center;
        gap: 5px;

        background-color: white;
        color: black;
        border: dashed 1px black;
        line-height: 1;
        z-index: 4;

        word-wrap: none;
    }

</style>