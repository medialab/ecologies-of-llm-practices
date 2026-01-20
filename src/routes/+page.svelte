<script>
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import CardCanvas from "$lib/components/cardCanvas.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import { onMount } from "svelte";
    import Lenis from "lenis";

    /** @type {import('./$types').PageProps} */
	let { data } = $props();

    $inspect(Object.values(data.cardsDb))

    const mainButtons = [
        { label: "Read us on Arxiv!", href: "https://arxiv.org/abs/2512.19189" },
        { label: "Artificial Inquiries?", href: "https://hal.science/hal-05327878v2" },
        { label: "Tedium exhibition", href: "https://ecologiesofllm.medialab.sciencespo.fr/tedium" },
    ];

    let expandedSections = $state({});

    function toggleExpand(id) {
        expandedSections[id] = !expandedSections[id];
    }

    onMount(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
    })
</script>



<main class="h-full w-full overflow-y-scroll snap-y snap-mandatory bg-transparent scroll-smooth outline-none">
    <Header></Header>
<Mask></Mask>
    <section class="h-screen w-full bg-transparent relative z-[25] snap-start shrink-0">
        <div class="absolute top-[20%] left-[50%] translate-x-[-50%] flex flex-col gap-0">
            <h1 class="relative z-20 text-center bg-white p-8">No more <i>ordinary</i> <br> work practices?</h1>

            <div class="flex flex-row gap-2 w-full h-fit z-20 justify-center">
                {#each mainButtons as { label, href }}
                    <button class="border-solid hover:border-dashed transition-all duration-300 border-black rounded-2xl border-[1px] flex pt-3 pl-4 pr-4 pb-3 bg-white w-fit" onclick={() => window.open(href, "_blank")}>
                        <p class="text-nowrap uppercase">{label}</p>
                    </button>
                {/each}
            </div>
        </div>
    </section>
    {#await data.alterEgosDb then cardsData}
    {@const usableCards = Object.values(cardsData)}
        {#each usableCards as card, i}
            {#if card?.Title === "Contact" || card?.Title === "Co-Inquirers"}
            <!--eheheheh-->
            {:else}
                <section id={card.Id} class="h-screen w-full bg-transparent relative z-[25] snap-start shrink-0 flex items-center" >
                    <div class="flex flex-row w-full justify-between items-start gap-8 px-12">
                        <div class="flex flex-col gap-2 bg-white p-8 w-2/5">
                            <h1>{card?.Title}</h1>
                        </div>
                        <div class="flex flex-col gap-4 bg-white p-8 w-3/5 max-w-none h-fit">
                            <p class="text-md leading-tight h-fit">
                                {@html card?.Question}
                            </p>
                            <p class="text-xl overflow-hidden transition-[max-height] duration-500 ease-in-out {expandedSections[i] ? 'max-h-[1000px]' : 'max-h-[4em]'}" id="description-{i}">
                                {@html card?.Description}
                            </p>
                            <button onclick={() => toggleExpand(i)}>
                                <p class="text-md cursor-pointer">[{expandedSections[i] ? 'READ LESS' : 'READ MORE'}]</p>
                            </button>
                        </div>
                    </div> 
                </section>
            {/if}
        {/each}
    {/await}
    <div class="z-[5] h-fit w-full absolute left-0 top-[50%]">
    <img src={CircularLogo}
    alt="Fractal logo"
    class="h-fit w-full object-contain">
</div>
<section id="playground" class="w-screen h-screen z-[35] relative overflow-y-visible">
    <CardCanvas data={data}></CardCanvas>
</section>
<Footer></Footer>
</main>

