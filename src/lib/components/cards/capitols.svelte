
<script>

export let data
export let bringToFront
export let suppressCover
export let simplebarContainer

let isProjCover = data.isProjCover

</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
{#if isProjCover === false}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <section
        class="card_container"
        draggable="true"
        on:click={bringToFront}
        aria-label="Draggable Card"
        data-section={data.Title}
    >

        <p class="h0" style="z-index: 7;">
            {data.Title}
        </p>

        <p class="caption">
            BLOCK {data.IndexNum}
        </p>

        <img data-sveltekit-preload-data
            class="card_corner_logo"
            src={data.logoImage}
            alt="EL2MP Logo"
        >

        <div class="description_container" style="background-color: {data.bgColor}; border: 5px solid {data.bgColor};"> 
            <p class="h4" id="description">
                {data.Description}
            </p>
        </div>

        <div class="card_scrollable_container"
            bind:this={simplebarContainer}
            data-simplebar
            data-simplebar-auto-hide="false"
            data-section={data.Title}>
            
            <div class="card_scroll_flex" data-section={data.Title}> 
                
                {#if data.CoverImg}
                    <enhanced:img data-sveltekit-preload-data src={data.CoverImg} alt="CoverImg" />
                {/if}
                
                <!-- Programmatic creation of sections -->
                {#each data.Content as section, index}

                <!-- We assing a programmatic name for the each block sections -->
                <div class="section_container" data-sveltekit-preload-data data-section={`Ex ${index+1}`}> 
                    {#if section.subtitle}
                        <p class="h4">{section.subtitle}</p>
                    {/if}

                    {#if section.picture}
                        <enhanced:img data-sveltekit-preload-data class="article_image" src={section.picture} alt="image"/>
                    {/if}

                    {#if section.text}
                        <p class="p1">{section.text}</p>
                    {/if}
                </div>
                    
                {:else}
                    <p>If you see this we are encountering issues</p>
                {/each}
            </div>
        </div>

        
    </section> 

<!-- svelte-ignore a11y_click_events_have_key_events -->
{:else}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_missing_attribute -->
    <section class="card_container" id="cover_description" draggable="true" on:click={bringToFront} style="color: white;">

        <p class="h0">
            {data.Title}
        </p>

        <img 
            class="card_corner_logo"
            style="position: absolute; left: 0; bottom: 0; width: 25%; opacity: 1;"
            src={data.logoImage}
            alt="EL2MP Logo"
        >

        <div class="card_scrollable_container">
            <div class="card_scroll_flex"> 
                <p class="h4">
                    {data.Description}
                </p>
            </div>
        </div>

        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a class="x_arrow" on:click={suppressCover}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none">
                <path d="M1 1L20 20M1 20L20 1" stroke="white" stroke-width="2"/>
            </svg>
        </a>

    </section> 
{/if} 


<style>

    .description_container {
        width: 99%;
        height: fit-content;
        position: absolute;
        
        top: 0;
        left: 0;

        transform: translateY(calc(var(--spacing-2XL) + var(--spacing-M) - var(--spacing-XS)));
        z-index: 5;
        pointer-events: none;
        padding-bottom: var(--spacing-M);
        padding-right: var(--spacing-M);
        padding-left: var(--spacing-XL);
    }

    .description_container > p {
        width: 80%;
        font-family: 'Instrument Sans';
        font-size: 1.5em;
    }

    .x_arrow {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        stroke-width: 2px;
        stroke: white;
        position: absolute;
        bottom: var(--spacing-M);
        right: var(--spacing-M);
        transition: all 0.8s ease-in-out;
        background-color: black;
    }

    .x_arrow:hover {
        width: 30px;
        height: 30px;
        transition: all 0.8s ease-in-out;
    }

    .card_container {
        width: 60vw;
        height: auto;
        aspect-ratio: 1.5 / 1;
        display: none;
        grid-template-columns: repeat(7, 1fr);
        padding-left: var(--spacing-M);
        padding-right: var(--spacing-M);
        gap: var(--spacing-M);
        background-color: #97D2FB;
        position: absolute;
        cursor: grab;
        top: 20%;
        left: 20%;
        user-select: none;
        overflow: hidden;
        align-content: flex-start;
        
        border: solid 1px black;
    }

    .card_container:active {
        cursor: grabbing;
    }

    .card_scrollable_container {
        display: block;

        width: 100%;
        height: 100%;

        grid-column: 2 / 8;

        background-color: transparent;
        margin-top: calc(var(--spacing-2XL) + var(--spacing-M) * 5 );

        overflow-y: scroll !important;  
        overflow-x: hidden;

        z-index: -1;

        padding-right: var(--spacing-XS);
    }

    .card_scroll_flex {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--spacing-L);

        margin-bottom: var(--spacing-3XL);
        z-index: 0;
    }

    .section_container {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--spacing-M);
        
    }

    /* .card_scroll_flex > img {
        background-color: alpha;
        aspect-ratio: 16 / 9;
        width: 100%;
        min-height: 60px;
        height: auto;
        image-rendering: optimizeQuality;
        object-fit: cover;
    } */

    .card_container > .h0 {
        transform: translateY(-40px);
        position: absolute;
        top: 0;
        left: 0;
    }

    .card_container > .caption {
        position: absolute;
        top: var(--spacing-M);
        right: var(--spacing-M);
    }

    .card_corner_logo {
        position: absolute;
        bottom: var(--spacing-M);
        left: var(--spacing-M);
        width: 5%;
        height: auto;
        opacity: 1;
    }

    .article_image {
        filter: grayscale(100%);
        mix-blend-mode: overlay;
        opacity: 80%;
    }

    /* Scrollbar stuff */

    :global([data-simplebar]) {
        position: absolute;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
    }

    :global(.simplebar-wrapper) {
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }

    :global(.simplebar-mask) {
        direction: inherit;
        position: absolute;
        overflow: hidden;
        padding: 0;
        margin: 0;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: auto !important;
        height: auto !important;
        z-index: 0;
    }

    :global(.simplebar-offset) {
        direction: inherit !important;
        box-sizing: inherit !important;
        resize: none !important;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        -webkit-overflow-scrolling: touch;
    }

    :global(.simplebar-content-wrapper) {
        direction: inherit;
        box-sizing: border-box !important;
        position: relative;
        display: block;
        height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
        width: auto;
        max-width: 100%; /* Not required for horizontal scroll to trigger */
        max-height: 100%; /* Needed for vertical scroll to trigger */
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(.simplebar-content-wrapper::-webkit-scrollbar),
    :global(.simplebar-hide-scrollbar::-webkit-scrollbar) {
        display: none;
        width: 0;
        height: 0;
    }

    :global(.simplebar-content:before),
    :global(.simplebar-content:after) {
        content: ' ';
        display: table;
    }

    :global(.simplebar-placeholder) {
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        pointer-events: none;
    }

    :global(.simplebar-height-auto-observer-wrapper) {
        box-sizing: inherit !important;
        height: 100%;
        width: 100%;
        max-width: 1px;
        position: relative;
        float: left;
        max-height: 1px;
        overflow: hidden;
        z-index: -1;
        padding: 0;
        margin: 0;
        pointer-events: none;
        flex-grow: inherit;
        flex-shrink: 0;
        flex-basis: 0;
    }

    :global(.simplebar-height-auto-observer) {
        box-sizing: inherit;
        display: block;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 1000%;
        width: 1000%;
        min-height: 1px;
        min-width: 1px;
        overflow: hidden;
        pointer-events: none;
        z-index: -1;
    }

    :global(.simplebar-track){
        z-index: 10;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: visible;
    }

    :global([data-simplebar].simplebar-dragging) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global([data-simplebar].simplebar-dragging .simplebar-content) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global([data-simplebar].simplebar-dragging .simplebar-track) {
        pointer-events: all;
    }

    :global(.simplebar-scrollbar) {
        position: absolute;
        left: 0;
        right: 0;
        min-height: 10px;
    }

    :global(.simplebar-scrollbar:before) {
        position: absolute;
        content: '';
        background: white;
        border: solid 1px black;

        border-radius: 0px;
        left: 2px;
        right: 2px;
        opacity: 1;
    }

    :global(.simplebar-scrollbar.simplebar-visible:before) {
        opacity: 1;
        transition-delay: 0s;
        transition-duration: 0s;
    }

    :global(.simplebar-track.simplebar-vertical) {
        top: 2px;
        height: 80%;
        width: var(--spacing-S);
        padding-bottom: var(--spacing-3XL);
    }

    :global(.simplebar-scrollbar:before) {
        top: 0px;
        bottom: 0px;
        left: -10px;
        right: var(--spacing-XS);
        transform: translateY(5px);
    }

    :global(.simplebar-track.simplebar-horizontal) {
        left: 0;
        height: 11px;
    }

    :global(.simplebar-track.simplebar-horizontal .simplebar-scrollbar) {
        right: auto;
        left: 0;
        top: 0;
        bottom: 0;
        min-height: 0;
        min-width: 10px;
        width: auto;
    }

    /* Rtl support */
        :global([data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical) {
        right: auto;
        left: 0;
    }

    :global(.simplebar-dummy-scrollbar-size) {
        direction: rtl;
        position: fixed;
        opacity: 0;
        visibility: hidden;
        height: 500px;
        width: 500px;
        overflow-y: hidden;
        overflow-x: scroll;
        -ms-overflow-style: scrollbar !important;
    }

    :global(.simplebar-dummy-scrollbar-size > div) {
        width: 200%;
        height: 200%;
        margin: 10px 0;
    }

    :global(.simplebar-hide-scrollbar) {
        position: fixed;
        left: 0;
        visibility: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    

</style>