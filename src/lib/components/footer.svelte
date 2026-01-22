<script>
import footerLogo from "$lib/media/logos/expanded_logo.svg";
</script>



<footer class="relative z-40 flex h-fit w-full flex-col md:gap-0 gap-12 border-t border-[#D9D9D9] bg-white px-4 pb-4 pt-8 rounded-t-[20px] rounded-r-[20px]">

    <div class="w-full md:h-[200px] h-fit flex md:flex-row flex-col gap-12 justify-space-between">
        <div class="md:w-2/3 w-full">
            <p class="text-lg">We would like to thank all co-inquirers who took part in our protocol. <br>Without their participation, our project could not have been developed. <br>
            Their names are <span class="underline hover:text-blue-500 hover:cursor-pointer"> written here ↗︎</span> </p>
        </div>
        <div class="md:w-1/3 w-full flex flex-row gap-6 md:justify-end justify-space-between">
            <div class="flex flex-col w-fit md:pr-4 md:gap-1 gap-0">
                <p class="font-medium pb-2">Research Team:</p>
                <a href="https://medialab.sciencespo.fr/en/people/donato-ricci/" target="_blank"><p>Donato Ricci</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/gabriel-alcaras/" target="_blank"><p>Gabriel Alcaras</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/tommaso-prinetti/" target="_blank"><p>Tommaso Prinetti</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/zoe-de-vries/" target="_blank"><p>Zoe de Vries</p></a>
            </div>
            <div class="flex flex-col w-fit md:pr-4 md:gap-1 gap-0">
                <p class="font-medium pb-2">The project:</p>
                <a href="/data-policy"><p>Data policy</p></a>
                <a href="/artificial-inquiries"><p>Artificial Inquiries</p></a>
                <a href="/configuration-work"><p>Configuration work</p></a>
                <a href="/markdownLlms"><p>Markdown of this website</p></a>
            </div>
        </div>
    </div>
    <div class="w-full h-auto opacity-1">
        <img src={footerLogo} alt="Ecologies of LLM Logo" class="w-full h-auto object-contain">
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
        0% { transform: translateY(500px); }
        89% { transform: translateY(500px); } 
        90% { transform: translateY(0); }
    }
</style>