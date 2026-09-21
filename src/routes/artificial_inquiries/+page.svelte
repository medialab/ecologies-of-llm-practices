<script lang="ts">
    import { pillAnimation } from "$lib/stores/animeJs";
    import downloadIcon from "$lib/media/icons/downloadIcon.svg";
    import editionsAnnexesIcon from "$lib/media/icons/editionsAnnexesIcon.svg";
    import HeroLogo from "$lib/components/hero-logo.svelte";
    import type { PageData } from "$lib/stores/types";

    let { data }: { data: PageData } = $props();

    const stripHtml = (value = "") =>
        value
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    const subtitle = $derived(stripHtml(data.subtitle ?? ""));

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = $derived({
        title: "Artificial Inquiries - A Vademecum for Workers in the Age of AI",
        description: subtitle,
        url: `${baseUrl}/artificial_inquiries`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    });

    let images = $derived(data.media ?? []);

    let buttons = [
        {
            label: "Download it on <b>HAL</b>",
            url: "https://hal.science/hal-05327878v2",
            icon: downloadIcon,
        },
        {
            label: "See it on Editions Annexes",
            url: "https://medialab.github.io/editions-annexes/editions/Artificial%20Inquiries",
            icon: editionsAnnexesIcon,
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
    id="artificial_inquiries_hero"
    class="fullsize_section justify-center"
    tabindex="0"
    aria-labelledby="artificial-inquiries-h1"
>
    <div
        class="flex flex-col md:max-w-[100ch] w-full md:items-center items-start"
    > <HeroLogo/>   
        <div class="bg-white p-4">
            <h1 class="text-responsive-center py-2" id="hero-h1">
                {@html data.title}
            </h1>
        </div>
        <div class="hero_descr">
            <p class="text-responsive-center">
                {@html data.subtitle}
            </p>
        </div>
        <div
            class="cta-row-responsive"
        >
            {#each buttons as b}
                <a
                    use:pillAnimation
                    class="pill"
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p class="label-caps-nowrap">{@html b.label}</p>
                    {#if b.icon}
                        <img src={b.icon} alt="" aria-hidden="true" />
                    {/if}
                </a>
            {/each}
        </div>
    </div>
</section>

<!--<section
        class="fullsize_section section-fit-center"
        data-scroll
        data-scroll-speed="0.3"
        id="abstract"
    >
        <div
            class="content-card md:w-2/3"
        >
            <h2>A Book Made to Reflect</h2>
            <p>{@html data.description}</p>
            <enhanced:img src={images[1]} alt="" class="md:p-16 p-4" />
        </div>
    </section>

    <section
        class="fullsize_section section-fit-center"
        id="gallery"
        data-scroll
        data-scroll-speed="1"
    >
        <div
            class="md:p-4 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start"
        >
            <enhanced:img
                src={images[0]}
                alt="Artificial inquiries img"
                class="w-fit h-full grayscale md:hover:p-1 hover:grayscale-0 p-4 bg-white"
            ></enhanced:img>
        </div>
    </section>-->
