<script>
    let { id, title, question, description, i, image } = $props();
</script>

<section
    id={id ? id : ""}
    class="fullsize_section"
    data-scroll
    data-scroll-speed="0.1"
    data-scroll-call="cardInView"
>
    <div
        class="bg-white md:bg-transparent flex md:flex-row flex-col w-full justify-between items-start md:gap-6 gap-4 md:px-12 border-solid md:border-none border-black border rounded-xl md:p-6 px-2 py-4 transition-all duration-200 ease-in-out opacity"
        id="single_card"
    >
        {#if title}
            <div class="flex flex-col gap-2 md:bg-white md:w-2/5 w-full md:p-4">
                <h1>{title}</h1>
            </div>
        {/if}

        <div
            class="flex flex-col gap-4 md:bg-white md:w-3/5 w-full max-w-none h-fit md:p-4"
        >
            {#if question}
                <p class="h-fit text-gray-500 text-wrap">
                    {@html question}
                </p>
            {/if}
            {#if description}
                <p
                    class="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                    id="description-{i}"
                >
                    {@html description}
                </p>
            {/if}
            {#if image}
                <enhanced:img src={image} alt="" class="md:p-16 p-4" />
            {/if}
            <!--AI containers
                        <div
                            class="flex flex-row md:gap-1 gap-2 flex-wrap h-[30px]"
                            id="AI_containers"
                        >
                            {#each models as { name, img }, i}
                                <button
                                    use:pillAnimation
                                    class="pill px-4 py-1 flex flex-row gap-2 items-center h-full group"
                                    onclick={() =>
                                        askAI(
                                            card?.Description,
                                            name as
                                                | "gpt"
                                                | "claude"
                                                | "mistral",
                                        )}
                                >
                                    <p
                                        class="text-nowrap uppercase hidden group-hover:block group-transition-delay-300 group-active:block transition-all duration-500 ease-in-out"
                                    >
                                        Ask
                                    </p>
                                    <img
                                        src={img}
                                        alt="{name} logo"
                                        class="h-5 w-5"
                                    />
                                </button>
                            {/each}
                        </div>-->
        </div>
    </div>
</section>
