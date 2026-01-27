<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import CardCanvas from "$lib/components/cardCanvas.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import TurndownService from "turndown";

    /** @type {import('./$types').PageProps} */
	let { data } = $props();

    //$inspect(Object.values(data.cardsDb))

    const mainButtons = [
        { label: "Read us on Arxiv!", href: "https://arxiv.org/abs/2512.19189" },
        { label: "Tedium exhibition", href: "/tedium" },
        { label: "Artificial Inquiries?", href: "https://hal.science/hal-05327878v2" },
    ];

    import gptLogo from "$lib/media/Gpt.png"
    import mistralLogo from "$lib/media/Mistral.png"
    import claudeLogo from "$lib/media/Claude.svg"

    const models = [
        {
            name: "gpt", href: "https://chatgpt.com/", img: gptLogo,
        },
        {
            name: "mistral", href: "https://mistral.ai/", img: mistralLogo,
        },
        {
            name: "claude", href: "https://claude.com/", img: claudeLogo,
        },
    ]

    type cardValues = {
        Title: string,
        CoverImg: string,
        Id: string,
        Description: string,
         Question: string,
        IndexNum: number,
        bgColor: string,
    }

    const htmlToMd = (html: string): string => {
        const turndownService = new TurndownService({
            emDelimiter: '*',
            strongDelimiter: '**'
        });

        return turndownService.turndown(html);
    };

    function askAI(data: string, model: 'gpt' | 'claude' | 'mistral' = 'gpt'): void {
        const markDownData = htmlToMd(data);
        const prompt = `Analyze the data coming from ${window.location.href}: ${markDownData} `;
        const encoded = encodeURIComponent(prompt);
        const baseUrls = {
            gpt: 'https://chat.openai.com',
            claude: 'https://claude.ai/new',
            mistral: 'https://chat.mistral.ai'
        };
        let url = ""

        if (model === 'claude') {
            url = `${baseUrls['claude']}/?q=${encoded}`;
        } else if (model === 'mistral') {
            url = `${baseUrls['mistral']}`;
        } else {
            //fallback to gpt
            url = `${baseUrls['gpt']}/?q=${encoded}`;
        }
        
        window.open(url, '_blank', 'noopener,noreferrer');
    };



    
</script>

<main class="main_container" 
id="main" data-scroll-container>
<Header></Header>
<Mask></Mask>
    <section class="fullsize_section justify-center" id="hero_title">
        <div class="flex flex-col md:gap-0 gap-4 w-full md:w-fit">
            <h1 class="relative z-20 bg-white md:p-6 md:m-0 m-2 p-2 text-center ">No more <i>ordinary</i> <br> work practices?</h1>

            <div class="flex md:flex-row flex-col gap-2 w-full h-fit z-20 justify-center items-center">
                {#each mainButtons as { label, href }}
                    <button class="pill" onclick={() => window.open(href, "_blank")}>
                        <p class="text-nowrap uppercase">{label}</p>
                    </button>
                {/each}
            </div>
        </div>
    </section>
    {#await data.alterEgosDb then cardsData}
    {@const usableCards: cardValues[]  = Object.values(cardsData)}
        {#each usableCards as card, i}
            {#if card?.Title !== "Contact" && card?.Title !== "Co-Inquirers"}
                <section id={card.Id} class="md:h-screen h-fit w-full bg-transparent relative z-[25] snap-start shrink-0 flex items-center md:px-0 px-4 md:bg-transparent bg-white"
                data-scroll data-scroll-speed="0.1">
                    <div class="flex md:flex-row flex-col w-full justify-between items-start md:gap-6 gap-2 md:px-12 border-solid md:border-none border-black border rounded-xl md:p-6 px-2 py-4 " id="single_card">
                        <div class="flex flex-col gap-2 md:bg-white md:w-2/5 w-full md:p-4">
                            <h1>{card?.Title}</h1>
                        </div>
                        <div class="flex flex-col gap-4 md:bg-white md:w-3/5 w-full max-w-none h-fit md:p-4">
                            <p class="text-sm h-fit text-gray-500">
                                {@html card?.Question}
                            </p>
                            <p class=" overflow-hidden transition-[max-height] duration-500 ease-in-out" id="description-{i}">
                                {@html card?.Description}
                            </p>
                            <div class="flex flex-row md:gap-1 gap-2 flex-wrap">
                                {#each models as {name, img}, i}
                                    <button class="pill px-4 py-1 flex flex-row gap-2 items-center" onclick={() => askAI(card?.Description, name as 'gpt' | 'claude' | 'mistral')}>
                                        <p class="text-nowrap uppercase">Ask {name}</p>
                                        <img src={img} alt="{name} logo" class="h-4 w-4">
                                    </button>
                                {/each}
                            </div>
                           
                        </div>
                    </div> 
                </section>
            {/if}
        {/each}
    {/await}
    <div class="z-[5] h-fit w-full absolute left-0 top-[50%]">
    <img src={CircularLogo}
    alt="Fractal logo"
    class="h-fit w-full"
    data-scroll data-scroll-speed="0.1">
</div>
<section id="playground" class="w-screen h-screen z-[35] relative overflow-y-visible" data-scroll data-scroll-speed="1">
    <CardCanvas data={data}></CardCanvas>
</section>
<Footer></Footer>
</main>

<style>
    main {
        scroll-timeline-name: --main-scroll;
    }
</style>