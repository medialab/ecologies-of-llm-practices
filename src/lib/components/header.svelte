<script lang="ts">

    import Logo from "$lib/media/logos/logo_noicon.svg";
    import BurgerIcon from "$lib/media/burgerIcon.svg";
    import { lenisStore } from "$lib/stores/globalStores"

    const anchors = [
        {
            label: "PROJECT",
            href: "#project"
        },
        {
            label: "OBJECTIVE",
            href: "#objective"
        },
        {
            label: "METHODOLOGY",
            href: "#methodology"
        },
        {
            label: "PLAYGROUND",
            href: "#playground"
        }
    ]

</script>


<header class="w-full h-fit items-center justify-between border-[#E5E5E5] border-b-[1px] md:pl-6 md:pr-6 p-3 md:grid-cols-3 grid-cols-2 grid bg-white z-[40] fixed top-0 left-0" >

    <div id="header_left" class="w-full h-fit col-span-1 md:flex flex-row gap-2 hidden">
        {#each anchors as anchor, i}
            {#if i < 2}
                <button onclick={() => $lenisStore.scrollTo(anchor.href)}>
                    <p>{anchor.label}</p>
                </button>
            {/if}
        {/each}
    </div>
    <a id="header_logo" href="/" class="w-full h-[30px] col-span-1 justify-center">
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto">
    </a>
    <div id="header_right" class="w-full h-fit col-span-1 flex flex-row gap-2 justify-end">
        {#each anchors as anchor, i}
            {#if i >= 2}
                <button onclick={() => $lenisStore.scrollTo(anchor.href)}>
                    <p>{anchor.label}</p>
                </button>
            {/if}
        {/each}
        <img src={BurgerIcon} alt="Burger Menu" class="h-full w-auto md:hidden" id="burger_menu">
    </div>
</header>
