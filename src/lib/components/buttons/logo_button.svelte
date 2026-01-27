<script>
    export let logoImage
</script>

<button 
    class="w-[14vw] h-fit fill-black opacity-100 cursor-none bg-transparent fixed rounded-tr-[5px] z-[1] bottom-[1%] left-1/2 -translate-x-1/2 origin-left border-0 transition-transform duration-100 ease-in-out
           hover:bg-transparent hover:select-none hover:pointer-events-none
           active:bg-[#EAEAEA] active:scale-90 active:-translate-x-1/2 active:transition-all active:duration-200
           max-md:hidden" 
    onclick={() => window.location.href = '/'}
>
    <!-- Note: mobile image styling was w-50% but the container is hidden on mobile anyway -->
    <img src={logoImage} alt="EL2MP Logo">
</button>

<style>
    /* Global outline resets moved to app.css or handled by Tailwind's focus:outline-none if needed. 
       Specific button styles converted to Tailwind utilities above. */
    :global(button:focus),
    :global(a:focus),
    :global([data-card-container]:focus),
    :global(.floater_container:focus) {
        outline: none;
    }
</style>