<script>
    import Header from "$lib/components/header.svelte";

    import Footer from "$lib/components/footer.svelte";
    import { scrollStore } from "$lib/stores/globalStores";

    import { pillAnimation } from "$lib/stores/animeJs";
    import { inquirersAnimation } from "$lib/stores/animeJs";

    let data = $props();
</script>

<main class="main_container" data-scroll-container>
    <Header currentPage="tedium"></Header>

    <section
        id="inquirers_hero"
        class="fullsize_section flex-col items-start md:items-center justify-center mt-48 md:mt-0"
    >
        <div class="flex flex-col md:p-2 p-2 items-center md:w-fit">
            <h1 class="md:text-center text-left md:w-max-content p-4 bg-white">
                This project <i>couldn't have happened</i> <br /><i>without</i> the
                support of all Co-Inquirers
            </h1>
            <p class="md:text-center text-left md:w-[90ch] bg-white p-4">
                Ecologies of LLM Practices is a participatory inquiry that
                explores how people and technologies co-shape one another within
                emerging landscapes of language models. Through a series of
                close collaborations with diverse co-inquirers—artists,
                researchers, developers, and practitioners—the project unfolds
                as a living system of exchanges. Each contributor, by engaging
                with the LLM in their own distinctive way, helped define the
                contours of this research architecture. Their unique usage
                patterns, interpretive gestures, and experimental approaches
                became integral components, revealing how creative agency and
                computational reasoning continuously interlace.
            </p>
            <div class="flex justify-center bg-white p-2 gap-2">
                <a
                    use:pillAnimation
                    class="pill border-solid"
                    href="#names"
                    onclick={() => scrollStore.scrollTo("#names")}
                >
                    <p class="text-nowrap uppercase">Look up their names</p>
                </a>
            </div>
        </div>
    </section>
    <section class="fullsize_section justify-center" id="names">
        <div class="flex flex-row flex-wrap bg-white gap-2 p-2">
            {#each data.data.inquirers as name, i}
                {#if i === data.data.inquirers.length - 1}
                    <h1
                        use:inquirersAnimation
                        id="inquirer_name"
                        class="transition-all duration-300 ease-in-out"
                    >
                        {name}.
                    </h1>
                {:else}
                    <h1
                        use:inquirersAnimation
                        id="inquirer_name"
                        class="transition-all duration-300 ease-in-out"
                    >
                        {name},
                    </h1>
                {/if}
            {/each}
        </div>
    </section>
    <Footer></Footer>
</main>

<style>
    #names > div > h1 {
        opacity: 1;
    }

    #names > div > h1:hover {
        opacity: 1;
    }

    #names > div > h1:not(:hover) {
        opacity: 0.1;
    }
</style>
