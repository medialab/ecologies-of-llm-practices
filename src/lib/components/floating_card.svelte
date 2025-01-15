<script>
    //This is floating_card.svelte
    import { onMount } from "svelte";

    export let data
    export let randomPosition;
    export let color;

    //console.log("Data:", data)

</script>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="floater_container closed" style="top: {randomPosition.top}; left: {randomPosition.left}; z-index: {randomPosition.zIndex}; animation-delay: {randomPosition.animationDelay};">

        {#if data.Img}
            <div class="floater_image">
                <enhanced:img src={data.Img} alt="{data.Title} image">
            </div>
        {/if}
        
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_missing_attribute -->
        <a
            class="floater_bottom"
            style="background-color: {color}">

            {#if data.category === 'document'}
                <div class="category_icon" id="document">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"/></svg>
                </div>
            {:else if data.category === 'image'}
                <div class="category_icon" id="image">
                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z"/></svg>
                </div>
                {:else if data.category === 'video'}
                <div class="category_icon" id="video">
                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z"/></svg>
                </div>
                {:else if data.category === 'link'}
                <div class="category_icon" id="video">
                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z"/></svg>
                </div>
            {/if}

            {#if data.Title}
                <p class="s2">
                    {data.Title}
                </p>
            {/if}

            <!--
            <a style="transform: rotate(-45deg);">
                <p class="s2">
                    →
                </p>
            </a>
            -->
        </a>
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
        flex-direction: column-reverse;
        gap: 0;
        opacity: 0;

        overflow: hidden;
        
        will-change: transform, max-height; 

        transition: 
            max-height 0.3s ease-in-out, 
            /* box-shadow 1s ease-in-out,  */
            width 1s ease-in-out, 
            padding 0.3s ease-in-out;
            
        cursor: grab; 
        touch-action: none;
        user-select: none;
        transform-origin: bottom left;

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
        padding: var(--spacing-S);
        transition: padding 0.3s ease-in-out;
        width: 100%;
    }

    :global(.floater_container *), 
    :global(.floater_container a) {
        user-select: none;
    }

    :global(.floater_container:hover) {
        animation-play-state: paused; /* Pause the animation on hover */
        /* box-shadow: 3px 3px 22px 5px rgba(0,0,0,0.12); */
        transition: box-shadow 0.45s ease-in-out, width 3s ease-in-out, font-size 3s ease-in-out;
    }

    @keyframes showAndTranslate {
        0% {
            display: none;
            transform: translateY(-120%);
            opacity: 0;
        }
        30% {
            opacity: 1;
            transform: translateY(-120%);
            display: block;
        }
        100% {
            transform: translateY(0); 
            opacity: 1;
            display: block;
        }
    }

    :global(.floater_container.open > .floater_image) {
        
        max-width: 300px;
        max-height: 200px;
        transform: translateY(100%);
        
        position: relative;
        display: block;

        animation: showAndTranslate 1.5s ease-in-out forwards;
    }

    :global(.floater_container.closed > .floater_image) {

        animation: showAndTranslate 1.5s ease-in-out reverse;
    }

    :global(.floater_image) {
        max-width: 300px;
        max-height: 200px;
        aspect-ratio: 21 / 9;
        width: 100%;
        filter: grayscale(1);
        z-index: 2;

        position: relative;

        border-left: dashed 1px black;
        border-right: dashed 1px black;
        border-bottom: dashed 1px black;

        transform: translateY(100%); /* Positioned off-screen initially */
        
        opacity: 0; 

        display: none; /* Completely hidden by default */
    }

    :global(.floater_image > picture) {
        display: block;
        height: 100%;
        width: 100%;
        overflow: hidden;
        object-fit: cover;
        object-position: top;
    }

    :global(.floater_image > picture > img) {
        object-fit: cover;
        object-position: top;
    }

    :global(.floater_bottom) {
        width: max-content;
        height: fit-content;
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
        line-height: 1.2;
        z-index: 4;

        word-wrap: none;
    }

    :global(.category_icon) {
        display: block;
        width: 20px;
        height: 20px;
        fill: black;
    }

</style>