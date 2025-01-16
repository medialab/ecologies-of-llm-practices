<script>
    export let data
    export let switch_sidebar 
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<div class="logo_button open" id="sidebar">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <a class="header_container" on:click={switch_sidebar}>
        <img class="logo_container" src={data.logoImage} alt="Expanded logo version of EL2MP">

        <!-- <div class="closing_icon">
            <svg
                width="50px"
                height="50px"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960">
                <path d="M480-154.15 328.62-305.54l26.3-26.31L480-206.77l125.08-125.08 26.3 26.31L480-154.15ZM354.92-628.46l-26.3-26.31L480-806.15l151.38 151.38-26.3 26.31L480-753.54 354.92-628.46Z"/>
            </svg>
        </div> -->
        
    </a>
    
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_missing_attribute -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    
    <div class="description_scroll">
        
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
        
        transform: translateX(0vw);
        transition: all var(--transition-times) var(--transition-curve);
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
        

</style>