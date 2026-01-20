<script lang="ts">

    import Logo from "$lib/media/logos/logo_noicon.svg";

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


<header class="w-full h-fit grid items-center justify-between border-b border-[#E5E5E5] border-b-[1px] pl-6 pr-6 pt-3 pb-3 grid-cols-3 grid bg-white z-[40] fixed top-0 left-0" >

    <div id="header_left" class="w-full h-fit col-span-1 flex flex-row gap-2">
        {#each anchors as anchor, i}
            {#if i < 2}
                <a href={anchor.href}>
                    <p>{anchor.label}</p>
                </a>
            {/if}
        {/each}
    </div>
    <a id="header_logo" href="/" class="w-full h-[30px] col-span-1 justify-center">
        <img src={Logo} alt="Ecologies of LLM Logo" class="h-full w-auto">
    </a>
    <div id="header_right" class="w-full h-fit col-span-1 flex flex-row gap-2 justify-end">
        {#each anchors as anchor, i}
            {#if i >= 2}
            <a href={anchor.href} >
                <p>{anchor.label}</p>
            </a>
        {/if}
        {/each}
    </div>
</header>
