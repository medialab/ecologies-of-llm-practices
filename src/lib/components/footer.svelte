<script>
    import footerLogo from "$lib/media/logos/logo_complete.svg";
    import googleSupport from "$lib/media/logos/google_support.svg";

    const footerSections = [
        {
            title: "With support from:",
            links: [
                {
                    label: "Google",
                    img: googleSupport,
                    url: "https://www.google.org/intl/en_us/",
                },
            ],
        },
        {
            title: "Research Team:",
            links: [
                {
                    label: "Donato Ricci",
                    url: "https://medialab.sciencespo.fr/en/people/donato-ricci/",
                },
                {
                    label: "Gabriel Alcaras",
                    url: "https://medialab.sciencespo.fr/en/people/gabriel-alcaras/",
                },
                {
                    label: "Tommaso Prinetti",
                    url: "https://medialab.sciencespo.fr/en/people/tommaso-prinetti/",
                },
                {
                    label: "Zoé de Vries",
                    url: "https://medialab.sciencespo.fr/en/people/zoe-de-vries/",
                },
            ],
        },
        {
            title: "The project:",
            links: [
                { label: "Data Policy", href: "/data-policy" },
                {
                    label: "Artificial Inquiries?",
                    url: "https://hal.science/hal-05327878v2",
                },
                {
                    label: "Configuration work",
                    url: "https://arxiv.org/abs/2512.19189",
                },
                { label: "Co-Inquirers", href: "/inquirers" },
            ],
        },
    ];
</script>

<footer
    class="relative z-40 flex mt-24 h-fit w-full flex-col md:gap-0 gap-12 border-t border-[#D9D9D9] bg-white px-4 pb-4 pt-8 rounded-t-[20px] rounded-r-[20px] bottom-0"
>
    <div
        class="w-full md:h-[200px] h-fit flex md:flex-row flex-col gap-12 justify-space-between"
    >
        <div class="md:w-2/3 w-full">
            <p class="text-lg">
                We would like to thank all co-inquirers who took part in our protocol. <br> Without their participation, our project could not have been developed. <br> The link is on 
                <a
                    href="/inquirers"
                    class="underline hover:text-blue-500 hover:cursor-pointer"
                >
                    co-inquirers.</a
                >
            </p>
        </div>
        <div
            class="md:w-1/3 w-full flex flex-row gap-6 md:justify-end justify-space-between"
        >
            {#each footerSections as section}
                <div class="flex flex-col w-fit md:pr-4 md:gap-1 gap-0">
                    <p class="font-medium pb-2">{section.title}</p>
                    {#each section.links as link}
                        {#if link.isButton}
                            <button
                                class="flex flex-col gap-1 items-start text-left"
                            >
                                {#if link.img}
                                    <img src={link.img} alt={link.label} />
                                {:else}
                                    <p>{link.label}</p>
                                {/if}
                            </button>
                        {:else}
                            <a
                                href={link?.href || link?.url}
                                target={link?.url ? "_blank" : "_self"}
                            >
                                {#if link.img}
                                    <img src={link.img} alt={link.label} />
                                {:else}
                                    <p>{link.label}</p>
                                {/if}
                            </a>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <div class="w-full h-auto opacity-1">
        <img
            src={footerLogo}
            alt="Ecologies of LLM Logo"
            class="w-full h-auto"
        />
    </div>
</footer>

<style>
    footer {
        position: relative;
        animation: slide-up linear;
        animation-timeline: scroll(root block);
        animation-range: entry 100%; /* Starts exactly at 100% scroll */
        animation-delay: 1s; /* 1s delay after trigger */
    }

    @keyframes slide-up {
        0% {
            transform: translateY(500px);
        }
        89% {
            transform: translateY(500px);
        }
        90% {
            transform: translateY(0);
        }
    }
</style>
