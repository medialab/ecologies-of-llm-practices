<svelte:options css="injected" />

<script lang="ts">
    import { slide, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { resolve } from "$app/paths";
    import CardCanvasComponent from "$lib/components/cardCanvas.svelte";
    import { isPageLoaded } from "$lib/stores/globalStores";
    import { pillAnimation } from "$lib/stores/animeJs";
    import paperIcon from "$lib/media/icons/paperIcon.svg";
    import bookIcon from "$lib/media/icons/bookIcon.svg";
    import noteIcon from "$lib/media/icons/noteIcon.svg";
    import HeroLogo from "$lib/components/hero-logo.svelte";
    import SectionCard from "$lib/components/section-card.svelte";

    /** @type {import('./$types').PageProps} */
    let { data } = $props();

    type alterEgoCard = {
        Title: string,
        Description: string,
        Question: string,
        Id: string,
    }

    const baseUrl = "https://ecologiesofllm.medialab.sciencespo.fr";
    const meta = {
        title: "Ecologies of LLM Practices - Research on LLMs and Work",
        description:
            "Ecologies of LLM Practices is a participatory research project by Sciences Po's medialab exploring how LLMs reshape professional work through inquiry and design.",
        url: `${baseUrl}/`,
        image: `${baseUrl}/og_images/opengraph.jpg`,
        imageAlt: "EL2MP Logo - Ecologies of LLM Practices",
    };

    const mainButtons = [
        {
            label: "Configuration Work",
            url: "https://arxiv.org/abs/2512.19189",
            status: "new",
            icon: paperIcon,
        },
        {
            label: "Artificial Inquiries",
            href: resolve("/artificial_inquiries"),
            icon: bookIcon,
        },
        { label: "Tedium", href: resolve("/tedium"), icon: noteIcon },
    ];

    let turndownServicePromise: Promise<any> | null = null;

    const getTurndownService = async () => {
        if (!turndownServicePromise) {
            turndownServicePromise = import("turndown").then((module) => {
                const TurndownService = module.default;
                return new TurndownService({
                    emDelimiter: "*",
                    strongDelimiter: "**",
                });
            });
        }

        return turndownServicePromise;
    };

    const htmlToMd = async (html: string): Promise<string> => {
        const turndownService = await getTurndownService();
        return turndownService.turndown(html);
    };

    async function askAI(
        data: string,
        model: "gpt" | "claude" | "mistral" | "deepseek" = "gpt",
    ): Promise<void> {
        const markDownData = await htmlToMd(data);
        const prompt = `Based on the text from ${window.location.href}, provide an explanation of the project, including its research questions, main findings, and team: <content> ${markDownData}</content> `;
        const encoded = encodeURIComponent(prompt);
        const baseUrls = {
            gpt: "https://chat.openai.com",
            claude: "https://claude.ai/new",
            mistral: "https://chat.mistral.ai",
            deepseek: "https://chat.deepseek.com",
        };
        let url = "";

        if (model === "claude") {
            url = `${baseUrls["claude"]}/?q=${encoded}`;
        } else if (model === "mistral") {
            url = `${baseUrls["mistral"]}`;
        } else if (model === "deepseek") {
            url = `${baseUrls["deepseek"]}/?q=${encoded}`;
        } else {
            url = `${baseUrls["gpt"]}/?q=${encoded}`;
        }

        window.open(url, "_blank", "noopener,noreferrer");
    }

</script>

<svelte:head>
    <title>{meta.title}</title>
    <link rel="canonical" href={meta.url} />
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={meta.url} />
    <meta property="og:image" content={meta.image} />
    <meta property="og:image:alt" content={meta.imageAlt} />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
    <meta name="twitter:image:alt" content={meta.imageAlt} />
</svelte:head>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    class="fullsize_section hero justify-center md:translate-y-[-5%]"
    id="hero_title"
    tabindex="0"
    aria-labelledby="hero-h1"
>
    <div class="flex flex-col md:gap-0 gap-4 w-full md:w-fit">
        <HeroLogo/>   
        <h1
            id="hero-h1"
            class="relative z-20 md:p-6 md:m-0 m-2 p-2 text-center bg-white"
        >
            How does AI <i>reconfigure</i><br /> ordinary <i>work</i> practices?
        </h1>

        <div
            class="flex md:flex-row flex-col w-full h-fit z-20 justify-center gap-0 items-center"
        >
            {#each mainButtons as { label, href, url, status, icon }, i}
                {#if $isPageLoaded}
                    {@const showLabel = true}
                    <div
                        class="flex justify-center bg-white p-2 relative overflow-visible"
                    >
                        {#if status === "new" && $isPageLoaded}
                            <svg
                                width="10%"
                                height="100%"
                                overflow="visible"
                                xmlns="http://www.w3.org/2000/svg"
                                class="absolute right-0 top-0 z-[3] animate-pulse"
                            >
                                <circle
                                    transition:fade={{
                                        duration: 600,
                                        easing: cubicInOut,
                                        delay: 700,
                                    }}
                                    cx="36%"
                                    cy="20%"
                                    r="7"
                                    fill="oklch(62.3% 0.214 259.815)"
                                    stroke="black"
                                    stroke-width="1"
                                />
                            </svg>
                        {/if}
                        <a
                            use:pillAnimation
                            transition:slide={{
                                duration: 600,
                                easing: cubicInOut,
                                delay: 100 * i,
                            }}
                            class="pill relative"
                            href={href || url}
                            target={url ? "_blank" : "_self"}
                            rel={url ? "noopener noreferrer" : undefined}
                        >
                            {#if showLabel}
                                <p
                                    transition:fade={{
                                        duration: 600,
                                        easing: cubicInOut,
                                        delay: 300,
                                    }}
                                    class="label-caps-nowrap"
                                >
                                    {label}
                                </p>
                            {/if}
                            {#if icon && $isPageLoaded}
                                <img
                                    transition:fade={{
                                        duration: 600,
                                        easing: cubicInOut,
                                        delay: 600,
                                    }}
                                    src={icon}
                                    alt=""
                                    aria-hidden="true"
                                />
                            {/if}
                        </a>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</section>
{#if data?.alterEgosDb}
    {@const usableCards: import("$lib/stores/types").AlterEgoCard[] = Object.values(data.alterEgosDb)}
    {#each usableCards as c, i}
        {@const card: import("$lib/stores/types").AlterEgoCard = c}
        {#if card?.Title !== "Contact" && card?.Title !== "Co-Inquirers"}
            <SectionCard
                id={card?.Id}
                title={card?.Title}
                question={card?.Question}
                description={card?.Description}
                {i}
            />
        {/if}
    {/each}
{/if}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    id="playground"
    class="w-screen min-h-screen min-h-dvh h-fit z-[35] relative overflow-y-visible flex flex-col"
    data-scroll
    data-scroll-speed="0.5"
    tabindex="0"
    aria-label="Protocol section"
>
    <div class="flex justify-center">
        <h2
            class="relative z-20 md:p-6 md:m-0 m-2 p-2 text-center w-fit bg-white"
        >
            Protocol
        </h2>
    </div>

    {#if data?.cardsDb && data?.floatersDb && data?.alterEgosDb}
        <CardCanvasComponent {data} />
    {/if}
</section>
