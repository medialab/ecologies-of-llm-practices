<script>
    import { scrollStore } from "$lib/stores/globalStores";

    import { pillAnimation } from "$lib/stores/animeJs";
    import tediumVideo from "$lib/media/tedium/TEDIUM_LIGHT.mp4";
    import videoPoster from "$lib/media/tedium/TEDIUM_LIGHT_poster.png";
    import videoIcon from "$lib/media/videoIcon.svg";

    let { data } = $props();

    let images = $derived(data.media);
</script>

<section id="tedium_hero" class="fullsize_section justify-center">
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
<section
    class="fullsize_section justify-center h-fit"
    data-scroll
    data-scroll-speed="0.3"
    id="abstract"
>
    <div
        class="bg-white p-4 md:w-2/3 rounded-xl border-black border-[1px] md:border-0 flex flex-col gap-4"
    >
        <h2>
            Is there anything inherently valuable in using large language models
            (LLMs)?
        </h2>
        <p class="text-xl text-pretty">{@html data.description}</p>
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
