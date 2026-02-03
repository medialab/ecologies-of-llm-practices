<script>
    import { scrollStore } from "$lib/stores/globalStores";
    import { researchTeam } from "$database/global_db.js";

    import { pillAnimation } from "$lib/stores/animeJs";
    import { inquirersAnimation } from "$lib/stores/animeJs";

    let data = $props();

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = {
        title: "Co-Inquirers and Research Team - Ecologies of LLM Practices",
        description:
            "Meet the co-inquirers and research team who shaped the Ecologies of LLM Practices participatory inquiry into LLMs and work.",
        url: `${baseUrl}/inquirers`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    };

    const buttons = [
        {
            label: "Their names",
            href: "#names",
        },
        {
            label: "Research team",
            href: "#research_team",
        },
    ];
</script>

<svelte:head>
    <title>{meta.title}</title>
    <link rel="canonical" href={meta.url} />
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={meta.url} />
    <meta property="og:image" content={meta.image} />
    <meta property="og:image:alt" content={meta.imageAlt} />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
    <meta name="twitter:image:alt" content={meta.imageAlt} />
</svelte:head>

<section
    id="inquirers_hero"
    class="fullsize_section hero flex-col items-start md:items-center justify-center mt-48 md:mt-0"
>
    <div class="flex flex-col md:p-2 p-2 items-center md:w-fit w-full">
        <h1 class="md:text-center text-left md:w-max-content p-4 bg-white">
            This project <i>couldn't have happened</i> <br /><i>without</i> the support
            of all Co-Inquirers
        </h1>
        <p class="md:text-center text-left md:w-[90ch] bg-white p-4">
            Ecologies of LLM Practices is a participatory inquiry that explores
            how people and technologies co-shape one another within emerging
            landscapes of language models. Through a series of close
            collaborations with diverse co-inquirers—artists, researchers,
            developers, and practitioners—the project unfolds as a living system
            of exchanges. Each contributor, by engaging with the LLM in their
            own distinctive way, helped define the contours of this research
            architecture. Their unique usage patterns, interpretive gestures,
            and experimental approaches became integral components, revealing
            how creative agency and computational reasoning continuously
            interlace.
        </p>
        <div class="flex justify-center bg-white p-2 gap-2">
            {#each buttons as { label, href }}
                <a
                    use:pillAnimation
                    class="pill border-solid"
                    {href}
                    onclick={() => scrollStore.scrollTo(href)}
                >
                    <p class="text-nowrap uppercase">{label}</p>
                </a>
            {/each}
        </div>
    </div>
</section>
<section class="fullsize_section justify-center flex-col" id="names">
    <p class="bg-white p-4 text-center">The co-inquirers</p>
    <div class="flex flex-row flex-wrap bg-white gap-2 p-4">
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
<section class="fullsize_section justify-center flex-col" id="research_team">
    <p class="bg-white p-4 text-center">The research team</p>
    <div class="flex flex-row flex-wrap bg-white gap-2 p-4">
        {#each researchTeam as { name, role, url }, i}
            {#if i === researchTeam.length - 1}
                <a href={url} target="_blank">
                    <h1
                        use:inquirersAnimation
                        id="inquirer_name"
                        class="transition-all duration-300 ease-in-out"
                    >
                        {name}.
                    </h1>
                </a>
            {:else}
                <a href={url} target="_blank">
                    <h1
                        use:inquirersAnimation
                        id="inquirer_name"
                        class="transition-all duration-300 ease-in-out"
                    >
                        {name},
                    </h1>
                </a>
            {/if}
        {/each}
    </div>
</section>
