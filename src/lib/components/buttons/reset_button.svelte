<!-- Reset Button -->
 
<script>
    export let reset_function
</script>

<button class="reset_button" on:click={reset_function}>
    <p class="s1"> 
        Reset everything!
    </p>
</button>

<style>

    .reset_button {
        border-radius: 5px 0px 0px 0px;
        right: 0;
        bottom: 0;
        border-right: 0px;
        border-bottom: 0px;
    }

    :global(.reset_button:active) {
        background-color: var(--full-black);
        color: var(--demi-white);
    }


</style>