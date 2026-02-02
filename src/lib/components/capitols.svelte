<script>
    import {
        selectedCard,
        transitionTime,
        isDesktop,
        isMobileDevice,
        transitionCurve,
        currentFocus,
        shareData,
    } from "$lib/stores/globalStores";

    import arrowIcon from "$lib/media/shareIcon.svg";
    import forwardIcon from "$lib/media/forwardIcon.svg";

    export let bringToFront;
    export let swapCards;
    export let card;
    export let transitionDelay;
</script>

<div
    class="hover:border-black hover:border-2 w-[60vw] max-w-[1100px] aspect-[1.5/1] cursor-grab absolute select-text overflow-clip opacity-0 transition-[border] border-[1.5px] border-white [clip-path:polygon(0_0,100%_0,100%_100%,5%_100%,0_94%)] max-md:w-[90vw] max-md:max-h-none max-md:pr-0 max-md:transition-transform max-md:duration-[var(--card-transition-duration)] max-md:ease-in-out max-md:[clip-path:none] rounded-3xl md:rounded-none"
    data-card-container
    onclick={(event) => {
        if ($isDesktop) {
            bringToFront(event);
            $selectedCard = card.Title;
        } else {
            swapCards(event.currentTarget);
        }
    }}
    onkeydown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if ($isDesktop) {
                bringToFront(event);
            } else {
                swapCards(event.currentTarget);
            }
        }
    }}
    tabindex="0"
    role="button"
    data-flush-order={card.IndexNum}
    id={card.IndexNum}
    aria-label="Draggable Card"
    data-section={card.Title}
>
    <div
        class="grid relative content-start grid-cols-7 max-md:grid-cols-1 overflow-hidden w-full h-full min-h-full"
        style="transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;"
        id="thecard"
    >
        <div
            class="w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px] absolute top-0 max-md:top-[10px] right-[10px] z-20 flex items-center justify-center p-2"
            style="right: {$isMobileDevice ? '10px' : '0px'};"
        >
            <button
                onclick={(event) => {
                    event.preventDefault();

                    $shareData = {
                        title: card.Title,
                        exTitle: card.Question,
                        exText: "",
                        exDescription: card.Description,
                        exImage: card.CoverImg,
                        bgColor: card.bgColor,
                        url: `${window.location.href}`,
                    };

                    console.log($shareData);
                }}
                tabindex="0"
                class="w-full h-full transform transition-transform duration-100 ease-in-out flex items-center justify-center relative rounded-none active:scale-90 hover:scale-105 active:rotate-[5deg]"
                aria-label="Share content"
            >
                <img src={forwardIcon} alt="" class="w-full h-full" />
            </button>
        </div>

        <div
            class="w-full relative flex flex-col col-start-1 col-end-8 max-md:col-start-1 max-md:col-end-2 max-md:row-start-1 z-5 pointer-events-none row-start-1 mb-[3vw] max-md:p-[15px] max-md:mb-[1vw]"
            style="background-color: {card.bgColor}; border: 5px solid {card.bgColor};"
        >
            <h1
                class=" whitespace-normal select-none pointer-events-auto overflow-visible inline-block mb-[-0.2em] mt-[-0.18em] translate-x-[-0.08em] min-[1920px]:text-[6.5vw] min-[1920px]:mt-[-0.14em]"
                style="z-index: 7;"
            >
                {@html card.Title}
            </h1>
        </div>

        <div
            class="w-full h-[calc(100%-2px)] md:col-start-2 md:col-end-8 max-md:col-start-1 max-md:col-end-2 row-start-2 max-md:row-start-2 mt-[0.1%] pt-[1%] pr-[var(--spacing-XS)] overflow-y-auto overflow-x-hidden z-[1]"
            data-lenis-prevent
            data-section={card.Title}
        >
            <div
                class="flex flex-col gap-4 w-full md:pr-6 px-4"
                data-section={card.Title}
            >
                <div class="flex flex-col gap-2">
                    {#if card.Question}
                        <p
                            class="md:text-2xl text-xl md:w-2/3 w-full leading-[120%]"
                        >
                            {@html card.Question}
                        </p>
                    {/if}

                    {#if card.Description}
                        <p class="md:text-lg w-full">
                            {@html card.Description}
                        </p>
                    {/if}
                </div>

                {#if card.CoverImg}
                    <div class="w-full h-auto relative mb-6">
                        <div
                            class="w-full h-full absolute mix-blend-color"
                            style="background-color: {card.bgColor};"
                        ></div>
                        <enhanced:img
                            src={card.CoverImg}
                            alt="CoverImg"
                            class="opacity-100 block z-[1] w-full h-auto aspect-video object-cover"
                        />
                    </div>
                {/if}

                {#each card.Content as section, i}
                    <div
                        role="region"
                        class="flex flex-col gap-4 w-full mb-6"
                        data-section={`Ex_${section.exNum}`}
                        onmouseenter={() => {
                            if (!$isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`;
                            }
                        }}
                        ontouchstart={() => {
                            if ($isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`;
                            }
                        }}
                        onfocus={() => {
                            $currentFocus = `${card.Title}_Ex_${section.exNum}`;
                        }}
                    >
                        {#if section.title}
                            <div class="w-full h-fit flex flex-col gap-2">
                                <div
                                    class="w-full flex items-center gap-[var(--spacing-M)] max-md:gap-[var(--spacing-XS)]"
                                >
                                    <h2
                                        class="md:text-5xl text-3xl max-md:w-fit md:text-nowrap items-center justify-center flex gap-2"
                                    >
                                        {@html section.title}
                                        <button
                                            type="button"
                                            onclick={(event) => {
                                                event.preventDefault();

                                                $shareData = {
                                                    title: card.Title,
                                                    exTitle: section.title,
                                                    exDescription:
                                                        section.subtitle,
                                                    exText: section.text,
                                                    exImage: section.picture,
                                                    bgColor: card.bgColor,
                                                    url: `${window.location.href}`,
                                                };
                                            }}
                                            class="inline font-inherit md:h-[40px] h-[30px] w-auto"
                                            aria-label="Share {section.title}"
                                        >
                                            <img
                                                src={arrowIcon}
                                                alt="Share this exercise"
                                                class="w-full h-full"
                                            />
                                        </button>
                                    </h2>
                                </div>

                                {#if section.subtitle}
                                    <p class="md:text-xl md:w-2/3">
                                        {@html section.subtitle}
                                    </p>
                                {/if}
                            </div>
                        {/if}

                        {#if section.picture}
                            <div class="w-full h-auto relative">
                                <div
                                    class="absolute w-full h-full mix-blend-color"
                                    style="background-color: {card.bgColor};"
                                ></div>
                                <enhanced:img
                                    class="w-full h-auto"
                                    src={section.picture}
                                    alt="People"
                                />
                            </div>
                        {/if}

                        {#if section.text}
                            <div class="w-full h-full">
                                <p
                                    class="md:text-xl w-full hyphens-auto break-words overflow-wrap-anywhere"
                                >
                                    {@html section.text}
                                </p>
                            </div>
                        {/if}
                    </div>
                {:else}
                    <p>If you see this we are encountering issues</p>
                {/each}
            </div>
        </div>
    </div>
</div>
