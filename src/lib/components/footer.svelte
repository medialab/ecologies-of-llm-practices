<script lang="ts">
    import footerLogo from "$lib/media/logos/logo_complete.svg";
    import googleSupport from "$lib/media/logos/google_support.svg";
    import { resolve } from "$app/paths";

    type FooterLink = {
        label: string;
        img?: string;
        url?: string;
        href?: string;
        isButton?: boolean;
    };

    const footerSections: { title: string; links: FooterLink[] }[] = [
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
                {
                    label: "Mentions legales",
                    href: resolve("/MentionsLegales"),
                },
                {
                    label: "Artificial Inquiries",
                    url: "https://hal.science/hal-05327878v2",
                },
                {
                    label: "Configuration work",
                    url: "https://arxiv.org/abs/2512.19189",
                },
                { label: "Co-Inquirers", href: resolve("/inquirers") },
            ],
        },
    ];
</script>

<footer
    class="site-footer relative z-40 flex h-fit w-full flex-col md:gap-0 gap-12 border-t border-[#D9D9D9] bg-white px-4 pb-8 pt-8 mt-8 rounded-t-[20px] rounded-r-[20px] bottom-0"
>
    <div
        class="w-full md:h-[200px] h-fit flex md:flex-row flex-col gap-12 justify-between"
    >
        <div class="md:w-2/3 w-full">
            <p class="text-lg">
                We would like to thank all co-inquirers who took part in our
                protocol. <br /> Without their participation, our project could
                not have been developed. <br /> The link is on
                <a
                    href={resolve("/inquirers")}
                    class="underline hover:text-blue-500 hover:cursor-pointer"
                >
                    co-inquirers.</a
                >
            </p>
            <div class="w-2/5 h-auto opacity-1 hidden md:block pt-4">
                <img
                    src={footerLogo}
                    alt="Ecologies of LLM Logo"
                    class="w-full h-auto"
                />
            </div>
        </div>
        <div
            class="md:w-2/3 w-full flex md:flex-row flex-col gap-6 md:justify-end justify-between"
        >
            {#each footerSections as section}
                <div class="flex flex-col md:w-fit w-full md:pr-4 md:gap-1 gap-0">
                    <p class="font-bold! w-full pb-1">{section.title}</p>
                    <div class="flex md:flex-col flex-row flex-wrap gap-1 md:w-fit w-full">
                    {#each section.links as link, i}
                        {#if link.isButton}
                            <button
                                class="flex flex-col gap-1 items-start text-left p-0"
                            >
                                {#if link.img}
                                    <img src={link.img} alt={link.label} />
                                {:else}
                                    <p class="text-nowrap">{link.label}</p>
                                {/if}
                            </button>
                        {:else}
                            <a
                                href={link?.href || link?.url}
                                target={link?.url ? "_blank" : "_self"}
                                rel={link?.url ? "noopener noreferrer" : undefined}
                            >
                                {#if link.img}
                                    <img src={link.img} alt={link.label} />
                                {:else}
                                    {#if i < section.links.length - 1}
                                        <p class="text-nowrap md:block hidden">{link.label}</p>
                                        <p class="text-nowrap md:hidden block">{link.label},</p>
                                    {:else}
                                        <p class="text-nowrap md:block hidden">{link.label}</p>
                                        <p class="text-nowrap md:hidden block">{link.label}.</p>
                                    {/if}
                                {/if}
                            </a>
                        {/if}
                    {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="w-full h-auto opacity-1 block md:hidden">
        <img
            src={footerLogo}
            alt="Ecologies of LLM Logo"
            class="w-full h-auto"
        />
    </div>
</footer>
