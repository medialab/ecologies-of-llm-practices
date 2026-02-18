<script>
    import { scrollStore } from "$lib/stores/globalStores";
    import { pillAnimation } from "$lib/stores/animeJs";

    let { data } = $props();
    const policySections = $derived(Object.values(data.textPolicy ?? {}));
    const stripHtml = (value = "") =>
        value
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = $derived({
        title: "Data Policy - Ecologies of LLM Practices",
        description: stripHtml(data.subtitle ?? ""),
        url: `${baseUrl}/data-policy`,
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

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    id="datapolicy_hero"
    class="fullsize_section justify-center"
    tabindex="0"
    aria-labelledby="datapolicy-h1"
>
    <div class="flex flex-col max-w-[100ch] w-full items-center">
        <div class="bg-white p-4">
            <h1 class="md:text-center text-left" id="datapolicy-h1">
                {@html data.title}
            </h1>
        </div>
        <div class="hero_descr">
            <p class="md:text-center text-left">{@html data.subtitle}</p>
        </div>
        <div class="flex justify-center bg-white p-2 gap-2">
            <a
                use:pillAnimation
                class="pill"
                href="#abstract"
                onclick={() => scrollStore.scrollTo("#abstract")}
            >
                <p class="text-nowrap uppercase">Read the policy</p>
            </a>
        </div>
    </div>
</section>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section justify-center h-fit md:pb-30 pb-12"
    data-scroll
    data-scroll-speed="0.3"
    id="abstract"
    tabindex="0"
    aria-label="Data policy content"
>
    <div class="md:w-2/3 flex flex-col gap-4">
        {#each policySections as section}
            <div
                class="bg-white p-4 rounded-xl border-black border-[1px] md:border-0 flex gap-4 flex-col"
            >
                <h2 class="font-bold">{section.title}</h2>
                <p class="whitespace-pre-line">
                    {@html section.text}
                </p>
            </div>
        {/each}
    </div>
</section>
