import { photos, capitolsCover, general, floaters } from "$database/config.js";
export { cardsDb, floatersDb, alterEgosDb, tediumData, inquirers, researchTeam };

const cardsDb = {
  Card1: {
    Title: "Qualifying",
    Description:
      "The first block is about <b>adopting a reflexive posture</b> regarding the use of LLMs. Participants engage in exercises that make them more aware of their practices, attitudes, and assumptions about AI technologies.This block serves as a foundational phase, akin to a practice ground, where participants start to <b>think critically</b> about their relationship with LLMs.",
    Question:
      "Where do LLMs live in our professional practices, norms, and relationships?",
    IndexNum: 1,
    CoverImg: capitolsCover.coverQualifying,
    Content: [
      {
        title: "Ex 1 - Draw It Like You See It",
        subtitle:
          "Participants sketch how they think an LLM works and how they view their work environment.",
        text: "This exercise introduces participants to the project's exploration of the social and material contexts in which professionals interact with LLMs. Through <b>spontaneous and deliberately imperfect sketches</b>, participants capture their intuitive and metaphorical understanding of LLMs.",
        picture: photos.Ex_1,
        exNum: 1,
      },
      {
        title: "Ex 2 - Harvesting Tasks",
        subtitle:
          "Participants account for the tasks they perform in their work and how LLMs could assist them.",
        text: "This exercise helps participants <b>reflect on their existing work</b>, revealing overlooked or underappreciated tasks.They also explore what other work they could do with the assistance of an LLM, generating material for future exercises.",
        picture: photos.Ex_2,
        exNum: 2,
      },
      {
        title: "Ex 3 - Rough Impressions",
        subtitle:
          "Participants review their ChatGPT history to identify usage patterns and what stands out.",
        text: "This exercise prompts participants to <b>critically assess</b> their LLM interactions through self-evaluation and a structured review of their conversation history.It highlights <b>gaps between perception and actual use</b> to further their understanding of their LLM usage rather than relying on one-off talking points or anecdotes.",
        picture: photos.Ex_3,
        exNum: 3,
      },
      {
        title: "Ex 4 - Memorable Conversations",
        subtitle:
          "Participants identify what made some conversations with ChatGPT remarkable.",
        text: "Participants <b>analyze past LLM interactions</b> that stood out due to emotional impact, moral hesitation, or significant outcomes.They rate the model's performance and explore why it performed as it did, fostering awareness about LLM capabilities and professional expectations.",
        picture: photos.Ex_4,
        exNum: 4,
      },
      {
        title: "Ex 5 - Subtracting the Machine",
        subtitle:
          "Participants describe memorable interactions with ChatGPT without using terms like 'LLM' or 'ChatGPT'.",
        text: "This thought experiment creates <b>artificial constraints</b> on how participants talk about their use of LLMs.Because they cannot rely on ready-made categories (e.g., 'ChatGPT', 'machine', or 'assistant'), participants need to <b>reconsider their interactions</b> with the models, playing with different metaphors and analogies drawn from their social and professional environments.",
        picture: photos.Ex_5,
        exNum: 5,
      },
    ],
    bgColor: "#97D2FB",
    isProjCover: false,
  },
  Card2: {
    Title: "Benchmarking",
    Description:
      "In this block, participants are guided through selecting an LLM that <b>best suits their professional needs</b>. They design personal tests comprising specific tasks and evaluate the performance of different models.The goal is to choose a model that aligns with their practical and ethical requirements.",
    Question: "How do we assess the value of an LLM?",
    IndexNum: 2,
    CoverImg: capitolsCover.coverBenchmarking,
    Content: [
      {
        title: "Ex 6 - Design your AI Test",
        subtitle:
          "Participants design a test to assess the usefulness of an LLM, choosing four tasks that are essential or enjoyable parts of their work.",
        text: "This exercise guides participants through a <b>selection process</b>, drawing from their current work practices and the potential implementation of new tasks. In contrast to standardized benchmarks, which are tailor-made by engineers for LLMs, participants design a test that revolves around <b>their own professional experience</b>. This personalized benchmark aims to assess whether the models can provide <b>practical value</b> that actually matters in a specific professional situation.",
        picture: photos.Ex_6,
        exNum: 6,
      },
      {
        title: "Ex 7 - Setting Up the Test",
        subtitle:
          "Participants write detailed instructions for their tasks and choose four LLMs they wish to test.",
        text: "By formulating <b>detailed instructions</b>, participants reflect on how they can effectively guide an LLM towards accomplishing a simple or complex task. They are led to reflect on the <b>weight of their own prompt</b> on the final result. By selecting a human or a specialized model, participants explore different avenues of comparison - <b>machine versus machine</b> or <b>human versus machine</b>.",
        picture: photos.Ex_7,
        exNum: 7,
      },
      {
        title: "Ex 8 - Gathering Evidence",
        subtitle:
          "Participants ask an acquaintance to collect answers from LLMs and anonymize results to avoid bias.",
        text: "In this exercise, participants <b>enlist the help</b> of a fellow co-inquirer, a good friend, or a colleague. In addition to anonymizing results and ensuring fairness in the upcoming mock trial, this exercise allows participants to <b>concretely experience</b> the collaborative nature of LLM performance evaluation.",
        picture: photos.Ex_8,
        exNum: 8,
      },
      {
        title: "Ex 9 - Judgment Day",
        subtitle:
          "Participants assess the blind results in a mock trial: they rank them, explain on what ground they assessed each performance, and reflect on the testing process.",
        text: "Participants <b>rank anonymized LLM responses</b> for each task, determine the best-performing model, and <b>critically review</b> the trial's fairness and relevance.This evaluation encourages participants to reflect on what matters in assessing the <b>situated value</b> of LLMs.",
        picture: photos.Ex_9,
        exNum: 9,
      },
    ],

    bgColor: "#FB9799",
    isProjCover: false,
  },
  Card3: {
    Title: "Prompting",
    Description:
      "In this block, participants explore <b>how to effectively communicate with LLMs</b> through prompt engineering. They experiment with different prompt styles and techniques to see how they influence an LLM's outputs, aiming to <b>better align</b> the model's responses with their professional needs and expectations.",
    Question: "To what extent can we influence the quality of an LLM's output?",
    IndexNum: 3,
    CoverImg: capitolsCover.coverPrompting,
    Content: [
      {
        title: "Ex 10 - The Art of the Prompt",
        subtitle:
          "Participants explore and refine the way they prompt by experimenting with and reflecting on their interactions with LLMs.",
        text: "By approaching prompting not as a one-size-fits-all formula, but as a <b>practice of inquiry and iteration,</b>  the series of tasks in this exercise sharpen participants’ prompting skills, and deepen their awareness of their assumptions and expectations. The goal is not just to make the LLM work better, but <b>to understand what “better” really means</b> in the context of one’s own practices.",
        picture: photos.Ex_10,
        exNum: 10,
      },
      {
        title: "Ex 11 - Tracking Shifts",
        subtitle:
          "Participants look back on their LLM practices since the experiment began, searching for shifts and continuities.",
        text: "Participants document how their use of <b>LLMs</b> has changed since the beginning of the experiment. Using concrete examples from their experience, they write two short essays on how their <b>practices have evolved</b> and on what has <b>remained stable</b>.",
        picture: photos.Ex_11,
        exNum: 11,
      },
    ],

    bgColor: "#A8E2B4",
    isProjCover: false,
  },
  Card4: {
    Title: "Excelling",
    Description:
      "In this block, participants use their chosen LLM to produce <b>the highest quality work possible</b>. The goal is <b>to push the model's capabilities to the fullest</b>, testing its ability to reach the gold standard in a specialized field.",
    Question: "How closely can an LLM approach human excellence?",
    IndexNum: 4,
    CoverImg: capitolsCover.coverExcel,
    Content: [
      {
        title: "Ex 12 - Choosing an Exemplary Work",
        subtitle:
          "Participants identify and reflect on written texts that set a benchmark in their field.",
        text: "An exemplary work is not necessarily a prestigious publication but may be a <b>modest, everyday writing</b> that embodies clarity, precision, or impact within a professional context. By selecting both renowned and less conspicuous examples, the goal is to <b>sharpen awareness of what good writing looks like</b> across different formats and purposes.",
        picture: photos.Ex_12,
        exNum: 12,
      },
      {
        title: "Ex 13 - Setting Up the Example",
        subtitle:
          "Participants discuss the place of their chosen work within their professional ecology and explain why it is exemplary.",
        text: "This exercise contextualizes the chosen exemplary work by examining its <b>professional significance</b>. A radar graph helps assess factors like frequency, expertise required, and error tolerance, while a structured reflection highlights what makes the work <b>exemplary</b> and worth emulating.",
        picture: photos.Ex_13,
        exNum: 13,
      },
      {
        title: "Ex 14 - Setting Up the Example",
        subtitle:
          "Participants guide an LLM towards reproducing an exemplary text from their professional field.",
        text: "Participants attempt to recreate a <b>high-quality text</b> using an LLM without providing direct access to the original. This experiment tests the LLM's ability to replicate <b>style, tone, and meaning</b> while challenging participants to refine their prompting strategies.Through 90-minute work sessions interspersed between Exercises 15 and 17, participants document their process and assess the model's capacity to come as close as possible to <b>an exact copy</b> of an exemplary work.",
        picture: photos.Ex_14,
        exNum: 14,
      },
      {
        title: "Ex 15 - Anatomy of an Exemplary Work",
        subtitle:
          "Participants break down their exemplary work into its main components and assess which elements are accessible to an LLM.",
        text: "Participants map key influences, professional constraints, and dependencies of their chosen text's underlying structure. A layered dependency graph helps distinguish which elements are <b>accessible to an LLM</b> and which remain <b>beyond its reach</b>.",
        picture: photos.Ex_15,
        exNum: 15,
      },
      {
        title: "Ex 16 - Obstacles, Dead Ends, Highways",
        subtitle:
          "Participants examine key moments in navigating the LLM: obstacles, dead ends, and highways.",
        text: "By identifying <b>challenges that can be overcome</b> through iteration or adapting a prompt, <b>situations where the LLM fails</b> to generate meaningful progress despite repeated attempts, and <b>effortless response generation</b>, participants discover patterns in their experiences and develop a clearer sense of when to persist, pivot, or abandon a strategy.",
        picture: photos.Ex_16,
        exNum: 16,
      },
      {
        title: "Ex 17 - Charting Your Path",
        subtitle:
          "Participants sketch three evolving, hand-drawn graphs depicting their learning journey.",
        text: "By mapping output fidelity horizontally and model behavior vertically, the drawing becomes <b>a living diagram</b> of how one navigates challenges, setbacks, and breakthroughs while learning a new skill with the help of an LLM. Detours or derailments become fully visible, thus demonstrating that achieving success with an LLM is far from linear or effortless.",
        picture: photos.Ex_17,
        exNum: 17,
      },
    ],
    bgColor: "#E8D1F2",
    isProjCover: false,
  },
  Card5: {
    Title: "Distilling",
    Question:
      "What story emerges when we look back on our evolving relationship with LLMs?",
    Description:
      "In this final block, participants circle back to the essential aspects of their use of LLMs. Delving into previous exercises, <b>they uncover key features</b> that have remained stable or which have evolved during the course of the experiment, thus producing <b>a detailed overview</b> of the integration of LLMs within their workflow.",
    IndexNum: 5,
    CoverImg: capitolsCover.coverDistilling,
    Content: [
      {
        title: "Ex 18 - Distilling the Vademecum",
        subtitle:
          "Participants synthesize their own perspective on the entire experiment into a cohesive narrative.",
        text: "This exercise encourages <b>the creation of a personal booklet</b> that combines selected pages from the vademecum with additional notes, sketches, and digital traces. This curated archive serves as <b>a storytelling device</b> capturing key moments, doubts, and insights that have shaped the participant’s evolving relationship with LLMs.",
        picture: photos.Ex_18,
        exNum: 18,
      },
    ],
    bgColor: "#FFCE93",
    isProjCover: false,
  },
};

const alterEgosDb = {
  Card1: {
    Title: "Ecologies of LLM Practices",
    CoverImg: general.googleSupport,
    Id: "project",
    Description:
      "The booming rise of <b>large language models (LLMs)</b> such as ChatGPT has sparked a rush to produce discourse about these technologies. The quick crystallisation of a shared outlook around a few key themes has <b>narrowed the scope</b> of potential interrogations.<br><br>Public and scientific debates focus on technical issues: algorithmic bias, confabulation, and intellectual property violations. However, the problems and consequences associated with their <b>actual use</b> – for both their users and their professional contexts – remain largely unexplored. This asymmetry fuels a <b>mechanical view</b> of technological development and its effects, as if the technical analysis of these systems were enough to predict their social impact.<br><br>Moreover, these discourses present AI as a <b>monolithic and disruptive</b> entity, dismissing the possibility that it may be aligned with existing practices and that its effects may vary depending on situations encountered in one's job. There is thus an <b>urgent need</b> to move beyond predictions about the future of work, to account for the professional contexts in which LLMs are used, and to identify <b>current issues</b> – not prospective ones.<br><br>How do AI's well-known problems (bias, confabulation, etc.) manifest in established practices? What new, unexpected problems are surfacing? How do LLMs shape individual work practices? And in turn, how do professional environments shape LLMs and their use?",
    Question: "How can we reframe the role of LLMs in ordinary work practices?",
    IndexNum: 1,
    bgColor: "#000000",
  },
  Card2: {
    Title: "Objective",
    Id: "objective",
    CoverImg: general.logoImage_white,
    Question:
      "How do professionals evaluate, adapt to, and perceive LLMs in their work?",
    Description:
      'To answer these questions, the Ecologies of LLM Practices (EL2MP) project creates research areas dedicated to workers for them to document and reflect on their use of LLMs. Our investigation aims to highlight the "savoir-faire", expertise, and values of workers rather than those of AI designers or economic decision-makers.<br><br>The project aims to scrupulously examine how LLMs fit into various professional practices. EL2MP will investigate how users relate to LLMs in terms of:<br><b>Evaluation - </b> How do professionals assess the value LLMs add or remove?<br><b>Effort - </b> What new kinds of work do LLMs require from their users?<br><b>Perception - </b> How do workers evaluate and perceive LLMs over time as they continue working with them?',
    IndexNum: 2,
    bgColor: "#1F1F1F",
  },
  Card3: {
    Title: "Methodology",
    Id: "methodology",
    CoverImg: general.logoImage_white,
    Question: "A necessary project in today's research landscape on LLMs",
    Description:
      "To carry out the project, we developed an <b>experimental research protocol</b> based on the <b>active involvement</b> of participants. The fruit of a <b>collaboration</b> between sociologists, science and technology researchers (STS), and designers, this protocol aims to create:<br><br><b>Room for hesitation - </b> Through a series of exercises, the protocol provides participants with various means of <b>documenting and reflecting</b> on their use of LLMs. We aim to establish a framework where <b>doubt and hesitation</b> are not only accepted but encouraged. Some exercises introduce <b>deliberate pauses</b> in professional routines, causing participants to take a <b>step back</b> from their own practices: during these pauses, judgment is suspended, giving users enough room to <b>question</b> their instinctive habits and feel unsure about what they once thought was certain. Other exercises aim to <b>intensify the use of LLMs</b> to shed light on what would otherwise remain too subtle to be perceived.<br><br><b>An ecological archive of practices - </b> The digital traces from LLM use serve as the <b>starting point</b> for the exercises we designed. They are <b>analysed, contextualised, and discussed</b> individually and collectively. Through this process, participants progressively build a <b>multimodal archive</b> (audio, photos, videos, drawings, and logbooks) that tangibly reflects their LLMs experience and how they are incorporated into various <b>professional norms</b> and material configurations.<br><br><b>A workbook (vademecum) - </b> The workbook collects all the exercises and their instructions, organized into <b>thematic blocks</b>. Designed as a <b>modular object</b>, where pages can be added or removed as needed, it accompanies each participant throughout the protocol. The vademecum serves as both the <b>material support</b> for the protocol and the project's means of <b>dissemination</b>, as it can be reproduced and adapted in various academic and professional contexts.",
    IndexNum: 3,
    bgColor: "#2C2C2C",
  },
  Card4: {
    Title: "Contact",
    Id: "contact",
    Question: "Our Team",
    Description:
      '<b>Donato Ricci</b>: <a href="https://medialab.sciencespo.fr/en/people/donato-ricci/" target="_blank" style="text-decoration: underline;">Principal Investigator, Designer</a><br><b>Contact</b>: <a href="mailto:donato.ricci@sciencespo.fr" target="_blank" style="text-decoration: underline;">donato.ricci@sciencespo.fr</a><br><br><b>Gabriel Alcaras</b>: <a href="https://medialab.sciencespo.fr/equipe/gabriel-alcaras/" target="_blank" style="text-decoration: underline;">Postdoctoral researcher, Sociologist</a><br><b>Contact</b>: <a href="mailto:gabriel.alcaras@sciencespo.fr" target="_blank" style="text-decoration: underline;">gabriel.alcaras@sciencespo.fr</a><br><br><b>Tommaso Prinetti</b>: <a href="https://medialab.sciencespo.fr/equipe/tommaso-prinetti/" target="_blank" style="text-decoration: underline;">Research Assistant, Designer</a><br><b>Contact</b>: <a href="mailto:tommaso.prinetti@sciencespo.fr" target="_blank" style="text-decoration: underline;">tommaso.prinetti@sciencespo.fr</a><br><br><b>Zoé de Vries</b>: <a href="https://medialab.sciencespo.fr/equipe/zoe-de-vries/" target="_blank" style="text-decoration: underline;">Research Assistant, Linguist</a><br><b>Contact</b>: <a href="mailto:zoe.devries@sciencespo.fr" target="_blank" style="text-decoration: underline;">zoe.devries@sciencespo.fr</a>',
    IndexNum: 4,
    bgColor: "#3A3A3A",
  },

  Card5: {
    Title: "Co-Inquirers",
    Question:
      "We would like to thank all co-inquirers who took part in our protocol. Without their participation, our project could not have been developed.",
    Description:
      "Clara Demarty-Coadic<br>François Lambert<br>Josephine Preißler<br>Léa Stephan<br>Lukas Brand<br>Mathilde Blanchon<br>Thérèse d'Orléans<br>Yajing Hu",
    IndexNum: 5,
    bgColor: "#444444",
  },
};

const floatersDb = {
  Floater1: {
    Title: "cards_presentation.webm",
    id: 1,
    category: "video",
    media: floaters.Prompting_floater_1,
    file: "documents/template.pdf",
    parent: "Prompting",
  },
  Floater2: {
    Title: "card_closeup.webm",
    id: 2,
    category: "video",
    media: floaters.Prompting_floater_2,
    href: "",
    parent: "Prompting",
  },
  Floater3: {
    Title: "filming_from_above.jpg",
    id: 3,
    category: "image",
    media: floaters.Prompting_floater_3,
    href: "",
    parent: "Prompting",
  },
  Floater4: {
    Title: "tracking_shifts.jpg",
    id: 4,
    category: "image",
    media: floaters.Prompting_floater_4,
    href: "",
    parent: "Prompting",
  },
  Floater5: {
    Title: "collective_work.webm",
    id: 5,
    category: "video",
    media: floaters.Qualifying_floater_1,
    href: "",
    parent: "Qualifying",
  },
  Floater6: {
    Title: "first_session.webm",
    id: 6,
    category: "video",
    media: floaters.Qualifying_floater_2,
    file: "documents/template.pdf",
    parent: "Qualifying",
  },
  Floater7: {
    Title: "presenting_results.jpg",
    id: 7,
    category: "image",
    media: floaters.Qualifying_floater_3,
    href: "",
    parent: "Qualifying",
  },
  Floater8: {
    Title: "recording_sessions.jpg",
    id: 8,
    category: "image",
    media: floaters.Qualifying_floater_4,
    href: "",
    parent: "Qualifying",
  },
  Floater9: {
    Title: "presenting_results.jpg",
    id: 9,
    category: "image",
    media: floaters.Excelling_floater_1,
    file: "documents/template.pdf",
    parent: "Excelling",
  },
  Floater10: {
    Title: "sharing_notes.webm",
    id: 10,
    category: "video",
    media: floaters.Excelling_floater_2,
    href: "",
    parent: "Excelling",
  },
  Floater11: {
    Title: "working_together.webm",
    id: 11,
    category: "video",
    media: floaters.Excelling_floater_3,
    href: "",
    parent: "Excelling",
  },
  Floater12: {
    Title: "explaining_the_exercise.webm",
    id: 12,
    category: "video",
    media: floaters.Excelling_floater_4,
    href: "",
    parent: "Excelling",
  },
  Floater13: {
    Title: "judgment_session.webm",
    id: 13,
    category: "video",
    media: floaters.Benchmarking_floater_1,
    href: "",
    parent: "Benchmarking",
  },
  Floater14: {
    Title: "commenting_the_playground.webm",
    id: 14,
    category: "video",
    media: floaters.Benchmarking_floater_2,
    href: "",
    parent: "Benchmarking",
  },
  Floater15: {
    Title: "designing_the_block.jpg",
    id: 15,
    category: "image",
    media: floaters.Benchmarking_floater_3,
    href: "",
    parent: "Benchmarking",
  },
  Floater16: {
    Title: "working_on_the_judgment.jpg",
    id: 16,
    category: "image",
    media: floaters.Benchmarking_floater_4,
    href: "",
    parent: "Benchmarking",
  },
};

const tediumData = {
  About: {
    Title:
      "<i>Tedium:</i> archival exhibition <br>at <i>“Hype! Studies”</i>  Barcelona",
    Subtitle:
      "Tedium is an interactive visual exposition presented aat the Hype Studies! conference in Barcelona, between 10-12 September 2025. It is a curated exploration of the multimodal archive generated during the Ecologies of LLM Practices project.",
    Questions:
      "Do workers engage with these systems differently than managerial narratives of optimisation and cost reduction suggest? And how do they navigate the capacities of these tools, making sense of their results?",
    Description:
      "To answer these questions, we shift our attention away from the perspectives of developers and toward the lived expertise, values, and tactics of workers. We attempted to establish the conditions under which the use of LLMs can be described within the specific professional norms and material conditions—what we refer to as their ecologies. We explore where the need to prompt arises, how outputs are handled, and what it means to engage with LLMs not as tools, but as technologies-in-use. We designed a participatory, experimental research protocol that is open to reproduction and adaptation through collaborations among sociologists, STS scholars, and design researchers. Over six- to eight-month cohorts, we worked with 40 professionals as co-inquirers. Through regular meetings and collaborative exercises, we introduced intentional pauses into everyday routines, creating space for reflection on the role and impact of LLMs. These encounters generated a multimodal archive—comprising audio, images, drawings, and chat logs—that captures the textures of LLMs-in-use.<br>Tedium is a curated exploration of this archive. Composed of five scenes, it follows the arc of our inquiry from the first meeting to the closing conversation. Each scene has a dual structure: a description, featured in the video installation, evokes the rhythms of our weekly sessions; and a commentary, presented in the following pages, offers interpretations, conceptual links, and analytical reflections that extend beyond participants' formulations.<br>What emerges departs sharply from narratives of automation or seamless delegation. LLMs do not simply accommodate users: they require accommodation. They fragment workflows, produce verbose outputs, and introduce new layers of interpretive and evaluative labour. Rather than streamlining work, they often multiply it, flattening nuance and amplifying tedium. While many co-inquirers found LLMs helpful, the promised gains in productivity proved elusive: more work, not necessarily better work. Yet amid these tensions, a quieter form of value appeared. The LLM, alien yet patient, provided a space for “silly work,” for emotional scaffolding, for low-stakes experimentation. Its judgment-free presence created rare permission to hesitate, to play, to think aloud. Far from the hyperbolic claims of disruption and efficiency, this value was grounded in practice, not promise. Anything but hype!",
  },
  Team: [
    {
      name: "Gabriel Alcaras",
      email: "gabriel.alcaras@sciencespo.fr",
    },
    {
      name: "Donato Ricci",
      email: "donato.ricci@sciencespo.fr",
    },
    {
      name: "Tommaso Prinetti",
      email: "tommaso.prinetti@sciencespo.fr",
    },
  ],
  Scene1: {
    Title: "September - October 2024 − Expectations",
    Commentary:
      "Our co-inquirers met for the first time in late September 2024. They gathered around a simple table, as they would do each Monday for six months.<br>Agnès has a background in literature and is building a career in international relations. She said, “One lives perfectly well without technology.” Yet, she has chosen to take a closer look at LLMs, cautiously, by participating in the project, drawing on her experience in diplomacy and policy writing.<br>To her right, Constance listens quietly. An economist by training, she previously worked as a research assistant for a renowned French economist, cleaning data and exploring datasets. These are tasks she believes could and hopes will be automated, opening up space for more meaningful work.<br>Two seats down, Camille leans forward slightly. She’s becoming a lawyer and has tried using ChatGPT for various tasks outside the classroom: creating hiking itineraries, recipes, and casual plans. She understands its limitations well. “For academic work, honestly, it’s not that useful,” she thinks.<br>Next to her, Alice sits upright in a neatly tailored blazer. She has no ChatGPT account, but she borrows it from a friend. “Sometimes it feels too real,” she says. “I don’t like the illusion of talking to a person.” An occasional user, Alice, keeps her distance. Her real passion lies elsewhere. She hopes to become an auctioneer.<br>Toward the end of the table, Yichen remains silent, observing with reserved attentiveness. A student in public policy with a focus on technology regulation, his beliefs echo long-termist framings popularised by institutions like the Future of Humanity Institute. Generative AI, he suggests, could change the future of intelligence itself.<br>Across from him, Tobias scrolls on his laptop screen. Training in digital public policy, he once used ChatGPT to write a Python crawler for YouTube and describes LLMs as amplifiers, powerful if you already know what you’re doing. He speaks with reserved precision, approaching AI from a rational perspective.<br>Guillaume sits with one leg tucked beneath him, a loose strand from his catogan falling over his shoulder. The geekiest of the group, he brings a chemistry background into his current training in environmental urbanism. He approaches AI with a tinkerer’s ethic, informed by a faintly anti-capitalist sensibility. He fills the room with his humorous presence.<br>A few seats away, Charlotte’s leather jacket rests on the back of her chair, its patches visible in the folds, among them a pro-Palestine badge. Trained in human rights law and shaped by her upbringing in an industrial East German city, she has developed a lasting interest in the rights of migrants. Machine translation, she says, could be a lifeline in refugee contexts. But no algorithm, in her view, should replace moral discernment.<br>Despite their varied backgrounds, beliefs, and experiences, the group shared two recurring expectations: that these tools could help them save time and alleviate the repetitive, low-value tasks that clutter their professional routines. At the same time, many felt like relative novices: uncertain about how to use these tools effectively yet eager to test capabilities they had heard so much about.",
    Caption:
      "In writing this scene—as with those that follow—we sought to recreate the atmosphere of being in a room together: sharing, contrasting, and reflecting on experiences. These collective sessions, the protocol’s weekly anchor, were made possible by quieter, solitary engagements with LLMs. Each week, participants dedicated one to two hours—alone or in groups—to one of eighteen structured exercises designed to prompt reflective practice. It was a sustained investment of time and attention.<br>These conversations were inseparable from the slow accumulation of experience. Each participant brought their own situated practice into the room. Discussions were grounded in specific examples, avoiding abstraction unless it was tied to practical use. Over time, the group became more adept at articulating concrete insights, supported by the regular rhythm of individual and collective sessions. Researchers refined the exercises; participants grew more comfortable voicing direct, sometimes messy reflections.<br>Speaking about practice is never straightforward. Work is fractured, overlapping, and often contradictory. Retrospective accounts impose coherence, shaped by what we think we should have done rather than what we did. LLMs promise to streamline this mess—to purify work.<br>Ironically, this first scene highlights the absence of practice. It captures our initial meeting, before exercises began, when discussions circled balanced impressions—bias, confabulation, and environmental costs. But deeper expectations emerged only later, through lived use. Some participants, surprised by the limits of LLMs, realised they had held unspoken hopes. LLMs, it turned out, were not magic. Yet for some, it took using them to recognise that they had ever imagined they might be.",
  },
  Scene2: {
    Title: "November-December 2024 − Discretisation",
    Commentary:
      "Using an LLM involves making choices: when to engage it and for what purpose. Despite the hype about LLMs being able to do anything, the chat interface reveals a core truth: we still have to ask! Everything must be funnelled through a narrow text box. This isn’t just a technical limitation (like token limits) but a cognitive one: work must be reframed, described, and justified. Before the LLM can be helpful, we must summarise and select aspects of our work to fit this tight window. We call this discretisation—breaking work into smaller, more manageable parts that the LLM can process. Participants initially gravitated toward tasks that required little or no discretisation: pre-structured, self-contained activities like grammar checks, translations, or summaries. Many were already familiar with using services like Google or DeepL for these tasks. Others leaned on existing divisions of labour. In domains with standardised formats or templates, the LLM integrated more easily.<br>But the LLM didn’t just slip into pre-structured workflows. It actively encouraged participants to fragment their work further. Some opened new chats for each task to keep things clear. Yet not all tasks could be discretised. Some were too expansive, slow, or rooted in tacit knowledge to be rendered as text. For these, the act of breaking them down could exceed the effort required to complete the task itself.<br>The effort to break them down exceeded the work required by doing them directly. This effort can lead to near exhaustion, with no results to show in return.",
  },
  Scene3: {
    Title: "January 2024 − “Discretisation”",
    Commentary:
      "From the onset of the protocol, we asked participants: What tasks do you do with LLMs? What else could you use them for?<br>Most first turned to clearly defined tasks already supported by technological services, such as Google and Wikipedia for research, DeepL for translation, or Stack Overflow for coding. ChatGPT seems to replace them all, akin to a convenience store. Everybody appears to appreciate the time it saved.<br>Some participants relied on what LLMs were “good at”, depending on what they picked up from the media, friends, or colleagues. Nearly everyone used ChatGPT to “paraphrase.” Using it for coding purposes was also widespread. “It’s good at it,” they heard, because it had been trained on a lot of code. But coding was mostly seen as a means to achieve a more valuable end. Constance said she didn’t care if her code was pretty or fast, only that it ran. Tobias went further, rejecting the idea of coding as “creative” work: “I think for me, it’s more like implementing something I've already set out. I did my research design, so I kind of mapped out the process of data collection or data analysis. It feels like I’ve already put the thought into how I wanted to do it, and then I just tell it [ChatGPT] to implement.”<br>Participants also built on the existing division of labour to assign tasks to an LLM. As such, researchers quickly sought to test the accuracy of literature reviews. Yichen found ChatGPT “incredibly efficient, especially in the writing of [quantitative] social science essays since they tend to be standard in format.” At the same time, Charlotte noticed that “they're quite good when it comes to referencing with rigid guidelines. So if there’s something really clear, like a formula for how to do referencing, for example, it usually can do that.” Most agreed that LLMs performed best on standardized tasks, governed by precise rules.<br>Over time, however, participants began to push beyond these obvious use cases. In law, for instance, Alice realised that what she thought of as a single task was too unwieldy for an LLM. What felt like one smooth action to her had to be broken into smaller, more manageable steps: “I think one of the key things to get proper results is really to dissect every part of what you want to reflect on and go step by step. Because even if you give the big picture at the beginning and then try to break it down, it tends to try to do everything at once. I mean, it was really confused.”<br>Camille viewed many of her tasks as long-term processes, cumulative in nature, which didn’t translate well to the kind of short-term, local, iterative problems LLMs seemed able to tackle: “LLMs have difficulty following a progressive and logical approach over the long term. At first, I thought, ‘OK, law mostly relies on logic, and even on reasoning that’s very close to mathematics, so LLMs could be really good at it’. But working with them showed me that it's often very hard for the machine to build on previous versions, to integrate feedback. And since my work required that kind of continuity, sometimes the long process became the most frustrating aspect of the project. [...]<br>That’s a more global kind of reasoning. [...] And I think the LLM doesn’t really do that, because it responds to specific prompts and tasks. So when, at the end, you ask for a global answer, it struggles.”<br>After all, this was a disappointing reminder for participants that their jobs were not so easily automated. “I thought my work would be simpler,” Guillaume reflected. “Something so standardized that an LLM would handle it quickly. But actually, it wasn’t.”<br>Charlotte introduced a metaphor that resonated with many: working with an LLM felt like trying to fit your job into a “small window.” Even the act of framing a task is a hassle: “Yeah, I think… Do you ever feel that too? Because I keep struggling with it, like… The window to put in the information and all the context just feels so small. Like, sometimes, you don’t even know how to fit everything in. The struggle already starts with just trying to frame it.”<br>Fitting information within the “small window” was challenging because it wasn’t just a matter of providing more context to an LLM, as too much context could backfire. Constance noticed that overloading the prompt “creates noise in the response—like it's farther from what I actually want than if I just provide one document with a more precise question.” This insight led her to change strategy: “Now I use way more separate chats to get more precise responses.”",
    Caption:
      "Even after participants had managed to discretise their work, a deeper challenge remained: getting the LLM to do what they wanted. The issue wasn’t what the model could do in theory, but whether users could control its behaviour in practice. Most settled for outputs that were “good enough,” yet what frustrated them more was the inconsistency. Results felt random and unreliable. The problem was less about capacity than about control. Many assumed this unpredictability was due to their lack of prompting skill. They believed experience would help them tame the system. But mastery came at a cost. Participants had to closely monitor outputs, evaluate responses, and repeatedly adjust prompts. While faster than writing from scratch, this process was cognitively draining.<br>Prompting emerged as the most taxing part. Failures often exposed unspoken assumptions, forcing participants to spell out what they thought was obvious. Translating tacit knowledge or professional intuition into literal prompts proved unexpectedly exhausting, revealing the extent to which workplace communication relies on shared context. And prompting felt uniquely unrewarding. As Agnès described, it was like standing on “shaky ground”. Even well-crafted prompts could produce random-feeling outputs. Minor tweaks rarely led to significant improvements. Many likened ChatGPT to a blunt knife: imprecise and unpredictable.<br>Ultimately, few saw LLM use as skilled labour. While tricks could be learned, there was no clear path to mastery. The model offered little feedback or recognition, making the effort feel futile, like throwing work into a void. Over time, this eroded motivation and discouraged further experimentation.",
  },
  Scene4: {
    Title: "February 2024 − “Cluttering”",
    Commentary:
      "No one enjoyed using LLMs. As researchers, this caught us off guard. Two months into the study, we expected some participants would have fun getting better answers from the machine. Guillaume was the ideal candidate who could enjoy the process. He had gained a bit of a reputation for how playfully and inventively he pushed the machine’s limits. But even he declared: “No, there’s no joy in it because I don’t want to prompt the machine to do it. I just want the machine to do it. I don’t want to have a role in the process. My ideal AI would be the one that automatically knows when to send an email, sends it, and just gets it out of my head.”<br>Prompting was a chore, something to skip whenever possible. The goal was to paste the content, press Enter, copy the output, and proceed. Participants rarely bothered with careful prompting unless something went wrong. On the topic of getting help with the LaTeX language, Constance confided: “I didn’t try to perfect my prompts for this type of task, as the responses were generally satisfactory, even with very implicit formulations.”<br>A quick review of their prompts confirmed this carelessness. Participants acknowledged they were full of typos, hastily written, and awkwardly phrased. Regarding prompting techniques, many preferred simple ritual phrases over complex strategies. Tobias explained: “I especially love [the] emotional stimuli [technique], because no matter the prompt, just adding ‘this is very important for my work’ already leads me to believe I put sufficient effort in maxing out the LLM.”<br>Evaluating outputs posed another challenge. As participants encountered more frequent confabulations, they grew increasingly wary of their answers. While the machine sped up the act of writing, it multiplied the work of reading. With chatty models, like ChatGPT, the vigilance required became exhausting. Many participants worried about the sustainability of providing such constant attention, afraid that fatigue might wear them down over time.<br>Evaluation became even trickier when an LLM convincingly mimicked professional voices. Camille noted ChatGPT’s ability to sound lawyerly, and Constance felt it could pass as a typical economist, making errors harder to catch.<br>Participants coped by turning towards tasks that were easier to evaluate. Some, like Charlotte, preferred tasks with “a certain baseline of reference”, in which they had enough prior experience to judge the result quickly. For others, tasks outside their expertise offered relief, either because they didn’t care or knew less about them. Unburdened by expert knowledge, their evaluation employed more straightforward criteria, making it less cognitively demanding.<br>Yet, despite efforts to minimise prompting, some tasks inevitably required more careful crafting. This usually happened when participants believed initial effort would yield general prompt setups that could be reused in other conversations. Agnès discovered early on that crafting precise prompts tends to produce better results, making the initial effort a worthwhile investment: “I think I tend to do quite detailed prompts because I want the LLM to be effective. I really put a lot of information in it. When we did the first experiments with this group, I asked more general questions and I got a lot of hallucinations with ChatGPT.”<br>A recurring challenge was setting the proper context. Participants preferred quick, role-play-based prompts, such as “you’re a social media marketing expert”, rather than a detailed explanation of what constituted expertise. It was easier “to make GPT-4 believe it’s an expert on the topic” than doing the work of context-setting, which “takes a lot of energy and thought I am sometimes too lazy to do”.<br>Another source of difficulty was understanding why the LLM didn’t perform well. Constance describes her frustration: “I didn’t have the tools to understand the breakdown, and so I couldn’t solve the problem.” The core challenge lay in choosing the right words, whether it was articulating what felt off in the machine’s reply or describing precisely what they wanted. Guillaume arrived at a point of wordlessness: “I just didn’t really know what to say to it anymore.” Agnes described a similar dead-end when she realised she didn’t know enough about the subject matter to address an LLM adequately: “when the result is too general, and I don't know enough about the subject to ask more precise questions, I feel like I'm at a dead end, because I can't choose a new path of questions.”<br>Trying harder to perfect prompts often intensified frustration, especially when participants couldn’t gauge if their alterations improved results. Tobias ultimately determined that prompting techniques were almost closer to superstition than engineering.<br>Agnes shared: “[At the beginning], I thought I could kind of adjust how it worked. But in the end, I found that the more I tried to get a precise formulation, the more random the results became. I had this experience while trying to get it to use one specific word, ‘populism’, and the more I pushed for that, the weirder the answers got. I had no way of knowing how to influence the outcome. So it gave me this kind of feeling of absurdity, which was surprising, because I actually expected the opposite by the end of the experiments.”<br>Not everyone agreed. Some felt they could learn, adapt, and sometimes get better results. But even those whose results improved often found the extra effort unrewarding. Camille captured this common experience: “There’s this moment when I realize, after giving multiple instructions, clarifying, or rephrasing, that ChatGPT is giving me completely off-topic information. I end up feeling really frustrated and give up, out of lack of time and motivation. [...] ChatGPT just doesn’t understand what I asked, despite all my efforts.”",
    Caption:
      "What first appeared as a general-purpose machine capable of anything gradually revealed itself as merely generic, unable to inhabit the specificity of professional worlds truly. Participants had hoped the LLM would adapt over time, shaped by their practices like a rock in a river. Instead, it behaved more like a buoy: fixed in place, bobbing with each prompt, but untouched by the current. Always available, occasionally helpful, but ultimately unresponsive. It did not shift, learn, or integrate. Over time, participants stopped expecting adaptation and began relating to it as something static: an alien presence within their routines, not hostile, but unmistakably other.<br>As this perception solidified, expectations shifted. Participants reassessed what the LLM could offer. Ironically, its very alienness opened space for unexpected forms of value. One was what Charlotte called silly work: not meaningful for its output, but for the support it offered. In these moments, the LLM’s limitations—its lack of memory, its shallow contextual grasp—created a kind of present-tense intimacy. It became a space that felt emotionally safe, detached from institutional or social judgment.<br>Silly work initially emerged in private logs, rather than group discussions, revealing how it served as a refuge from professional scrutiny. Participants could ask what they wouldn’t dare voice to a colleague or superior. When Charlotte was anxious before a call, or Constance needed reassurance in technical tasks, the LLM offered quiet companionship. Its value lay not in performance, but in presence. A shift had occurred—from viewing the LLM as a tool of productivity to recognising it as an alien companion.",
  },
  Scene5: {
    Title: "March-April 2025 − “Attunement”",
    Commentary:
      "As months pass, participants grow more confident that ChatGPT won’t replace them. Some even begin to wonder if LLMs were ever genuine contenders. At first, many treated the AI like a fellow expert. Now, they speak to it as if it were an alien—someone unfamiliar with their field. Camille realised this shift the day she noticed how similar prompting felt to explaining the basics to a clueless and stubborn client, rather than collaborating with a seasoned colleague: “The most difficult part of legal reasoning is reformulating. When you have a client coming in with a question that's all over the place, and you have to figure out what the actual problem is, and then explain it. And with the LLM, it was kind of the same, because we always had to explain it again. You can’t really assume that you're talking to a lawyer.”<br>Their main frustration isn’t that the AI falls short of professional standards. It doesn’t seem able to adapt. No matter how carefully they prompt or how much context they provide, the LLM fails to improve its performance. Camille compared LLMs to non-socialised interns. Sure, they can handle repetitive tasks, like sorting and renaming files, but they don’t “know” how to behave. Unlike good interns, LLMs don’t learn through context or observation. She puts it bluntly: an intern would “revise her emails five times” without being told. An LLM has to be reminded of instructions incessantly.<br>Agnes recalled her internship at an embassy when Charlotte challenged her. “Colleagues make mistakes too, so how are they different from ChatGPT?”. Agnes replied: “I think I distrust the machine more, and maybe I’m just biased, because it's probabilistic—I really don't think it understands. But if it's a colleague or an intern, that person can still learn, and you can actually teach them how to do it.”<br>Many agreed. It’s not the mistakes that bother them; it’s the lack of a learning process.<br>Yet, for some, LLMs as an alien presence in their professional world makes them valuable. Alice appreciates that ChatGPT isn’t part of her social or work circle. As she once told the group: “It's kind of a tool you can use anytime, day or night. So you develop a certain kind of strange relationship with the LLM, and it feels safe to ask it any question, even the kind of question you might feel stupid asking someone else. You don't feel like you're going to be judged afterwards, even if you say something dumb.”<br>This type of task was so vital to Charlotte that she referred to it as “silly work.” In a moment of vulnerability, she confided to the group that to calm her anxiety before phone calls, she would ask ChatGPT for a short script. She rarely used it, but just having it there made her feel prepared. The ritual itself mattered more than the result. She explained: “I always feel a bit weird telling people that I still write myself notes before making a phone call. It’s like, yeah, maybe in the professional world there’s this kind of judgment. Like, you can’t even make a call without prepping? So that’s why it feels lower stakes to do it with something like ChatGPT than to just do it on my own. I could do it myself, but it would take a lot of time. And I’d probably feel a bit guilty spending so much time on a task that, in the end, maybe I don’t even need, because I often don’t even look at the notes that much. But because it gives me a sense of security, and because it’s fast with ChatGPT, it kind of resolves that tension.”<br>Though Charlotte was the first to label it, we had encountered this kind of “silly work” long before in others’ private written logs. Constance and Agnes also described turning to ChatGPT for reassurance, precisely because it wasn’t part of their social world. For Constance, an economist who felt intimidated by programming, LLMs offered patient support that made her feel capable again. For Agnes, the value wasn’t in doing more or faster, but in feeling at ease: you do not go “further” with the LLM, just “more serenely.”",
    Caption:
      "Rather than liberating participants from low-value labour, the LLM subtly redefined their relationship to it. Like a low-pass filter in signal processing, it amplified low-intensity, repetitive tasks while dampening those requiring sustained attention or creativity. What remained visible was the background hum of uninteresting work.<br>This shift wasn’t just about content. It changed the texture of work itself. Tasks increasingly unfolded through dialogue and copy-paste exchanges. People no longer wrote texts; they moved them, circulated them. As Constance put it, she felt like an interface, relaying code or curating prompts without the sense of having made anything.<br>By the final session, some worried that this filtering effect had become embedded in habit. What began as a choice now felt like a default. The ethical question “should I use this?“ blurred into routine. The LLM was always present, whether used or not. Using it was effortless; resisting it took conscious effort. Even refusals added labour: weighing options, justifying abstention, and staying alert to its pull had become part of the workflow.<br>These insights only emerged over time, through shared analysis and collective dialogue. Many knew that their peers were using LLMs, but rarely discussed the specifics. Usage was often wrapped in secrecy or shame, making it hard to articulate. Yet opening space for these conversations proved essential. They revealed vulnerable practices and allowed for reflection on what LLMs were displacing. These scenes underscore the need for collective spaces of reflection—spaces that only emerge through long-term, trust-based engagement and shift away from hype.",
  },
};

const inquirers = [
  "Anna lèa Vrinat",
  "Enora Floc'h",
  "Faîza Said",
  "Jérémy Tran",
  "Milan Otal",
  "Nicolas Lioi-Nero",
  "Solène Girardet",
  "Béatrice Ababei",
  "Carlotta Poirier",
  "Coralie Moreau",
  "Hannah Rouhaud-Keutgen",
  "Judith Jepkorir",
  "Léa Gambier",
  "Sophie Cazala",
  "Clara Demarty-Coadic",
  "François Lambert",
  "Joséphine Preißler",
  "Léa Stephan",
  "Lukas Brand",
  "Mathilde Blanchon",
  "Thérèse d'Orléans",
  "Yajing Hu",
];

const researchTeam = [
  {
    name: 'Donato Ricci',
    role: 'Principal Investigator, Designer',
    contact: 'donato.ricci@sciencespo.fr',
    url: 'https://medialab.sciencespo.fr/en/people/donato-ricci/',
  },
  {
    name: 'Gabriel Alcaras',
    role: 'Postdoctoral researcher, Sociologist',
    contact: 'donato.ricci@sciencespo.fr',
    url: 'https://medialab.sciencespo.fr/equipe/gabriel-alcaras/',
  },
  {
    name: 'Tommaso Prinetti',
    role: 'Research Assistant, Designer',
    contact: 'donato.ricci@sciencespo.fr',
    url: 'https://medialab.sciencespo.fr/equipe/tommaso-prinetti/',
  },
  {
    name: 'Zoé de Vries',
    role: 'Research Assistant, Linguist',
    contact: 'donato.ricci@sciencespo.fr',
    url: 'https://medialab.sciencespo.fr/equipe/zoe-de-vries/',
  },

]