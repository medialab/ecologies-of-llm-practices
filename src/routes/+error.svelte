<script>
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    let { error, status } = $props();
</script>

<section class="w-1/3 h-fit absolute top-1/2 bottom-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 outline z-30 flex flex-col items-center bg-white rounded-2xl p-4 overflow-hidden gap-4">
        <h3 class="text-center">
            🙈
        </h3>
        <h1 class="text-center leading-[80%]">An error occurred</h1>
        <p class="text-center">
            If you're here, something went wrong. <br>
            Let's go back to the home page.
        </p>

        <button
            class="pill"
            type="button"
            onclick={() => goto(resolve('/'))}>
                <p class="text-center place-self-center px-2">
                    GO BACK
                </p>
        </button>
</section>

