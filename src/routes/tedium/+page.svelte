<script>
    import Header from "$lib/components/header.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import Footer from "$lib/components/footer.svelte";

    let {data} = $props()

    let images = $derived(data.media)

</script>

<main class="main_container" data-scroll-container>
    <Header></Header>
    
<section id="tedium_hero" class="fullsize_section">
    <div class="flex flex-col w-[100ch]">
        <div class="bg-white p-4">
            <h1>{@html data.title}</h1>
        </div>
        <div class="flex flex-col gap-2 bg-white p-4 md:w-[80%]">
            <p>{@html data.subtitle}</p>
        </div>
    </div>
</section>
<section class="fullsize_section justify-center h-fit" data-scroll data-scroll-speed=0.03>
    <div class="bg-white p-4 py-6 md:w-2/3 text-xl rounded-xl border-black border-[1px] md:border-0">
        {@html data.description}
    </div>
</section>

<section class="fullsize_section justify-center h-fit">
    <div class="md:p-4 text-xl flex md:flex-row flex-col gap-4 overflow-x-scroll w-fit h-fit justify-start">
        {#each images as image, i}
            <enhanced:img src={image} alt="Tedium img {i}" class="w-fit h-full grayscale md:hover:p-1 hover:grayscale-0"></enhanced:img>
        {/each}
    </div>
</section>
<Footer></Footer>
<Mask></Mask>
<div class="z-[5] h-fit w-full absolute left-0 top-[50%]">
    <img src={CircularLogo}
    alt="Fractal logo"
    class="h-fit w-full">
</div>

</main>




<style>

</style>