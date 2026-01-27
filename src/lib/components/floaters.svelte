<script>
    //This is floating_card.svelte
    import { onMount } from "svelte";
    import { currentCardColor, selectedCard, isAlterEgoMode } from '$lib/stores/globalStores';

    export let data
    export let randomPosition;
    let holdTimeout;
    let isHolding = false;
    let isClicked = false;

    const addClickedClass = (event) => {
        event.preventDefault();
        if (data.category === 'image' || data.category === 'video' && data.media) {
                    const floaterContainer = event.target.closest('.floater_container');

            if (floaterContainer) {
                if (data.category === 'image' || data.category === 'video')
                    floaterContainer.style.flexDirection = 'column-reverse';

                floaterContainer.classList.add('clicked');
                isClicked = true;
                
            } else {
                console.warn('No floater container found for the clicked element');
            }
        }
    };

    const removeClickedClass = (event) => {
        const floaterContainer = event.target.closest('.floater_container');
        if (floaterContainer) {
            floaterContainer.classList.remove('clicked');
            isClicked = false;
        } else {
            console.warn('No floater container found for the clicked element');
        }
    };

    const handleMouseDown = () => {
        if (data.category === "document") {
            isHolding = true;

            const floaterContainer = event.target.closest('.floater_container');

            const darkerElement = floaterContainer.querySelector('.darker');

            if (darkerElement) {
                darkerElement.classList.add('open');
            }

            holdTimeout = setTimeout(() => {
                if (isHolding && data.file) {
                    // Trigger file download
                    const anchor = document.createElement('a');
                    anchor.href = data.file;
                    anchor.download = data.Title || 'default-file-name';
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                }

                darkerElement.classList.remove('open');
            }, 3000); // 3 seconds

            
        }
    };

    const handleMouseUp = () => {
        isHolding = false;
        clearTimeout(holdTimeout);
        const floaterContainer = event.target.closest('.floater_container');
        
        if (floaterContainer) {
            // Find the .darker element within the scoped floater_container
            const darkerElement = floaterContainer.querySelector('.darker');
            if (darkerElement) {
                // Remove the "open" class to revert the transition
                darkerElement.classList.remove('open');
            }
        }
    };

    const handleKeyDown = (event) => {
        // Trigger click on Enter or Space key press
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            addClickedClass(event);
        }
    };

</script>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="floater_container open"

            data-sveltekit-preload-data="hover"
            data-parent={data.parent}
            data-identifier={data.parent}_{data.id}
            style="
                top: {randomPosition.top};
                left: {randomPosition.left};
                z-index: {randomPosition.zIndex};
                animation-delay: {randomPosition.animationDelay}s;" >
            {#if data.media}
                {#if isClicked}
                    <div class="floater_image">
                        {#if data.category === 'image'}
                            <enhanced:img src={data.media} alt="{data.Title} image"/>
                        {:else if data.category === 'video'}
                            <video autoplay muted loop playsinline>
                                <source src={data.media} type="video/mp4" />
                                Damn, it seems that your browser doesn't support this video tag.
                            </video>
                        {/if}
                    </div>

                <button
                        class="closer_container p-2"
                        style="background-color: {$currentCardColor}"
                        on:click={removeClickedClass}
                        aria-label="Close"
                        tabindex="0"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-236-20-20 224-224-224-224 20-20 224 224 224-224 20 20-224 224 224 224-20 20-224-224-224 224Z"/></svg>
                </button>
                {/if}
            {/if}
            
            <button
                type="button"
                class="floater_bottom"
                style="background-color: {$currentCardColor}"
                aria-label="Close"
                tabindex="0"
                on:click={addClickedClass}
                on:keydown={handleKeyDown}

                on:mousedown={handleMouseDown}
                on:mouseup={handleMouseUp}
                on:mouseleave={handleMouseUp}
            
                >

                {#if data.category === 'document'}
                    <div
                        class="category_icon"
                        id="document"
                        
                        href={data.file || data.href || undefined}
                        download={data.file ? data.Title : undefined}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z"/></svg>
                    </div>

                    <div class="darker">

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
                    <p class="s2" id="floater_text">
                        {data.Title}
                    </p>
                {/if}
                
            </button>
        </div>

<style>

    :global(.floater_container) {
        @apply absolute top-1/2 left-[80%] z-[500] flex flex-col gap-0 opacity-0 overflow-hidden cursor-grab touch-none select-none origin-bottom-left transition-[width,opacity] duration-300 ease-in-out w-auto h-auto;
        will-change: transform, max-height;
    }

    /* Mobile hidden */
    @media (max-width: 768px) {
        :global(.floater_container) {
            @apply hidden;
        }
    }

    :global(.floater_bottom) {
        @apply inline-flex w-max h-fit px-[var(--spacing-L)] py-[var(--spacing-S)] justify-center items-center gap-0 bg-white text-black border border-dashed border-black leading-[1.2] z-[4] static transition-colors duration-[var(--transition-times)] ease-[var(--transition-curve)];
        word-wrap: normal; /* "word-wrap: none" isn't standard, normal is default */
    }

    :global(.floater_container > .floater_bottom > p) {
        @apply whitespace-nowrap overflow-hidden text-ellipsis;
    }

    /* Closed State */
    :global(.floater_container.closed) {
        @apply transition-opacity duration-300 ease-in-out;
    }

    :global(.floater_container.closed > .floater_bottom > p) {
        @apply block w-0 pl-0;
        transition: all var(--transition-times) var(--transition-curve);
    }

    /* Open State */
    :global(.floater_container.open) {
        @apply w-fit min-w-max;
    }

    :global(.floater_container.open > .floater_bottom > p) {
        @apply block w-fit pl-[var(--spacing-S)];
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.floater_container.open > .floater_bottom) {
        @apply p-[var(--spacing-S)] w-full z-[4] transform-none transition-transform duration-100 ease-in-out;
    }

    :global(.floater_container.open > .floater_bottom:active) {
        @apply brightness-90 scale-[0.97];
    }

    /* Interactive Elements inside */
    :global(.floater_container *), 
    :global(.floater_container a) {
        @apply select-none;
    }

    :global(.floater_image) {
        @apply max-w-[450px] w-[300px] h-0 overflow-hidden grayscale z-[2] relative border-0 opacity-100 transition-opacity duration-300 block;
        aspect-ratio: 21 / 9;
    }

    @supports not (aspect-ratio: 1) {
        :global(.floater_image) {
            height: calc(100vw / 21 * 9);
        }
    }

    :global(.floater_image > picture),
    :global(.floater_image > picture > img) {
        @apply block w-full h-full overflow-hidden object-cover object-center z-[1];
    }

    /* AlterEgo State */
    :global(.floater_container.alterEgo) {
        @apply opacity-0 transition-opacity duration-300 ease-in-out !important;
    }

    :global(.floater_container.closed > .floater_bottom) {
        @apply p-[var(--spacing-S)] z-[4];
    }

    /* Category Icons */
    :global(.category_icon) {
        @apply block w-[20px] h-[20px] fill-black appearance-none border-none bg-transparent p-0 shrink-0 z-[1] static transition-none text-transparent;
        font-family: inherit;
        line-height: inherit;
    }

    :global(.category_icon:hover) {
        @apply bg-transparent;
    }

    .closer_container {
        @apply hidden absolute right-0 bottom-0 z-[4] w-[40px] h-[40px] border border-dashed border-black items-center justify-center p-0;
    }

    .closer_container > svg {
        @apply w-[30px] h-[30px] fill-black place-self-center place-content-center;
    }

    /* Clicked & Open State - Expanded Floater */
    :global(.floater_container.open.clicked) {
        @apply w-[20vw] h-auto origin-bottom-left;
        aspect-ratio: 16 / 9;
        animation-play-state: paused;
    }

    :global(.floater_container.open.clicked > .floater_image) {
        @apply h-[85%] w-full relative block border border-dashed border-black border-l-0 border-r-0 border-b-0; 
        /* The original CSS had border-left: dashed 1px black... wait, the replacement has border-0 then adds it back?
           Original: border-left: dashed 1px black; ... 
           Wait, "border-left: none" was in .floater_image.
           In .floater_container.open.clicked > .floater_image it sets borders.
           Let's match original: border-left, right, bottom: dashed 1px black.
        */
        @apply border-l border-r border-b border-black border-dashed;
    }

    :global(.floater_container.open.clicked > .floater_image > video) {
        @apply w-full h-full object-cover bg-gray-500;
    }

    :global(.floater_container.open.clicked > .closer_container) {
        @apply flex;
    }

    :global(.floater_container.open.clicked > .closer_container:active) {
        @apply brightness-90;
    }

    :global(.floater_container.open.clicked > .floater_bottom) {
        @apply border border-dashed border-black;
    }

    :global(.floater_container.open.clicked > .floater_bottom:active) {
        @apply transform-none filter-none;
    }

    /* Darker Overlay */
    :global(.darker) {
        @apply absolute w-full h-full z-[10] bg-black opacity-90 mix-blend-overlay -translate-x-full transition-transform duration-200 ease-in-out;
    }

    :global(.darker.open) {
        @apply translate-x-0 transition-transform duration-[3000ms] ease-in-out;
    }

</style>