<script>
    import { scrollStore } from "$lib/stores/globalStores";

    import { pillAnimation } from "$lib/stores/animeJs";
    import tediumVideo from "$lib/media/tedium/TEDIUM_LIGHT.mp4";
    import videoPoster from "$lib/media/tedium/TEDIUM_LIGHT_poster.png";
    import videoIcon from "$lib/media/videoIcon.svg";
    import SectionCard from "$lib/components/section-card.svelte";

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

<section id="tedium_hero" class="fullsize_section hero justify-center">
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
                <p class="text-nowrap uppercase">Read more</p>
            </a>
            <button
                class="pill border-solid"
                onclick={() => scrollStore.scrollTo("#video")}
                use:pillAnimation
            >
                <p class="text-nowrap uppercase">Watch the video</p>
                <img src={videoIcon} alt="" />
            </button>
        </div>
    </div>
</section>
<SectionCard
    title="Is there anything inherently valuable in using large language models
            (LLMs)?"
    question={data.question}
    description={data.description}
    id="abstract"
/>

<section
    class="fullsize_section justify-center h-fit"
    id="gallery"
    data-scroll
    data-scroll-speed="1"
>
    <div
        class="md:p-4 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start"
    >
        {#each images as image, i}
            <enhanced:img
                src={image}
                alt="Tedium img {i}"
                class="w-fit h-full grayscale md:hover:p-1 hover:grayscale-0"
            ></enhanced:img>
        {/each}
    </div>
</section>

<section
    class="fullsize_section justify-center h-fit"
    data-scroll
    data-scroll-speed="0.5"
>
    <div
        class="md:p-4 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start"
        id="video"
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
