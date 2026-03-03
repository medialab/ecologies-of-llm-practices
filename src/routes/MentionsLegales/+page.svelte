<script lang="ts">
    import { scrollStore } from "$lib/stores/globalStores";
    import { pillAnimation } from "$lib/stores/animeJs";
    import HeroLogo from "$lib/components/hero-logo.svelte";

    let { data } = $props();
    const policySections = $derived(Object.values(data.textPolicy ?? {}));
    const stripHtml = (value = "") =>
        value
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = $derived({
        title: "Mentions legales - Ecologies of LLM Practices",
        description: stripHtml(data.subtitle ?? ""),
        url: `${baseUrl}/MentionsLegales`,
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
        <HeroLogo />
        <div class="bg-white p-4">
            <h1 class="text-responsive-center py-2" id="hero-h1">
                {@html data.title}
            </h1>
        </div>
        <div class="hero_descr">
            <p class="text-responsive-center">{@html data.subtitle}</p>
        </div>
        <div class="flex justify-center bg-white p-2 gap-2">
            <a
                use:pillAnimation
                class="pill"
                href="#abstract"
                onclick={() => scrollStore.scrollTo("#abstract")}
            >
                <p class="label-caps-nowrap">Read all</p>
            </a>
        </div>
    </div>
</section>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section section-fit-center md:pb-30 pb-12 max-w-[60%]"
    data-scroll
    data-scroll-speed="0.3"
    id="abstract"
    tabindex="0"
    aria-label="Mentions legales content"
>
    <div class="md:w-2/3 flex flex-col gap-4">
        {#each policySections as section}
            <div class="content-card">
                <h3 class="font-semibold">{section.title}</h3>
                <p class="whitespace-pre-line">
                    {@html section.text}
                </p>
            </div>
        {/each}
    </div>
</section>

<style>
    :global(.content-card a) {
        text-decoration: underline;
        text-underline-offset: 1px;
        text-underline-position: below;
        text-decoration-thickness: 1px;
    }
</style>
