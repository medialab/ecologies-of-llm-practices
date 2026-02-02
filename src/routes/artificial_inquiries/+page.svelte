<script>
    import { pillAnimation } from "$lib/stores/animeJs";
    import downloadIcon from "$lib/media/downloadIcon.svg";
    import editionsAnnexesIcon from "$lib/media/editionsAnnexesIcon.svg";

    let { data } = $props();

    let images = $derived(data.media ?? []);

    let buttons = [
        {
            label: "Download it on <b>HAL</b>",
            url: "https://hal.science/hal-04434497",
            icon: downloadIcon,
        },
        {
            label: "See it on Editions Annexes",
            href: "#",
            icon: editionsAnnexesIcon,
        },
    ];
</script>

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
            <div class="flex flex-col gap-2 bg-white p-4 md:w-[85ch]">
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

 
