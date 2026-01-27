<script>
    import Header from "$lib/components/header.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";

    let {data} = $props()

    let images = $derived(data.media)
    console.log("images", images)

</script>

<main class="main_container" data-scroll-container>
    <Header></Header>
    
<section id="tedium_hero" class="fullsize_section">
    <div class="flex flex-col w-[100ch]">
        <div class="bg-white p-4">
            <h1>{@html data.title}</h1>
        </div>
        <div class="flex flex-col gap-2 bg-white p-4 w-[80%]">
            <p>{@html data.subtitle}</p>
        </div>
    </div>
</section>
<section class="fullsize_section justify-center" data-scroll data-scroll-speed=0.03>
    <div class="bg-white p-4 w-2/3 text-xl">
        {@html data.description}
    </div>
</section>

<section class="fullsize_section justify-center">
    <div class="p-4 text-xl flex md:flex-row flex-col md:gap-4 gap-2 overflow-x-scroll w-fit h-full">
        {#each images as image, i}
            <enhanced:img src={image} alt="Tedium img {i}" class="w-fit h-full grayscale hover:p-1 hover:grayscale-0"></enhanced:img>
        {/each}
    </div>
</section>

<Mask></Mask>
<div class="z-[5] h-fit w-full absolute left-0 top-[50%]">
    <img src={CircularLogo}
    alt="Fractal logo"
    class="h-fit w-full">
</div>

</main>




<style>

</style>