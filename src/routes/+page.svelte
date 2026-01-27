<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import CardCanvas from "$lib/components/cardCanvas.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import TurndownService from "turndown";
    import { slide, fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    /** @type {import('./$types').PageProps} */
	let { data } = $props();

    //$inspect(Object.values(data.cardsDb))

    const mainButtons = [
        { label: "Read us on Arxiv!", url: "https://arxiv.org/abs/2512.19189" },
        { label: "Tedium exhibition", href: "/tedium" },
        { label: "Artificial Inquiries?", url: "https://hal.science/hal-05327878v2" },
    ];

    import gptLogo from "$lib/media/Gpt.png"
    import mistralLogo from "$lib/media/Mistral.png"
    import claudeLogo from "$lib/media/Claude.svg"
    import { onMount } from "svelte";

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

    import { tick } from 'svelte';
    import { createTimeline, stagger, splitText } from 'animejs';

    let loaded = $state(false);

    const setUpheroAnimation = () => {
        const { words, chars } = splitText('#hero_title h1', {
            words: { wrap: 'visible', class: 'split-word' },
            chars: true,
        });

        createTimeline({
            loop: false,
            defaults: { ease: 'inOut(3)', duration: 1200 }
        }).add(words, {
        y: [$el => +$el.dataset.line % 2 ? '135%' : '-135%', '0%'],
        }, stagger(50)).init();

        setTimeout(() => {
            loaded = true;
            setUpButtonAnimation();
        }, 1200);
    }

    const setUpButtonAnimation = () => {
        const pills = document.querySelectorAll('.pill');
        
        pills.forEach(pill => {
            const text = pill.querySelector('p');
            if (!text) return;

            const { chars } = splitText(text, {
                chars: {
                    wrap: 'clip',
                    class: 'split-word',
                    clone: 'bottom'
                },
                includeSpaces: true,
            });

            const tl = createTimeline({
                loop: false,
                autoplay: false,
                defaults: {
                    duration: 200,
                    ease: 'inOut(2)'
                }
            }).add(chars, {
                y: '-100%',
            }, stagger(50, { from: 'center' }));

            pill.addEventListener('mouseenter', () => tl.play());
            pill.addEventListener('mouseleave', () => {
                tl.reverse();
                tl.seek(0);
            });
        });
    }

    onMount(async () => {
        await tick();
        setUpheroAnimation();
    })
</script>

<main class="main_container" 
id="main" data-scroll-container>
<Header></Header>
<Mask></Mask>
    <section class="fullsize_section justify-center" id="hero_title">
        <div class="flex flex-col md:gap-0 gap-4 w-full md:w-fit">
            <h1 class="relative z-20 md:p-6 md:m-0 m-2 p-2 text-center overflow-clip bg-white">No more <i>ordinary</i> <br> work practices?</h1>

            
                <div class="flex md:flex-row flex-col gap-2 w-full h-fit z-20 justify-center items-center">
                    
                        {#each mainButtons as { label, href, url }, i}
                            {#if loaded}
                                <a transition:slide={{duration: 600, easing: cubicInOut, delay: 100*i}} class="pill" href={href || url} target={url ? "_blank" : "_self"}>
                                    <p class="text-nowrap uppercase">{label}</p>
                                </a>
                            {/if}
                        {/each}
                   
                </div>
           
        </div>
    </section>
    {#await data.alterEgosDb then cardsData}
    {@const usableCards: cardValues[]  = Object.values(cardsData)}
        {#each usableCards as card, i}
            {#if card?.Title !== "Contact" && card?.Title !== "Co-Inquirers"}
                <section id={card.Id} class="md:h-screen h-fit w-full bg-transparent relative z-[25] snap-start shrink-0 flex items-center md:px-0 px-4 md:bg-transparent bg-white"
                data-scroll data-scroll-speed="0.1"
                data-scroll-call="cardInView">
                    <div class="flex md:flex-row flex-col w-full justify-between items-start md:gap-6 gap-2 md:px-12 border-solid md:border-none border-black border rounded-xl md:p-6 px-2 py-4 transition-all duration-200 ease-in-out opacity"
                    id="single_card"
                >
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
<section id="playground" class="w-screen h-screen z-[35] relative overflow-y-visible" data-scroll data-scroll-speed="0.5">
    <CardCanvas data={data}></CardCanvas>
</section>
<Footer></Footer>
</main>

<style>
    main {
        scroll-timeline-name: --main-scroll;
    }
</style>