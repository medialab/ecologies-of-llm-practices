<script lang="ts">

    import Logo from "$lib/media/logos/logo_noicon.svg";
    import BurgerIcon from "$lib/media/burgerIcon.svg";
    import CloseIcon from "$lib/media/CloseIcon.svg";
    import { scrollStore } from "$lib/stores/globalStores"
    import { burgerOpen } from "$lib/stores/globalStores"
    import Burger from "$lib/components/burger.svelte"
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

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

    const switchBurger = () => {
        $burgerOpen = !$burgerOpen
    }

</script>


<header class="w-full h-fit items-center justify-between border-[#E5E5E5] border-b-[1px] md:pl-6 md:pr-6 p-3 md:grid-cols-3 grid-cols-2 grid bg-white z-[160] fixed top-0 left-0" >

    <div id="header_left" class="w-full h-fit col-span-1 md:flex flex-row gap-2 hidden">
        {#each anchors as anchor, i}
            {#if i < 2}
                <button onclick={() => $scrollStore.scrollTo(anchor.href)}>
                    <p>{anchor.label}</p>
                </button>
            {/if}
        {/each}
    </div>
    <a id="header_logo" href="/" onclick={() => { $scrollStore.scrollTo("#main"); $burgerOpen = false; }} class="w-full h-[30px] col-span-1 flex justify-center">
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto">
    </a>
    <div id="header_right" class="w-full md:h-fit h-[28px] col-span-1 flex flex-row gap-2 justify-end ">
        {#each anchors as anchor, i}
            {#if i >= 2}
                <button onclick={() => $scrollStore.scrollTo(anchor.href)} class="hidden md:flex">
                    <p>{anchor.label}</p>
                </button>
            {/if}
        {/each}
        <button class="h-full w-auto aspect-square cursor-pointer p-1" onclick={switchBurger} >
            {#if $burgerOpen}
                <img src={CloseIcon} alt="Burger Menu" class="h-full w-auto md:hidden" id="burger_menu" transition:slide={{duration: 200, easing: cubicInOut, axis: "y"}}>
            {:else}
                <img src={BurgerIcon} alt="Burger Menu" class="h-full w-auto md:hidden" id="burger_menu" transition:slide={{duration: 200, easing: cubicInOut, axis: "y"}}>
            {/if}
        </button>
    </div>
</header>

<Burger></Burger>
