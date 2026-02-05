<script>
    import { scrollStore } from "$lib/stores/globalStores";
    import { pillAnimation } from "$lib/stores/animeJs";

    let { data } = $props();

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = $derived({
        title: "Data Policy - Ecologies of LLM Practices",
        description: data.subtitle,
        url: `${baseUrl}/datapolicy`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    });
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

<section id="datapolicy_hero" class="fullsize_section justify-center">
    <div class="flex flex-col max-w-[100ch] items-center">
        <div class="bg-white p-4">
            <h1 class="md:text-center text-left">{@html data.title}</h1>
        </div>
        <div class="flex flex-col gap-2 bg-white p-4 md:w-[85ch]">
            <p class="md:text-center text-left">{@html data.subtitle}</p>
        </div>
        <div class="flex justify-center bg-white p-2 gap-2">
            <a
                use:pillAnimation
                class="pill border-solid"
                href="#abstract"
                onclick={() => scrollStore.scrollTo("#abstract")}
            >
                <p class="text-nowrap uppercase">Read the policy</p>
            </a>
        </div>
    </div>
</section>

<section
    class="fullsize_section justify-center h-fit"
    data-scroll
    data-scroll-speed="0.3"
    id="abstract"
>
    <div
        class="bg-white p-4 md:w-2/3 rounded-xl border-black border-[1px] md:border-0 flex flex-col gap-4"
    >
        <h2>Commitment to Privacy</h2>
        <p class="text-xl text-pretty">{@html data.description}</p>
    </div>
</section>
