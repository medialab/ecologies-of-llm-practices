<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import CardCanvas from "$lib/components/cardCanvas.svelte";
    import TurndownService from "turndown";
    import { slide, fly, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { isPageLoaded } from "$lib/stores/globalStores";
    import { pillAnimation } from "$lib/stores/animeJs";

    /** @type {import('./$types').PageProps} */
    let { data } = $props();

    const mainButtons = [
        {
            label: "Read us on Arxiv!",
            url: "https://arxiv.org/abs/2512.19189",
            status: "new",
        },
        { label: "Tedium exhibition", href: "/tedium" },
        {
            label: "Artificial Inquiries?",
            url: "https://hal.science/hal-05327878v2",
        },
    ];

    import gptLogo from "$lib/media/Gpt.png";
    import mistralLogo from "$lib/media/Mistral.png";
    import claudeLogo from "$lib/media/Claude.svg";
    import deepseekLogo from "$lib/media/DeepSeek.png";
    import { onMount } from "svelte";

    const models = [
        {
            name: "gpt",
            href: "https://chatgpt.com/",
            img: gptLogo,
        },
        {
            name: "mistral",
            href: "https://mistral.ai/",
            img: mistralLogo,
        },
        {
            name: "claude",
            href: "https://claude.com/",
            img: claudeLogo,
        },
        {
            name: "deepseek",
            href: "https://chat.deepseek.com/",
            img: deepseekLogo,
        },
    ];

    type cardValues = {
        Title: string;
        CoverImg: string;
        Id: string;
        Description: string;
        Question: string;
        IndexNum: number;
        bgColor: string;
    };

    const htmlToMd = (html: string): string => {
        const turndownService = new TurndownService({
            emDelimiter: "*",
            strongDelimiter: "**",
        });

        return turndownService.turndown(html);
    };

    function askAI(
        data: string,
        model: "gpt" | "claude" | "mistral" | "deepseek" = "gpt",
    ): void {
        const markDownData = htmlToMd(data);
        const prompt = `Reading the text coming from ${window.location.href}, provide an explanation on what the project is, which are the research questions and the main findings, the team and the project: <content> ${markDownData}</content> `;
        const encoded = encodeURIComponent(prompt);
        const baseUrls = {
            gpt: "https://chat.openai.com",
            claude: "https://claude.ai/new",
            mistral: "https://chat.mistral.ai",
            deepseek: "https://chat.deepseek.com",
        };
        let url = "";

        if (model === "claude") {
            url = `${baseUrls["claude"]}/?q=${encoded}`;
        } else if (model === "mistral") {
            url = `${baseUrls["mistral"]}`;
        } else if (model === "deepseek") {
            url = `${baseUrls["deepseek"]}/?q=${encoded}`;
        } else {
            url = `${baseUrls["gpt"]}/?q=${encoded}`;
        }

        window.open(url, "_blank", "noopener,noreferrer");
    }
</script>

<main class="main_container" id="main" data-scroll-container>
    <Header currentPage="landing"></Header>
    <section
        class="fullsize_section justify-center md:translate-y-[-20%]"
        id="hero_title"
    >
        <div class="flex flex-col md:gap-0 gap-4 w-full md:w-fit">
            <h1
                id="hero-h1"
                class="relative z-20 md:p-6 md:m-0 m-2 p-2 text-center bg-white"
            >
                No more <i>ordinary</i> <br /> work practices?
            </h1>

            <div
                class="flex md:flex-row flex-col w-full h-fit z-20 justify-center items-center"
            >
                {#each mainButtons as { label, href, url, status }, i}
                    {#if $isPageLoaded}
                        {@const showLabel = true}
                        <div
                            class="flex justify-center bg-white p-2 relative overflow-visible"
                        >
                            {#if status === "new" && $isPageLoaded}
                                <svg
                                    width="10%"
                                    height="100%"
                                    overflow="visible"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="absolute right-0 top-0 z-[3]"
                                >
                                    <circle
                                        transition:fade={{
                                            duration: 600,
                                            easing: cubicInOut,
                                            delay: 700,
                                        }}
                                        cx="36%"
                                        cy="20%"
                                        r="7"
                                        fill="oklch(62.3% 0.214 259.815)"
                                        stroke="black"
                                        stroke-width="1"
                                    />
                                </svg>
                            {/if}
                            <a
                                use:pillAnimation
                                transition:slide={{
                                    duration: 600,
                                    easing: cubicInOut,
                                    delay: 100 * i,
                                }}
                                class="pill relative border-solid"
                                href={href || url}
                                target={url ? "_blank" : "_self"}
                            >
                                {#if showLabel}
                                    <p
                                        transition:fade={{
                                            duration: 600,
                                            easing: cubicInOut,
                                            delay: 300,
                                        }}
                                        class="text-nowrap uppercase"
                                    >
                                        {label}
                                    </p>
                                {/if}
                            </a>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </section>
    {#await data.alterEgosDb then cardsData}
        {@const usableCards: cardValues[]  = Object.values(cardsData)}
        {#each usableCards as card, i}
            {#if card?.Title !== "Contact" && card?.Title !== "Co-Inquirers"}
                <section
                    id={card.Id}
                    class="fullsize_section"
                    data-scroll
                    data-scroll-speed="0.1"
                    data-scroll-call="cardInView"
                >
                    <div
                        class="bg-white md:bg-transparent flex md:flex-row flex-col w-full justify-between items-start md:gap-6 gap-2 md:px-12 border-solid md:border-none border-black border rounded-xl md:p-6 px-2 py-4 transition-all duration-200 ease-in-out opacity"
                        id="single_card"
                    >
                        <div
                            class="flex flex-col gap-2 md:bg-white md:w-2/5 w-full md:p-4"
                        >
                            <h1>{card?.Title}</h1>
                        </div>
                        <div
                            class="flex flex-col gap-4 md:bg-white md:w-3/5 w-full max-w-none h-fit md:p-4"
                        >
                            <p class="text-sm h-fit text-gray-500">
                                {@html card?.Question}
                            </p>
                            <p
                                class="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                                id="description-{i}"
                            >
                                {@html card?.Description}
                            </p>
                            <div
                                class="flex flex-row md:gap-1 gap-2 flex-wrap h-[30px]"
                            >
                                {#each models as { name, img }, i}
                                    <button
                                        use:pillAnimation
                                        class="pill px-4 py-1 flex flex-row gap-2 items-center h-full group"
                                        onclick={() =>
                                            askAI(
                                                card?.Description,
                                                name as
                                                    | "gpt"
                                                    | "claude"
                                                    | "mistral",
                                            )}
                                    >
                                        <p
                                            class="text-nowrap uppercase hidden group-hover:block group-transition-delay-300 group-active:block transition-all duration-500 ease-in-out"
                                        >
                                            Ask
                                        </p>
                                        <img
                                            src={img}
                                            alt="{name} logo"
                                            class="h-5 w-5"
                                        />
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}
        {/each}
    {/await}

    <section
        id="playground"
        class="w-screen h-screen z-[35] relative overflow-y-visible"
        data-scroll
        data-scroll-speed="0.5"
    >
        <CardCanvas {data}></CardCanvas>
    </section>
    <Footer></Footer>
</main>

<style>
    main {
        scroll-timeline-name: --main-scroll;
    }
</style>
