<script>
import { selectedCard, transitionTime, isDesktop, isMobileDevice, transitionCurve, currentFocus, shareData } from '$lib/stores/globalStores';

import arrowIcon from '$lib/media/shareIcon.svg';
import forwardIcon from '$lib/media/forwardIcon.svg';




export let bringToFront
export let swapCards
export let card
export let transitionDelay



</script>

        <div
            class="w-[60vw] max-w-[1100px] aspect-[1.5/1] block pr-[var(--spacing-M)] gap-[var(--spacing-M)] cursor-grab absolute select-text overflow-hidden opacity-0 transition-[border] duration-[3s] ease-in-out border-[1.5px] border-white [clip-path:polygon(0_0,100%_0,100%_100%,5%_100%,0_94%)] max-md:w-[90vw] max-md:max-h-none max-md:rounded-[var(--slider-radius)] max-md:pr-0 max-md:transition-transform max-md:duration-[var(--card-transition-duration)] max-md:ease-in-out max-md:[clip-path:none]"
            data-card-container
            draggable="true"
            onclick={(event) => {
                if ($isDesktop) {
                    bringToFront(event);
                    $selectedCard = card.Title;
                } else {
                    swapCards(event.currentTarget);
                }
            }}
            onkeydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
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
            data-flush-order="{card.IndexNum}"
            id="{card.IndexNum}"
            aria-label="Draggable Card"
            data-section={card.Title}
        >


        <div
            class="grid relative content-start grid-cols-7 max-md:grid-cols-1 overflow-hidden w-full h-full min-h-full translate-x-0"
            style="transition: transform {transitionTime}s {transitionCurve} {transitionDelay}ms;"
        >

            <div class="w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px] absolute top-0 max-md:top-[10px] right-[10px] z-20 text-black flex flex-row items-center justify-center fill-[#1f1f1f] p-2" style="right: {$isMobileDevice ? '10px' : '0px'};">
                <button
                    
                    onclick={(event) => {
                        event.preventDefault();
                        
                        $shareData = ({
                            title: card.Title,
                            exTitle: card.Question,
                            exText: '',
                            exDescription: card.Description,
                            exImage: card.CoverImg,
                            bgColor: card.bgColor,
                            url: `${window.location.href}`
                        });

                        console.log($shareData)
                    }}

                    tabindex="0"
                    class="w-full h-full transform scale-100 rotate-0 transition-transform duration-100 ease-in-out flex flex-row items-center justify-center relative rounded-none active:scale-90 hover:scale-105 active:rotate-[5deg]"
                    aria-label="Share content">
                    <img src={forwardIcon} alt="" class="w-full h-full object-contain">
                </button>
            </div>

            <div class="w-full h-fit relative flex flex-col col-start-1 col-end-8 max-md:col-start-1 max-md:col-end-2 max-md:row-start-1 z-5 pointer-events-none row-start-1 mb-[3vw] max-md:p-[15px] max-md:mb-[1vw]" style="background-color: {card.bgColor}; border: 5px solid {card.bgColor};"> 
                <h1 class="text-8xl whitespace-normal select-none pointer-events-auto overflow-visible inline-block mb-[-0.2em] mt-[-0.18em] translate-x-[-0.08em] min-[1920px]:text-[6.5vw] min-[1920px]:mt-[-0.14em]" style="z-index: 7;">
                    {@html card.Title}
                </h1>
            </div>

            <div class="block w-full h-[calc(100%-2px)] col-start-2 col-end-8 max-md:col-start-1 max-md:col-end-2 row-start-2 max-md:row-start-2 bg-transparent mt-[0.1%] pt-[1%] pr-[var(--spacing-XS)] overflow-y-auto overflow-x-hidden z-[1]"
                data-lenis-prevent
                data-section={card.Title}>
                
                <div class="flex flex-col gap-4 h-fit w-full pr-6" data-section={card.Title}>

                    <div class="flex flex-col gap-2">
                        {#if card.Question}
                            <p class="text-2xl w-2/3">
                                {@html card.Question}
                            </p>
                        {/if}

                        {#if card.Description}
                            <p class="text-lg w-full">{@html card.Description}</p>
                        {/if}
                    </div>
                    
                    {#if card.CoverImg}
                        <div class="w-full h-auto relative mb-6">
                            <div class="w-full h-full absolute mix-blend-color" style="background-color: {card.bgColor};"></div>
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
                        class="flex flex-col gap-4 w-full h-fit mb-6"
                        data-section={`Ex_${section.exNum}`}
                        onmouseenter={() => {
                            if (!$isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`
                                
                            }
                        }}
                        ontouchstart={() => {
                            if ($isMobileDevice) {
                                $currentFocus = `${card.Title}_Ex_${section.exNum}`
                                
                            }
                        }}
                        onfocus={() => {
                            $currentFocus = `${card.Title}_Ex_${section.exNum}`
                        }}> 
                            {#if section.title}
                                <div class="w-full h-fit flex flex-col gap-2">
                                    <div class="w-full flex flex-row items-center gap-[var(--spacing-M)] max-md:gap-[var(--spacing-XS)]">
                                        <h2 class="text-5xl max-md:w-fit text-nowrap">{@html section.title}
                                            <button 
                                                type="button"
                                                onclick={(event) => {
                                                    event.preventDefault();
                                                    
                                                    $shareData = ({
                                                        title: card.Title,
                                                        exTitle: section.title,
                                                        exDescription: section.subtitle,
                                                        exText: section.text,
                                                        exImage: section.picture,
                                                        bgColor: card.bgColor,
                                                        url: `${window.location.href}`
                                                    });
                                                }}
                                                class="inline font-inherit h-[40px] w-auto"
                                                aria-label="Share {section.title}"
                                            >
                                                <img src={arrowIcon} alt="Share this exercise" class="w-full h-full object-contain">
                                            </button>
                                        </h2>
                                    </div>
                                    
                                    {#if section.subtitle }
                                        <p class="text-xl w-2/3">{@html section.subtitle}</p>
                                    {/if}
                                </div>
                            {/if}
                            
                            

                            {#if section.picture}
                                <div class="w-full h-auto relative">
                                    <div class="absolute w-full h-full mix-blend-color" style="background-color: {card.bgColor};"></div>
                                    <enhanced:img class="w-full h-auto object-contain" src={section.picture} alt="People"/>
                                </div>   
                            {/if}

                             {#if section.text}
                                <div class="block gap-[var(--spacing-L)] max-md:ga w-full h-full">
                                    <p class="text-xl w-full  hyphens-auto break-words overflow-wrap-anywhere">{@html section.text}</p>
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
    
