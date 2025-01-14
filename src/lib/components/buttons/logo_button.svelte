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
        <img class="logo_container" src={data.expanded_logo} alt="Expanded logo version of EL2MP">

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
            The Écologies des Pratiques project explores the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. Supported by Google through its commitment to advancing ethical and impactful AI practices, this initiative combines cutting-edge technological tools with critical reflection on their implications. <br><br>
            At the heart of this project lies a collaborative and interdisciplinary approach, engaging researchers, practitioners, and students from diverse fields. By experimenting with LLMs, we seek to understand their potential as catalysts for new forms of knowledge production and dissemination while addressing the ecological and ethical questions they raise.
            The project delves into three key areas: <br><br>
            Technological Experimentation: By integrating LLMs into practical workflows, we assess how these tools reshape academic and professional practices. From creative writing to data analysis, the project tests the boundaries of LLMs' generative capabilities.<br><br>
            Critical Reflection: Alongside experimentation, we foster discussions on the broader societal and ecological implications of LLM adoption. What are the costs and benefits of scaling these technologies? How do they challenge or reinforce existing structures of knowledge and power?<br><br>
            Community Building: Through workshops, public events, and collaborative platforms, we aim to build a community of thinkers and makers who can collectively imagine and shape the future of AI-driven practices.<br><br>
            With Google’s support, Écologies des Pratiques not only investigates the possibilities of LLMs but also critically examines their role within contemporary ecological, cultural, and institutional systems. By bridging technological innovation and critical inquiry, this project seeks to illuminate how these powerful tools can contribute responsibly to a sustainable and inclusive future.
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

    



</style>