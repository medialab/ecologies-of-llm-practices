<script>
    export let data
    export let switch_sidebar 
    export let simplebarContainer
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<div class="logo_button open" id="sidebar">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <a class="header_container" on:click={switch_sidebar}>
        <img class="logo_container" src={data.logoImage} alt="Expanded logo version of EL2MP">   
    </a>
    
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_missing_attribute -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    
    <div class="description_scroll"
            bind:this={simplebarContainer}
            data-simplebar
            data-simplebar-auto-hide="false"
            data-section={data.Title}>
        
        <p class="p1">
            {@html data.projectDescription}
        </p>

        <div class="credits_container">
            <a>
                <p class="h4"> Privacy </p>
            </a>

            <a>
                <p class="h4"> Cookie </p>
            </a>
        </div>
    </div>
</div>

<style>

    :global(:root) {
        --transition-times: 1s;
        --transition-curve: ease-in-out
    }

    :global(.header_container) {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        justify-content: space-between;
        width: 20vw;

        transform: translateX(0vw);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.logo_container) {
        width: 100%;
    }

    :global(.logo_button.open) {
        border-radius: 0px 0px 0px 0px;
        top: 0;
        left: 0;

        border: solid 0px black;
        border-right: solid 1px black;

        width: 28vw;
        height: 100%;

        z-index: 200;

        display: flex;
        flex-direction: column;

        padding: var(--spacing-S);
        padding-right: 0px;

        align-items: flex-start;
        gap: var(--spacing-M);

        text-align: left;

        position: relative;
        top: 0;
        left: 0;

        background-color: #EAEAEA;

        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.logo_button.closed) {
        border-radius: 0px 0px 0px 0px;
        border: solid 0px black;
        border-right: solid 1px black;

        top: 0;
        left: 0;

        width: 0vw;
        height: 100%;

        z-index: 200;

        display: flex;
        flex-direction: column;

        padding: var(--spacing-S);

        align-items: flex-start;
        gap: var(--spacing-M);

        text-align: left;

        position: relative;

        background-color: #EAEAEA;

        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.description_scroll) {
        display: flex;
        position: static !important;
        flex-direction: column;
        align-items: flex-start;
        
        gap: var(---spacing-L, 30px);

        align-self: stretch;
        overflow-y: scroll;
        overflow-x: hidden;
        
        padding-right: var(--spacing-M);
        padding-left: var(--spacing-XS);

        height: 100%;
        width: 22vw;

        text-align: justify;
        line-height: 1.5;
        word-wrap: break-word;
        hyphens: auto;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        orphans: 5;
        widows: 5;
        
        transform: translateX(0vw);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.description_scroll .p1) {
        width: 95%;
    }

    :global(.logo_button.closed > .header_container) {
        display: flex;
        transform: translateX(-24vw);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.logo_button.closed > .description_scroll) {
        opacity: 0;
        transform: translateX(-24vw);
        transition: all var(--transition-times) var(--transition-curve);
    }

    :global(.credits_container){
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        align-self: stretch;

        height: auto;
        width: 100%;
    }    

    @media only screen and (max-width: 768px) {
        .logo_button {
            position: fixed;
            top: 0;
            width: 100%;
            border-radius: 0px;
            border-right: 0px;
            border-top: 0px;
            border-bottom: solid 1px black;
            height: max-content; /* Adjust height as needed */
        }

        .description_scroll {
            display: none;
        }

        .header_container {
            width: 80%;
            place-content: center;
            place-self: center;
            padding-top: var(--spacing-S);
            padding-bottom: var(--spacing-S);
        }
    }

    /* Scrollbar stuff */

    :global(.description_scroll [data-simplebar]) {
        position: absolute;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
    }

    :global(.description_scroll .simplebar-wrapper){
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }

    :global(.description_scroll .simplebar-mask) {
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

    :global(.description_scroll .simplebar-offset) {
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

    :global(.description_scroll .simplebar-content-wrapper) {
        direction: inherit;
        box-sizing: border-box !important;
        position: relative;
        display: block;
        height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
        width: 100%;
        max-width: 100%; /* Not required for horizontal scroll to trigger */
        max-height: 100%; /* Needed for vertical scroll to trigger */
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        appearance: none; /* Improves compatibility in some browsers */
        -moz-appearance: none;
        -webkit-overflow-scrolling: touch;
        padding: 0px;
    }

    :global(.description_scroll .simplebar-content-wrapper::-webkit-scrollbar),
    :global(.description_scroll .simplebar-hide-scrollbar::-webkit-scrollbar) {
        display: none;
        width: 0;
        height: 0;
    }

    :global(.description_scroll [data-simplebar]::-webkit-scrollbar) {
        display: none; 
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    :global(.description_scroll .simplebar-content:before),
    :global(.description_scroll .simplebar-content:after) {
        content: ' ';
        display: table;
    }

    :global(.description_scroll .simplebar-placeholder) {
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    :global(.description_scroll .simplebar-height-auto-observer-wrapper) {
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

    :global(.description_scroll .simplebar-height-auto-observer) {
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

    :global(.description_scroll [data-simplebar].simplebar-dragging) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.description_scroll [data-simplebar].simplebar-dragging .simplebar-content) {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.description_scroll [data-simplebar].simplebar-dragging .simplebar-track) {
        pointer-events: all;
    }

    :global(.description_scroll .simplebar-scrollbar) {
        position: absolute;
        left: 0;
        right: 0;
        min-height: 0px !important;
    }

    :global(.description_scroll .simplebar-track){
        z-index: 10;
        height: 100% !important;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: visible;
        margin-left: 0;

        /* dovrebbe definire la traccia */
    }

    :global(.description_scroll .simplebar-scrollbar:before) {
        position: absolute;
        content: '';
        background: white;
        border: solid 1px black;

        border-radius: 0px;
        opacity: 1;

        /* questo verosimilmente controlal la pillola */
    }

    :global(.description_scroll .simplebar-scrollbar.simplebar-visible:before) {
        opacity: 1;
        height: 100%;
        transition-delay: 0s;
        transition-duration: 0s;
        transform: translateX(6px);

        /* THIS */
    }
    
    :global(.description_scroll .simplebar-track.simplebar-vertical) {
        top: 0px;
        height: 100%;
        width: var(--spacing-S);
    }

    :global(.description_scroll .simplebar-track.simplebar-horizontal .simplebar-scrollbar) {
        right: auto;
        left: 0;
        top: 0;
        bottom: 0;
        min-height: 0;
        min-width: 10px;
        width: auto;
    }

    :global(.description_scroll .simplebar-scrollbar:before) {
        top: 0px;
        bottom: 0px;
        left: -10px;
        right: var(--spacing-XS);
        transform: translateY(0px);
    }

    :global(.description_scroll .simplebar-track.simplebar-horizontal) {
        left: 0;
        height: 0px;
    }

    

    /* Rtl support */
    :global(.description_scroll [data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical) {
        right: auto;
        height: 100%;
        left: 0;
    }

    :global(.description_scroll .simplebar-dummy-scrollbar-size) {
        direction: rtl;
        height: 500px;
        position: fixed;
        opacity: 0;
        visibility: hidden;
        width: 500px;
        overflow-y: hidden;
        overflow-x: scroll;
        -ms-overflow-style: scrollbar !important;
    }

    :global(.description_scroll .simplebar-dummy-scrollbar-size > div) {
        width: 200%;
        height: 200%;
        margin: 10px 0;
    }

    :global(.description_scroll .simplebar-hide-scrollbar) {
        position: fixed;
        left: 0;
        visibility: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    
        
</style>