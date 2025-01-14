<script>
    /** @type {{ data: import('./$types').LayoutData }} */
  
    
    import '/variables.css';
    import '/styles.css';

</script>

<svelte:head>
    <title>Écologies des Pratiques et LLMs - SciencesPo MediaLab</title>
    <meta name="description" content="Découvrez le projet Écologies des Pratiques et LLMs du MediaLab de SciencesPo. Un regard interdisciplinaire sur l'utilisation des grands modèles de langage (LLMs).">
    <meta property="og:title" content="Écologies des Pratiques et LLMs - SciencesPo MediaLab">
    <meta property="og:description" content="Découvrez le projet Écologies des Pratiques et LLMs du MediaLab de SciencesPo. Un regard interdisciplinaire sur l'utilisation des grands modèles de langage (LLMs).">
    <meta property="og:image" content={ogImg}> <!-- Replace {ogImg} with the actual image URL -->
    <meta property="og:url" content="https://medialab.sciencespo.fr/activites/ecologies-des-pratiques-llms/">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Écologies des Pratiques et LLMs - SciencesPo MediaLab">
    <meta name="twitter:description" content="Découvrez le projet Écologies des Pratiques et LLMs du MediaLab de SciencesPo. Un regard interdisciplinaire sur l'utilisation des grands modèles de langage (LLMs).">
    <meta name="twitter:image" content={ogImg}> <!-- Replace {ogImg} with the actual image URL -->
    <meta property="og:site_name" content="MediaLab SciencesPo">
</svelte:head>
  
<slot />

<style global>

</style>
  