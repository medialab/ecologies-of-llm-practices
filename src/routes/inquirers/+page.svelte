<script>
    import Header from "$lib/components/header.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";

    let data = $props()
</script>

<main class="main_container" data-scroll-container>
    <Header></Header>

<section id="tedium_hero" class="fullsize_section  h-fit align-start flex flex-col p-[80px]">
    <div class="flex flex-col max-w-[60ch] gap-4 p-4 items-center bg-white text-center mt-12">
        <p>We would like to thank all co-inquirers who took part in our protocol. <br> Without their participation, our project could not have been developed</p>
    </div>
    <div class="flex flex-col w-full flex-wrap gap-2 pt-11 items-start">
            {#each data.data.inquirers as name}
            <div class="w-full items-center flex justify-center">
                <h2 class="w-fit bg-white capitalize">{name}</h2>
                </div>  
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