<script lang="ts">
  import "../app.css";
  import Lenis from "lenis";
  import { onMount } from "svelte";
  import { lenisStore } from "$lib/stores/globalStores"

  onMount(() => {
      const lenis = new Lenis({
          autoRaf: true,
          lerp: 0.1,
      });

      lenisStore.set(lenis);

      lenis.start();
  })
</script>

<slot />


<svelte:head>
  <!-- Essential Metadata -->

  <title>Ecologies of LLM Practices - Artificial Inquiries</title>
  <link rel="canonical" href="https://ecologiesofllm.medialab.sciencespo.fr/" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-site-verification" content="aCBTb2lNIupPesJ45f0x0AFWx8Wy9VpvWxFBNJnZ4e8" />
  
  <!-- SEO Description and Keywords -->
  <meta name="description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta name="keywords" content="Large Language Models, Artificial Intelligence, Work, Professionals, Practices, Sociology, Science and Technology Studies, Research, Design, Qualitative Research, ChatGPT" />
  <meta name="author" content="Gabriel Alcaras, Donato Ricci, Tommaso Prinetti" />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Ecologies of LLM Practices - Artificial Inquiries" />
  <meta property="og:description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta property="og:url" content="https://ecologiesofllm.medialab.sciencespo.fr/" />
  <meta property="og:image" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg" />
  <meta property="og:image:alt" content="EL2MP Logo - Ecologies des Pratiques LLMs" />
  <meta property="og:logo" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/enhanced_logoImage.png" />
  <meta property="og:site_name" content="Ecologies of LLM Practices" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="fr_FR" />
  <meta property="fb:app_id" content="123456789012345" />

  <!-- IA Meta Tags -->
  <meta property="ia:markup_url" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup.json" />
  <meta property="ia:markup_url_dev" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup-dev.json" />
  <meta property="ia:rules_url" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules.json" />
  <meta property="ia:rules_url_dev" content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules-dev.json" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ecologies of LLM Practices - Artificial Inquiries" />
  <meta name="twitter:description" content="A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike." />
  <meta name="twitter:image" content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg" />
  <meta name="twitter:image:alt" content="EL2MP Logo - Ecologies of LLM Practices" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DHX3VYCYS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-8DHX3VYCYS');
  </script>

  <!-- Structured data for better SEO -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://medialab.sciencespo.fr/",
          "name": "médialab, Sciences Po (Paris, France)",
          "url": "https://medialab.sciencespo.fr/",
          "logo": "https://medialab.sciencespo.fr/img/cover-fb.png",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Ecologies of LLM Practices"
          }
        },
        {
          "@type": "Website",
          "name": "EL2MP Research Project Website",
          "url": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "publisher": {
            "@type": "Organization",
            "@id": "https://medialab.sciencespo.fr/"
          },
          "description": "Official website for the EL2MP research project by Sciences Po's médialab, documenting the integration and impact of Large Language Models in professional practices.",
          "mainEntity": {
            "@type": "ResearchProject",
            "@id": "https://ecologiesofllm.medialab.sciencespo.fr/"
          }
        },
        {
          "@type": "ResearchProject",
          "@id": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "name": "Ecologies of LLM Practices (EL2MP)",
          "alternateName": "Ecologies of LLM Practices",
          "description": "A team of sociologists and designers explores how Large Language Models, like ChatGPT, influence professional practices and ordinary knowledge work. Their experimental and qualitative research protocol, 'Artificial Inquiries', is open to replication and appropriation by professionals and researchers alike.",
          "url": "https://ecologiesofllm.medialab.sciencespo.fr/",
          "logo": "https://ecologiesofllm.medialab.sciencespo.fr/og_images/opengraph.jpg",
          "provider": {
            "@type": "Organization",
            "@id": "https://medialab.sciencespo.fr/"
          },
          "keywords": [
            "Large Language Models",
            "Artificial Intelligence",
            "Work",
            "Professionals",
            "Practices",
            "Sociology",
            "Science and Technology Studies",
            "Research",
            "Design",
            "Qualitative Research",
            "ChatGPT"
          ]
        }
      ]
    }
  </script>
  
</svelte:head>

<style>
:global(* ) {
  margin: 0;
  padding: 0;
}


  :global(button, a) {
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    padding: 2px;
    width: fit-content;
    height: fit-content;
  }

  :global(html) {
    background-color: #F2F2F2;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
  }

  :global(body) {
    width: 100%;
    min-height: 100%;
    background-color: #F2F2F2;
  }

  :global(p) {
    font-family: "Instrument Sans", Helvetica, sans-serif;
    font-weight: 400;
    letter-spacing: -0.03em;
    text-decoration: none;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    width: fit-content;
  }

  :global(b) {
    font-weight: 500;
  }

  :global(h1) {
    font-family: "Instrument Serif", 'Times New Roman', Times, serif;
    font-weight: 400;
    letter-spacing: -0.03em;
    text-decoration: none;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  :global(h2) {
    font-family: "Instrument Serif", 'Times New Roman', Times, serif;
    line-height: 100%;
  }

  :global(*) {
    text-wrap-style: pretty;
  }

  :global(::selection) {
    background-color: #3B82F6;
    color: white;
  }
</style>