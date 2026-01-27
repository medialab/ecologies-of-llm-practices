<script>
    import { selectedCard, isAlterEgoMode } from '$lib/stores/globalStores';
</script>

<button
    class="bg-transparent w-fit box-border absolute z-[1] select-none translate-x-0 transition-hidden text-left border-0 pointer-events-none duration-600 ease-in-out visible m-0 p-0
           bottom-[15px] right-[15px] text-right
           max-md:hidden
           focus:cursor-grabbing
           transition-all duration-600
           {!$isAlterEgoMode ? 'text-[#ababab]' : ''}"
>
    <p class="text-[1rem] m-0 leading-[1.5] max-w-[60ch]">
        "How does the use of LLMs hinge itself <br> onto existing work practices?"
    </p>
</button>

<button
    class="bg-transparent w-fit box-border absolute z-[1] select-none translate-x-0 transition-hidden text-left border-0 pointer-events-none duration-600 ease-in-out visible m-0 p-0
           top-[15px] left-[15px]
           max-md:hidden
           focus:cursor-grabbing
           transition-all duration-600
           {!$isAlterEgoMode ? 'text-[#ababab]' : ''}"
>
    <p class="text-[1rem] m-0 leading-[1.5] max-w-[60ch]">
        "What kind of interactions emerge when LLMs <br> are crossed with pre-existing workflows?"
    </p>
</button>

<style>
    /* Tailwind conversion complete. 
       Note: JS-based drag-positioning styles (transform) are handled by the library/inline styles if any, 
       but here they seemed static or just relying on these classes. 
       Checked original CSS: .text-box-sx/dx had transform: translateX(0).
    */
</style>
