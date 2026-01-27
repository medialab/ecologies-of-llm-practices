<script>
    import Header from "$lib/components/header.svelte";
    import Mask from "$lib/components/mask.svelte";
    import CircularLogo from "$lib/media/CIRCULAR.png";
    import Footer from "$lib/components/footer.svelte";

    let data = $props()
</script>

<main class="main_container" data-scroll-container>
    <Header></Header>

<section id="inquirers_hero" class="fullsize_section flex-col items-start md:justify-center justify-start mt-48 md:mt-0">
    <div class="flex flex-col gap-4 md:p-2 p-4 bg-white md:w-2/3">
        <h2 class="w-fit">This project <i>could happen</i> <br><i>thanks</i> to all Co-Inquirers</h2>
        <div class="flex flex-row flex-wrap bg-white gap-2">
                {#each data.data.inquirers as name}
                    <p class="text-xl w-fit">{name}</p>
                {/each}
        </div>
    </div>
</section>

<Mask></Mask>
<Footer></Footer>

<div class="z-[5] h-screen w-auto absolute left-0 top-0 overflow-hidden">
    <img src={CircularLogo}
    alt="Fractal logo"
    class="h-fit w-full">
</div>

</main>




<style>

</style>