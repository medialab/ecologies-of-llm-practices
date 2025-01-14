<script>
    import Capitols from "$lib/components/cards/capitols.svelte"; 
    import LogoButton from "$lib/components/buttons/logo_button.svelte";
    import PositionMarkerButton from "$lib/components/buttons/position_marker_button.svelte";
    import ResetButton from "$lib/components/buttons/reset_button.svelte";
    import TimeButton from "$lib/components/buttons/time_button.svelte";
    import FloatingCard from "$lib/components/floating_card.svelte";

    import { onMount, onDestroy, tick } from "svelte";
    import { format, formatDistance, formatRelative, subDays } from 'date-fns'


    //The data containes everything passed from the +page.server.js
    export let data

    let containers;
    let floaters;
    let formattedTime;
    let isProjCover;
    let ResizeObserver;

    let initialPositions = [];
    let floaterPositions = [];

    let highestZIndex = 1;
    let cover;
    let sidebar;
    let isAnimating = false;
    let scrollableElements;
    
    let selectedCard = "Qualifying";
    let currentScrollLevel = null;
    let currentCardColor;

    let currentObserver;
    let sections = [];
    let lastCardColor = null;

    let hostElement;
    let simplebarContainer;

    //Functions

    const updateTime = () => {
        const now = new Date();
        setTimeout(() => {
            formattedTime = format(now, "eee do MMM - HH:mm:ss");
        }, 600);
        
    };

    const reset_function = () => {

        if (!containers) {
            console.error("No containers found!");
            return;
        }

        containers.forEach((container, index) => {
            const { x, y } = initialPositions[index];
            container.style.transition = 'transform 0.3s ease-in-out'
            container.style.transform = `translate(${x}px, ${y}px)`;
            
            container.setAttribute('data-x', x);
            container.setAttribute('data-y', y);
            container.style.zIndex = -index; 

            setTimeout(() => {
                container.style.transition = ''
            }, 300);
        });

        if (floaters) {
            floaters.forEach(floater => {
                const newPosition = calculateRandomPosition();
                floater.style.position = "absolute";
                floater.style.transition = 'all 0.3s ease-in-out'
                floater.style.top = newPosition.top;
                floater.style.left = newPosition.left;
                floater.style.zIndex = newPosition.zIndex;

                setTimeout(() => {
                    floater.style.transition = ''
                }, 300);
            });
        }

        scrollableElements.forEach((element) => {
            element.scrollTop = 0;
        });

        close_sidebar();
        closeFloaters(floaters);

        highestZIndex = 1;
    };

    const bringToFront = (event) => {
        const container = event.currentTarget;
        highestZIndex += 1;
        container.style.zIndex = highestZIndex;
    };

    const suppressCover = () => {
        cover.style.display = 'none'
    }

    const open_sidebar = () => {
        if (sidebar.classList.contains('closed')) {
            sidebar.classList.remove('closed');
            sidebar.classList.add('open');
        }
    };

    const close_sidebar = () => {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebar.classList.add('closed');

        }
    };

    const switch_sidebar = () => {
        if (isAnimating) return;
        isAnimating = true;

        if (sidebar.classList.contains('open')) {
            close_sidebar();
        } else if (sidebar.classList.contains('closed')) {
            open_sidebar();
        } else {
            open_sidebar();
        }

        // Re-enable toggling after the animation ends (match duration in CSS)
        setTimeout(() => {
            isAnimating = false;
        }, 1000); // Adjust this value based on your animation duration
    };

    const setupMouseDetection = () => {

        sections.forEach((section) => {
            section.addEventListener("mouseenter", (event) => {
                const sectionId = event.target.getAttribute("data-section");
                currentScrollLevel = sectionId;
            });
        });

        containers.forEach((container) => {
            container.addEventListener("click", (event) => {
                selectedCard = event.target.getAttribute("data-section");
                openFloaters(floaters);
            });
        });
    };

    const observeSectionsAndContainers = () => {
        const observer = new MutationObserver(() => {
            sections = document.querySelectorAll('.scrollable-section');
            containers = document.querySelectorAll('.card_container');
            setupMouseDetection();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    const calculateRandomPosition = (floaterWidth = 100, floaterHeight = 40) => {
        if (typeof window === 'undefined') {
            return { top: "0px", left: "0px", zIndex: 0 };
        }

        // Define safety insets
        const safetyInset = 20;

        // Calculate grid rows and columns based on viewport size
        const columns = Math.floor((window.innerWidth - safetyInset * 2) / floaterWidth); // Number of columns
        const rows = Math.floor((window.innerHeight - safetyInset * 2) / floaterHeight); // Number of rows

        // Exclude the bottom row (don't place floaters in the last row)
        const validRows = rows - 1;

        // Calculate the available space for grid placement
        const gridWidth = window.innerWidth - safetyInset * 2;
        const gridHeight = window.innerHeight - safetyInset * 2;

        // Calculate the cell size based on the number of rows and columns
        const cellWidth = gridWidth / columns;
        const cellHeight = gridHeight / validRows;

        // Generate a random index for placement within valid rows and columns
        const row = Math.floor(Math.random() * validRows);
        const col = Math.floor(Math.random() * columns);

        // Calculate the top-left position based on the grid position
        const topPosition = safetyInset + row * cellHeight + (cellHeight - floaterHeight) / 2;
        const leftPosition = safetyInset + col * cellWidth + (cellWidth - floaterWidth) / 2;

        // Ensure floaters are within the viewport bounds (especially near the bottom)
        const validTopPosition = Math.min(topPosition, window.innerHeight - floaterHeight - safetyInset);
        const validLeftPosition = Math.min(leftPosition, window.innerWidth - floaterWidth - safetyInset);

        return {
            top: `${Math.round(validTopPosition)}px`,
            left: `${Math.round(validLeftPosition)}px`,
            zIndex: Math.floor(Math.random() * 1000), // Randomize zIndex
        };
    };

    const alignColor = (selectedCard) => {
        const selected = Object.values(data.cardsDb).find(card => card.Title === selectedCard);

        if (selected) {
            //console.log("Found matching card:", selected);
            currentCardColor = selected.bgColor; // Update current color
            lastCardColor = selected.bgColor;   // Store the last valid color
        } else {
            //console.log(`No matching card found for ${selectedCard}:`, selectedCard);
            currentCardColor = lastCardColor;   // Revert to the last valid color
        }
    };

    const openFloaters = (floaters) => {
        floaters.forEach(floater => {
            if (floater.classList.contains('closed')) {
            floater.classList.remove('closed');
            floater.classList.add('open');
        }
        //console.log("Opening floaters")
        });
    };

    const closeFloaters = (floaters) => {
        floaters.forEach(floater => {
            if (floater.classList.contains('open')) {
            floater.classList.remove('open');
            floater.classList.add('closed');
        }
        //console.log("Closing floaters")
        });
    };

    $: alignColor(selectedCard);

    onMount(async () => {

        const interact = (await import('interactjs')).default;
        const simpleBar = (await import('simplebar')).default;

        const ResizeObserver = (await import('resize-observer-polyfill')).default;

        if (simplebarContainer) {
            new SimpleBar(simplebarContainer, {
                autoHide: false, // Keeps the scrollbar visible all the time
                scrollbarMinSize: 10, // Sets the minimum scrollbar size
            });
        }


        updateTime();
        const interval = setInterval(updateTime, 1000);

        containers = document.querySelectorAll('.card_container')
        floaters = document.querySelectorAll('.floater_container')
        hostElement = document.querySelector('.host');

        tick();

        // Storing positions
        containers.forEach((container, index) => {
            const offset = -30 * index;
            const centering = 30;
            const x = offset - centering;
            const y = offset + centering;
            initialPositions.push({ x, y });

            container.style.transform = `translate(${x}px, ${y}px)`;
            container.setAttribute('data-x', x);
            container.setAttribute('data-y', y);
            container.style.zIndex = -index;

            container.setAttribute('data-index', index);

            const cardData = Object.values(data.cardsDb)[index];

            if (cardData && cardData.bgColor) {
                container.style.backgroundColor = cardData.bgColor;
            }

            container.style.opacity = '0';
            
            setTimeout(() => {
                setTimeout(() => {
                container.style.display = 'grid';
                container.style.opacity = '1';
            }, index * 125); 
            }, 500); 
            
        });

        containers.forEach(container => {
            container.classList.add('grab');
            container.style.touchAction = 'none';

            interact(container).draggable({

                inertia: {
                    resistance: 15,
                    minSpeed: 100,
                    endSpeed: 20,
                    smoothEndDuration: 500,
                },

                listeners: {
                    start(event) {
                        close_sidebar();
                        bringToFront(event);

                        const index = event.target.getAttribute('data-index');

                        const cardData = Object.values(data.cardsDb)[index];

                        // If the cardData exists, update selectedCard with the Title
                        if (cardData && cardData.Title) {
                            selectedCard = cardData.Title;
                            openFloaters(floaters);
                        }

                        event.target.classList.remove('grab');
                        event.target.style.cursor = 'grabbing';
                        
                    },

                    move(event) {
                        const x = (parseFloat(container.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(container.getAttribute('data-y')) || 0) + event.dy;

                        container.style.transform = `translate(${x}px, ${y}px)`;
                        container.setAttribute('data-x', x);
                        container.setAttribute('data-y', y);
                        
                    },

                    end(event) {
                        //console.log('Drag ended', event);
                        event.target.classList.remove('grabbing');
                        event.target.style.cursor = 'grab';
                    },
                    modifiers: [
                        interact.modifiers.restrict({
                            restriction: 'parent', // Prevents dragging outside the container's parent
                            endOnly: true,
                        }),
                    ],
                    inertia: true,
                },
            });
        });

        // Add draggable functionality to floaters
        floaters.forEach((floater, index) => {
            floater.classList.add('grab');
            floater.style.touchAction = 'none';

            // Initialize floating animation variables
            const floatingSpeed = 0.02; // Controls how fast the floating animation moves
            const floatingRange = 800; // Maximum distance to float (in pixels)
            let floatX = 0;
            let floatY = 0;
            let directionX = Math.random() > 0.5 ? 1 : -1;
            let directionY = Math.random() > 0.5 ? 1 : -1;

            // Start floating animation
            const animateFloating = () => {
                floatX += directionX * floatingSpeed;
                floatY += directionY * floatingSpeed;

                // Reverse direction when reaching the floating range
                if (Math.abs(floatX) > floatingRange) directionX *= -1;
                if (Math.abs(floatY) > floatingRange) directionY *= -1;

                // Apply floating transform
                const currentX = parseFloat(floater.getAttribute('data-x')) || 0;
                const currentY = parseFloat(floater.getAttribute('data-y')) || 0;
                floater.style.transform = `translate(${currentX + floatX}px, ${currentY + floatY}px)`;

                requestAnimationFrame(animateFloating);
            };

            requestAnimationFrame(animateFloating);

            interact(floater).draggable({
                inertia: {
                    resistance: 20,         
                    minSpeed: 80,           
                    endSpeed: 10,          
                    smoothEndDuration: 400,
                },

                listeners: {
                    start(event) {
                        // Bring the floater to the front
                        floater.style.zIndex = parseInt(floater.style.zIndex || 1) + 1;

                        // Get current transform values and calculate actual position
                        const computedStyle = window.getComputedStyle(floater);
                        const transform = computedStyle.transform;

                        if (transform && transform !== "none") {
                            const matrix = new DOMMatrix(transform);
                            const currentX = matrix.m41; // Translate X value
                            const currentY = matrix.m42; // Translate Y value

                            // Set data attributes for accurate dragging
                            floater.setAttribute("data-x", currentX);
                            floater.setAttribute("data-y", currentY);
                        } else {
                            // If no transform is applied, set to default (0, 0)
                            floater.setAttribute("data-x", 0);
                            floater.setAttribute("data-y", 0);
                        }

                        event.target.classList.remove("grab");
                        event.target.style.cursor = "grabbing";
                    },
                    move(event) {
                        // Calculate new position during dragging
                        const x = (parseFloat(floater.getAttribute("data-x")) || 0) + event.dx;
                        const y = (parseFloat(floater.getAttribute("data-y")) || 0) + event.dy;

                        // Reset floating offsets during drag
                        floatX = 0;
                        floatY = 0;

                        // Apply the transformation and update attributes
                        floater.style.transform = `translate(${x}px, ${y}px)`;
                        floater.setAttribute("data-x", x);
                        floater.setAttribute("data-y", y);

                        floaterPositions[index] = { x, y };
                    },
                    end(event) {
                        // Reset cursor after drag ends
                        event.target.classList.remove("grabbing");
                        event.target.style.cursor = "grab";
                    },
                },
                modifiers: [
                    interact.modifiers.restrict({
                        restriction: "parent",
                        endOnly: true,
                    }),
                ],
                inertia: true,
            });
        });

        tick();

        cover = document.querySelector('#cover_description')
        sidebar = document.querySelector('#sidebar')
        scrollableElements = document.querySelectorAll('.card_scrollable_container')

        // Here we are selecting the sections for the marker loader
        sections = document.querySelectorAll('.section_container');
        setupMouseDetection();
        observeSectionsAndContainers();
        
    }); 

</script>


<div class="content_container">

    <LogoButton
        data = {data}
        switch_sidebar = {switch_sidebar}
    />

    <section class="host">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="closing_icon" on:click={switch_sidebar}>
            <svg
                width="50px"
                height="50px"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960">
                <path d="M480-154.15 328.62-305.54l26.3-26.31L480-206.77l125.08-125.08 26.3 26.31L480-154.15ZM354.92-628.46l-26.3-26.31L480-806.15l151.38 151.38-26.3 26.31L480-753.54 354.92-628.46Z"/>
            </svg>
        </button>

        <PositionMarkerButton
            data = {data}
            selectedCardTitle = {selectedCard}
            currentScrollLevel = {currentScrollLevel}
        />

        <ResetButton
            data = {data}
            reset_function = {reset_function}
        />

        <TimeButton
            data = {data}
            time= {formattedTime || "Loading..."}
        />

        {#each Object.values(data.cardsDb) as card (card.IndexNum)}
            <Capitols
            data={card}
            bringToFront = {bringToFront}
            suppressCover = {suppressCover}
            simplebarContainer = {simplebarContainer}
            />

        {/each}   


        {#each Object.values(data.floatersDb) as floater (floater.id)}
            <FloatingCard
                data={floater}
                randomPosition = {calculateRandomPosition()}
                color = {currentCardColor}
            />
        {/each}
        
        
    </section>
   
</div>
    

<enhanced:img
    class="background_image"
    src={data.backgroundImage}
    alt="DotsDotsDots?"
/>


<style global>

    :global(.content_container){
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
    }

    :global(.host) {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 6;
    }


    :global(.background_image) {
        width: 100%;
        height: 100%;
        min-width: 100%;
        min-height: 100%;
        position: fixed;
        z-index: -5;
        top: 0%;
        left: 0%;
        user-select: none;
        overflow: hidden;
    }

    :global(.grab) {
        cursor: grab;
    }

    :global(.grabbing) {
        cursor: grabbing;
    }

    /* Base styles for html and body */
    :global(html) {
        box-sizing: border-box; /* Ensures consistent box model */
        font-size: 16px; /* Sets the root font size */
        scroll-behavior: smooth; /* Enables smooth scrolling */
        line-height: 1.5; /* Improves readability */
        -webkit-font-smoothing: antialiased; /* Improves font rendering on WebKit */
        -moz-osx-font-smoothing: grayscale; /* Improves font rendering on macOS */
        overflow: hidden;
    }

    :global(.major_div) {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    :global(body) {
        margin: 0; /* Removes default body margin */
        padding: 0; /* Removes default body padding */
        color: #333; /* Default text color */
        background-color: #f7f7f7; /* Default background color */
        min-height: 100%;
        min-width: 100%;
        display: flex; /* Allows flexible layout setups */
        flex-direction: column; /* Stacks content vertically */
        align-items: center; /* Centers content horizontally */
        justify-content: flex-start; /* Aligns content at the top */
        overflow: hidden;
        scroll-behavior: none;
    }


    :global(button) {
        appearance: none; /* Removes default styles */
        font-family: inherit; /* Matches the button font with the surrounding text */
        font-size: 1rem; /* Ensures consistent sizing */
        font-weight: 400; /* Neutral font weight */
        line-height: 1.5; /* Comfortable line height */
        color: #333; /* Neutral text color */
        background-color: #f8f9fa; /* Neutral light gray background */

        border: 1px solid black; /* Light gray border */

        border-radius: 4px; /* Slight rounding for modern feel */
        padding: 0.5em 1em; /* Comfortable padding */
        text-align: center; /* Center-aligns text */
        display: inline-block; /* Suitable for buttons */
        transition: background-color 0.2s ease, border-color 0.2s ease,
            color 0.2s ease; /* Smooth hover effect */

        /*these are the stable classes */

        position: fixed;

        display: inline-flex;
        height: auto;
        width: auto;
        padding: var(--spacing-S, 10px);
        flex-shrink: 0;

        justify-content: flex-start;
        align-items: flex-start;

        background-color: #EAEAEA;
        cursor: pointer;
        z-index: 100;
    }

    :global(button:hover) {
        background-color: #D9D9D9;
        color: var(--full-black);
        cursor: pointer;
    }

    :global(button:active) {
        background-color: var(--full-black);
        color: var(--demi-white);
    }

    /* Ensure consistent box-sizing across all elements */
        :global(*),
        :global(*::before),
        :global(*::after) {
        box-sizing: inherit;
        /* scrollbar-color: black var(--full-black);
        scrollbar-width: thin;
        scrollbar-gutter: stable both-edges; */
    }

    /* Responsive Typography */
    :global(.h1),
    :global(.h2),
    :global(.h3),
    :global(.h4),
    :global(.h5),
    :global(.h6) {
        margin: 0;
        font-weight: 600;
        line-height: 1.2;
    }

    /* Utility styles */
    :global(a) {
        text-decoration: none;
        color: inherit;
    }

    :global(img) {
        max-width: 100%;
        height: auto;
        display: block;
    }

    :global(ul),
    :global(ol) {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(*) {
        margin: 0px;
        padding: 0px;
    }

    :global(:root) {
        --demi-white: #F7F7F7;
        --full-white: #FFFFFF;
        --full-black: #000000;
        --serif-font-family: 'Instrument Serif';
        --sans-font-family: 'Instrument Sans';
        --fallback-serif-font: 'serif';
        --fallback-sans-font: 'sans-serif';

        interpolate-size: allow-keywords;

        /* SPACING SYSTEM */
        --spacing-XS: 0.3125em; /* 5px */
        --spacing-S: 0.625em;   /* 10px */
        --spacing-M: 0.9375em; /* 15px */
        --spacing-L: 1.875em;  /* 30px */
        --spacing-XL: 3.75em;  /* 60px */
        --spacing-2XL: 7.5em;  /* 120px */
        --spacing-3XL: 15em;   /* 240px */
    }

    :global(.h0) {
        font-size: 7.75em; /* 124px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.h1) {
        font-size: 6em; /* 96px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.h2) {
        font-size: 3.75em; /* 60px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.h3) {
        font-size: 3em; /* 48px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.h4) {
        font-size: 2.125em; /* 34px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
    }

    :global(.s1) {
        font-size: 1.125em; /* 18px */
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.s2) {
        font-size: 0.875em; /* 14px */
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.p1) {
        font-size: 1em; /* 16px */
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.p2) {
        font-size: 0.875em; /* 14px */
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.p3) {
        font-size: 0.75em; /* 12px */
        font-family: var(--sans-font-family), var(--fallback-sans-font);
        font-weight: 400;
    }

    :global(.caption) {
        font-size: 0.875em; /* 14px */
        font-family: var(--serif-font-family), var(--fallback-serif-font);
        font-weight: 400;
        text-transform: uppercase;
    }


    /* WebKit support */
    /* :global(::-webkit-scrollbar) {
        width: var(--spacing-S);
        min-height: 8px;
        max-height: 20px;
        border:  none;
        border-radius: 0px;
        margin: 0 60px;
        z-index: 1000;
    }

    :global(::-webkit-scrollbar-track) {
        background: transparent;
        max-height: 20px;
        border-radius: 0px;
        margin: 0 60px;
        z-index: 1000;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: white;
        border: none;
        border-radius: 0px;
        width: var(--spacing-S);
        max-height: 20px;
        z-index: 1000;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background-color: #f0f0f0;
    }

    :global(::-webkit-scrollbar-corner) {
        background: transparent;
    } */

    :global(.closing_icon) {
        height: 50px;
        fill: black;
        opacity: 1;
        transform: translateX(-2px) rotate(90deg) ;

        cursor: pointer;
        align-items: center;
        justify-content: center;
        place-self: center;
        background-color: #EAEAEA;

        position: absolute;
        top: 0;
        left: 0;

        border-radius: 0px 5px 0px 0px;
        border-left: solid 0px black;

        padding: 0px;

    }


</style>