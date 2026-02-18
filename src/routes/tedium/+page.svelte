<script>
    import { scrollStore } from "$lib/stores/globalStores";

    import { pillAnimation } from "$lib/stores/animeJs";
    import tediumVideo from "$lib/media/tedium/TEDIUM_LIGHT.mov";
    import videoPoster from "$lib/media/tedium/TEDIUM_LIGHT_poster.png";
    import videoIcon from "$lib/media/icons/videoIcon.svg";
    import galleryIcon from "$lib/media/icons/galleryIcon.svg";

    let { data } = $props();

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = {
        title: "Tedium - Archival Exhibition at Hype! Studies",
        description:
            "Tedium is an interactive visual exposition presenting the multimodal archive of Ecologies of LLM Practices, shown at the Hype! Studies conference in Barcelona.",
        url: `${baseUrl}/tedium`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    };

    let images = $derived(data.media);
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
    id="tedium_hero"
    class="fullsize_section justify-center"
    tabindex="0"
    aria-labelledby="tedium-h1"
>
    <div class="flex flex-col max-w-[100ch] w-full md:w-fit md:items-center">
        <div class="bg-white p-4">
            <h1 class="md:text-center text-left" id="tedium-h1">
                {@html data.title}
            </h1>
        </div>
        <div class="hero_descr">
            <p class="md:text-center text-left">{@html data.subtitle}</p>
        </div>
        <div
            class="flex md:justify-center bg-white p-2 gap-2 flex-col md:flex-row w-fit"
        >
            <button
                type="button"
                class="pill"
                onclick={() => scrollStore.scrollTo("#gallery")}
                use:pillAnimation
            >
                <p class="text-nowrap uppercase">Gallery</p>
                <img src={galleryIcon} alt="" aria-hidden="true" />
            </button>
            <a
                use:pillAnimation
                class="pill"
                href="#abstract"
                onclick={() => scrollStore.scrollTo("#abstract")}
            >
                <p class="text-nowrap uppercase">Read more</p>
            </a>
            <button
                type="button"
                class="pill"
                onclick={() => scrollStore.scrollTo("#video")}
                use:pillAnimation
            >
                <p class="text-nowrap uppercase">Watch the video</p>
                <img src={videoIcon} alt="" aria-hidden="true" />
            </button>
        </div>
    </div>
</section>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section justify-center h-fit"
    data-scroll
    data-scroll-speed="0.3"
    id="abstract"
    tabindex="0"
    aria-label="Tedium abstract"
>
    <div
        class="bg-white p-4 md:w-2/3 rounded-xl border-black border-[1px] md:border-0 flex flex-col gap-4"
    >
        <h2>
            {@html data.SubDescription}
        </h2>
        <p class="text-xl text-pretty">{@html data.description}</p>
    </div>
</section>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section justify-center h-fit"
    id="gallery"
    data-scroll
    data-scroll-speed="1"
    tabindex="0"
    aria-label="Tedium gallery"
>
    <div
        class="md:p-20 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start"
    >
        {#each images as image, i}
            <enhanced:img
                src={image}
                alt={`Tedium archive image ${i + 1}`}
                class="w-fit h-full grayscale md:hover:p-1 hover:grayscale-0"
            ></enhanced:img>
        {/each}
    </div>
</section>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section justify-center h-fit"
    data-scroll
    data-scroll-speed="0.5"
    id="video"
    tabindex="0"
    aria-label="Tedium video"
>
    <div
        class="md:p-20 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start"
    >
        <video
            src={tediumVideo}
            controls
            autoplay={false}
            loop={false}
            playsinline
            muted={false}
            poster={videoPoster}
            class="rounded-2xl overflow-clip"
        ></video>
    </div>
</section>
