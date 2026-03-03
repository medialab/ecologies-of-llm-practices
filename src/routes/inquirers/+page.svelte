<script lang="ts">
    import { inquirersAnimation } from "$lib/stores/animeJs";
    import HeroLogo from "$lib/components/hero-logo.svelte";

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

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section justify-center flex-col md:px-20 md:my-0 my-20"
    id="names"
    tabindex="0"
    aria-labelledby="inquirers-h1"
>
    <HeroLogo/>
    <div class="flex flex-row flex-wrap bg-white gap-2 p-4">
        {#each data.data.inquirers as name, i}
            {#if i === data.data.inquirers.length - 1}
                <h2
                    use:inquirersAnimation
                    class="inquirer_name transition-all duration-300 ease-in-out"
                >
                    {name}.
                </h2>
            {:else}
                <h2
                    use:inquirersAnimation
                    class="inquirer_name transition-all duration-300 ease-in-out"
                >
                    {name},
                </h2>
            {/if}
        {/each}
    </div>
</section>
