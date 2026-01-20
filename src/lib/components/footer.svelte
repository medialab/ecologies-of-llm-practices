<script>
import footerLogo from "$lib/media/logos/expanded_logo.svg";
</script>



<footer class="relative z-40 flex h-fit w-full flex-col gap-0 border-t border-[#D9D9D9] bg-white px-4 pb-4 pt-8 rounded-t-[20px] rounded-r-[20px]">

    <div class="w-full h-[200px] flex flex-row gap-12 justify-space-between">
        <div class="w-2/3">
            <p class="text-lg">We would like to thank all co-inquirers who took part in our protocol. <br>Without their participation, our project could not have been developed. <br>
            Their names are <span class="underline hover:text-blue-500 hover:cursor-pointer"> written here ↗︎</span> </p>
        </div>
        <div class="w-1/3 flex flex-row gap-6 justify-end">
            <div class="flex flex-col w-fit pr-4 gap-1">
                <p class="font-medium pb-2">Research Team:</p>
                <a href="https://medialab.sciencespo.fr/en/people/donato-ricci/" target="_blank"><p>Donato Ricci</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/gabriel-alcaras/" target="_blank"><p>Gabriel Alcaras</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/tommaso-prinetti/" target="_blank"><p>Tommaso Prinetti</p></a>
                <a href="https://medialab.sciencespo.fr/en/people/zoe-de-vries/" target="_blank"><p>Zoe de Vries</p></a>
            </div>
            <div class="flex flex-col w-fit pr-4 gap-1">
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