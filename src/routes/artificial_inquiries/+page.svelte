<script>
    import { pillAnimation } from "$lib/stores/animeJs";
    import downloadIcon from "$lib/media/downloadIcon.svg";
    import editionsAnnexesIcon from "$lib/media/editionsAnnexesIcon.svg";

    let { data } = $props();

    const subtitle = $derived(data.subtitle)

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = {
        title: "Artificial Inquiries - A Vademecum for Workers in the Age of AI",
        description: subtitle,
        url: `${baseUrl}/artificial_inquiries`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    };

    let images = $derived(data.media ?? []);

    let buttons = [
        {
            label: "Download it on <b>HAL</b>",
            url: "https://hal.science/hal-05327878v2",
            icon: downloadIcon,
        },
        {
            label: "See it on Editions Annexes",
            href: "#",
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

<section
    id="artificial_inquiries_hero"
    class="fullsize_section justify-center"
>
        <div
            class="flex flex-col md:max-w-[100ch] w-full md:items-center items-start"
        >
            <div class="bg-white p-4">
                <h1 class="md:text-center text-left">
                    {@html data.title}
                </h1>
            </div>
            <div class="flex flex-col gap-2 bg-white p-4 md:w-[85ch] justify-center items-center">
                <p class="md:text-center text-left">
                    {@html data.subtitle}
                </p>
            </div>
            <div
                class="flex md:justify-center bg-white p-2 gap-2 flex-col md:flex-row"
            >
                {#each buttons as b}
                    <a
                        use:pillAnimation
                        class="pill border-solid"
                        href={b.href || b.url}
                        target={b.url ? "_blank" : "_self"}
                    >
                        <p class="text-nowrap uppercase">{@html b.label}</p>
                        {#if b.icon}
                            <img src={b.icon} alt="" />
                        {/if}
                    </a>
                {/each}
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
            <h2>A Book Made to Reflect</h2>
            <p class="text-pretty">{@html data.description}</p>
            <enhanced:img src={images[1]} alt="" class="md:p-16 p-4" />
        </div>
    </section>

    <section
        class="fullsize_section justify-center h-fit"
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
    </section>

 
