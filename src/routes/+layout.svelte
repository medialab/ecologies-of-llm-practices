<script lang="ts">
  import "../app.css";
  import LocomotiveScroll from "locomotive-scroll";
  import { onMount } from "svelte";
  import {
    scrollStore,
    burgerOpen,
    pendingScrollTarget,
    isPageLoaded,
  } from "$lib/stores/globalStores";
  import { page } from "$app/stores";
  import { tick } from "svelte";
  import { heroAnimation } from "$lib/stores/animeJs";
  import Mask from "$lib/components/mask.svelte";
  import BgLogo from "$lib/components/bg-logo.svelte";
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";

  let headerPage = $state("landing");
  let isInquirersPage = $state(false);

  onMount(() => {
    const scroll = new LocomotiveScroll({
      autoStart: true,
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      },
    });

    scrollStore.set(scroll);

    if (window.location.hash) {
      pendingScrollTarget.set(window.location.hash);
    }
  });

  $effect(() => {
    const _ = $page.url.pathname;

    tick().then(() => {
      heroAnimation();
    });
  });

  $effect(() => {
    headerPage = $page.url.pathname === "/" ? "landing" : "tedium";
    isInquirersPage = $page.url.pathname === "/inquirers";
  });

  $effect(() => {
    if ($burgerOpen) {
      $scrollStore?.stop();
    } else {
      $scrollStore?.start();
    }
  });

  $effect(() => {
    if ($scrollStore && $pendingScrollTarget) {
      setTimeout(() => {
        scrollStore.scrollTo($pendingScrollTarget);
        pendingScrollTarget.set(null);
      }, 100);
    }
  });

  $effect(() => {
    if ($page.url.hash) {
      scrollStore.scrollTo($page.url.hash);
    }
  });
</script>

<main
  class="main_container"
  id="main"
  data-scroll-container
  data-scroll={isInquirersPage ? true : undefined}
>
  <Header currentPage={headerPage} currentPath={$page.url.pathname} />
  <slot />
  <Footer />
</main>
<Mask />
<BgLogo />

<svelte:head>
  <!-- Global Metadata -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta
    name="google-site-verification"
    content="aCBTb2lNIupPesJ45f0x0AFWx8Wy9VpvWxFBNJnZ4e8"
  />
  <meta
    name="keywords"
    content="Large Language Models, Artificial Intelligence, Work, Professionals, Practices, Sociology, Science and Technology Studies, Research, Design, Qualitative Research, ChatGPT"
  />
  <meta
    name="author"
    content="Gabriel Alcaras, Donato Ricci, Tommaso Prinetti"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />
  <link
    rel="preload"
    href="/fonts/InstrumentSans-Regular.ttf"
    as="font"
    type="font/ttf"
    crossorigin
  />

  <!-- Open Graph Global Meta Tags -->
  <meta property="og:type" content="website" />
  <meta
    property="og:logo"
    content="https://ecologiesofllm.medialab.sciencespo.fr/og_images/enhanced_logoImage.png"
  />
  <meta property="og:site_name" content="Ecologies of LLM Practices" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="fr_FR" />
  <meta property="fb:app_id" content="123456789012345" />

  <!-- IA Meta Tags -->
  <meta
    property="ia:markup_url"
    content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup.json"
  />
  <meta
    property="ia:markup_url_dev"
    content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-markup-dev.json"
  />
  <meta
    property="ia:rules_url"
    content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules.json"
  />
  <meta
    property="ia:rules_url_dev"
    content="https://ecologiesofllm.medialab.sciencespo.fr/ia/ia-rules-dev.json"
  />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />

  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-8DHX3VYCYS"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-8DHX3VYCYS");
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
