/* THIS IS GLOBAL_DB.JS 🚀*/
import { photos, capitolsCover, general } from "$database/config.js";
export { cardsDb, floatersDb, projectDescription };

const cardsDb = {
  Card1: {
    Title: "Qualifying",
    Description:
      "Where do LLMs live in our professional practices, norms and relationships?",
    IndexNum: 1,
    CoverImg: capitolsCover.cover_1,
    Content: [
      {
        title: "Exercise 1 - Breaking the Ice",
        subtitle:
          "Where do LLMs live in our professional practices, norms and relationships?",
        picture: photos.image_1,
        text: "Participants sketch how they think an LLM function and present it to the group.",
      },
      {
        title: "Exercise 2 - Taking Stocks",
        subtitle: "",
        text: "This phase involves assessing current strengths and weaknesses. Participants reflect on their achievements, identify growth areas, and discuss obstacles they've faced. Through guided prompts, this exercise promotes self-awareness and sets a foundation for planning future goals. It's a moment for introspection and honest evaluation.",
        picture: photos.image_6,
      },
      {
        title: "Exercise 3 - Bon Anneè",
        subtitle: "",
        text: "Celebrate milestones and set goals for the future. Participants take time to appreciate their progress, acknowledge their accomplishments, and craft personal and professional resolutions. This reflective process aims to boost motivation and provide clarity on the next steps in their journey. It’s about starting the new phase with intention and focus.",
        picture: photos.image_15,
      },
      {
        title: "Exercise 4 - Collaborative Challenge",
        subtitle: "",
        text: "Teams collaborate on solving complex puzzles or scenarios that require creativity and cooperation. The challenges are designed to encourage problem-solving under pressure, fostering teamwork and adaptability. By working together, participants learn to value diverse perspectives and leverage each other's strengths.",
        picture: photos.image_18,
      },
      {
        title: "Exercise 5 - Vision Crafting",
        subtitle: "",
        text: "Participants visualize their ideal outcomes and articulate a clear vision for their personal or professional paths. Through guided exercises, they create vision boards or write detailed descriptions of their goals. This process not only fosters inspiration but also provides a tangible roadmap for future action.",
        picture: photos.image_11,
      },
      {
        title: "Exercise 6 - Feedback Loop",
        subtitle: "",
        text: "Engage in a structured feedback exchange where participants give and receive constructive insights to encourage improvement. Feedback is framed positively to ensure it is both actionable and supportive. This exercise builds a culture of trust and open communication, emphasizing growth over criticism.",
        picture: photos.image_19,
      },
      {
        title: "Exercise 7 - Reflection and Gratitude",
        subtitle: "",
        text: "Participants reflect on their journey, express gratitude for the support they have received, and recognize key lessons learned. Through storytelling and sharing, the group collectively reinforces their achievements. This session closes the exercise series on a high note, with a focus on connection and appreciation.",
        picture: photos.image_13,
      },
    ],
    logoImage: general.logoImage,
    bgColor: "#97D2FB",
    isProjCover: false,
  },
  Card2: {
    Title: "Benchmarking",
    Description: "How do we judge the performance of an LLM?",
    IndexNum: 2,
    CoverImg: photos.image_6,
    Content: [
      {
        title: "Exercise 1 - Breaking the Ice",
        subtitle: "",
        text: "Participants share spontaneous descriptions of abstract images to spark creativity and open their minds to new perspectives.",
        picture: photos.image_7, // Randomly chosen
      },
      {
        title: "Exercise 2 - Taking Stocks",
        subtitle: "",
        text: "This exercise focuses on analyzing visual elements in detail, encouraging participants to articulate their thoughts with precision.",
        picture: photos.image_12, // Randomly chosen
      },
      {
        title: "Exercise 3 - Bon Anneè",
        text: "Reflect on how visual representations influence personal interpretations and compare perspectives within the group.",
        picture: photos.image_3, // Randomly chosen
      },
      {
        title: "Exercise 4 - Visual Storytelling",
        subtitle: "",
        text: "Create narratives based on image sequences, blending imagination and structured communication.",
        picture: photos.image_15, // Randomly chosen
      },
      {
        title: "Exercise 5 - Collaborative Ekphrasis",
        text: "Work in pairs or teams to construct descriptions of challenging visuals, enhancing collaborative analysis and creativity.",
        picture: photos.image_8, // Randomly chosen
      },
      {
        title: "Exercise 6 - Abstract Exploration",
        text: "Dive into abstract images and explore how emotions and context affect interpretation.",
        picture: photos.image_21, // Randomly chosen
      },
      {
        title: "Exercise 7 - Reflective Wrap-Up",
        text: "Participants share their key insights and discuss the power of visual literacy in communication.",
        picture: photos.image_5, // Randomly chosen
      },
    ],
    logoImage: general.logoImage,
    bgColor: "#FB9799",
    isProjCover: false,
  },
  Card3: {
    Title: "InnovationStrategies",
    Description:
      "Exploring modern approaches to foster innovation in organizations",
    IndexNum: 3,
    CoverImg: photos.image_8,
    Content: [
      {
        title: "Exercise 1 - Ideation",
        text: "Generate a wide array of ideas to solve a problem or enhance a product. This exercise encourages free thinking and helps develop creative solutions.",
        picture: photos.image_10, // Randomly chosen
      },
      {
        title: "Exercise 2 - SWOT Analysis",
        text: "Evaluate the strengths, weaknesses, opportunities, and threats related to a new business idea or strategy.",
        picture: photos.image_14, // Randomly chosen
      },
      {
        title: "Exercise 3 - Brainstorming",
        text: "Collaboratively generate ideas to tackle a specific challenge. This exercise encourages participants to think creatively and build on each other's ideas.",
        picture: photos.image_16, // Randomly chosen
      },
      {
        title: "Exercise 4 - Mind Mapping",
        text: "Create a visual representation of thoughts and ideas to explore connections and generate new perspectives on a topic.",
        picture: photos.image_20, // Randomly chosen
      },
      {
        title: "Exercise 5 - Rapid Prototyping",
        text: "Design quick prototypes of ideas to test and iterate rapidly. This exercise promotes agility in the innovation process.",
        picture: photos.image_19, // Randomly chosen
      },
      {
        title: "Exercise 6 - User Feedback",
        text: "Engage users early to collect feedback on prototypes and ideas. This exercise helps refine and improve solutions.",
        picture: photos.image_9, // Randomly chosen
      },
      {
        title: "Exercise 7 - Innovation Pitch",
        text: "Present your innovative ideas to stakeholders and gather feedback on their viability and potential for success.",
        picture: photos.image_18, // Randomly chosen
      },
    ],
    logoImage: general.logoImage,
    bgColor: "#A8E2B4",
    isProjCover: false,
  },
  Card4: {
    Title: "Ekhprasis",
    Description: "Understanding and interpreting data for actionable insights",
    IndexNum: 4,
    CoverImg: photos.image_2,
    Content: [
      {
        title: "Exercise 1 - Data Collection",
        text: "Learn how to collect data effectively, ensuring that it is accurate, reliable, and relevant to your analysis goals.",
        picture: photos.image_11, // Randomly chosen
      },
      {
        title: "Exercise 2 - Data Cleaning",
        text: "Explore techniques for cleaning data, handling missing values, and correcting inaccuracies to prepare it for analysis.",
        picture: photos.image_17, // Randomly chosen
      },
      {
        title: "Exercise 3 - Exploratory Data Analysis",
        text: "Analyze data to uncover patterns, trends, and insights using visualizations and statistical techniques.",
        picture: photos.image_4, // Randomly chosen
      },
      {
        title: "Exercise 4 - Predictive Modeling",
        text: "Learn how to build and evaluate predictive models to forecast future trends or behaviors based on historical data.",
        picture: photos.image_13, // Randomly chosen
      },
      {
        title: "Exercise 5 - Data Visualization",
        text: "Master the art of creating compelling visualizations that communicate data insights clearly and effectively.",
        picture: photos.image_14, // Randomly chosen
      },
      {
        title: "Exercise 6 - Data Interpretation",
        text: "Understand how to interpret the results of data analyses and make data-driven decisions.",
        picture: photos.image_8, // Randomly chosen
      },
      {
        title: "Exercise 7 - Reporting Results",
        text: "Learn how to present data findings in a clear and engaging way to stakeholders, ensuring that the insights are actionable.",
        picture: photos.image_12, // Randomly chosen
      },
    ],
    logoImage: general.logoImage,
    bgColor: "#E8D1F2",
    isProjCover: false,
  },
};

const floatersDb = {
  Floater1: {
    Title: "project-plan.pdf",
    id: 1,
    category: "document",
    Img: "",
    href: "/documents/project-plan.pdf",
  },
  Floater2: {
    Title: "tutorial-video.mp4",
    id: 2,
    category: "video",
    Img: "",
    href: "",
  },
  Floater3: {
    Title: "landscape-photo.jpg",
    id: 3,
    category: "image",
    Img: photos.image_13,
    href: "",
  },
  Floater4: {
    Title: "team-introduction.mp4",
    id: 4,
    category: "video",
    Img: "",
    href: "",
  },
  Floater5: {
    Title: "design-mockup.png",
    id: 5,
    category: "image",
    Img: photos.image_12,
    href: "",
  },
  Floater6: {
    Title: "financial-report.xlsx",
    id: 6,
    category: "document",
    Img: "",
    href: "/documents/financial-report.xlsx",
  },
  Floater7: {
    Title: "coding-tutorial.mp4",
    id: 7,
    category: "video",
    Img: "",
    href: "",
  },
  Floater8: {
    Title: "company-logo.svg",
    id: 8,
    category: "image",
    Img: photos.image_3,
    href: "",
  },
  Floater9: {
    Title: "meeting-notes.docx",
    id: 9,
    category: "document",
    Img: "",
    href: "/documents/meeting-notes.docx",
  },
  Floater10: {
    Title: "holiday-slideshow.mp4",
    id: 10,
    category: "video",
    Img: "",
    href: "",
  },
  Floater11: {
    Title: "https://medialabsciencespo.com",
    id: 11,
    category: "link",
    Img: "",
    href: "",
  },
  Floater12: {
    Title: "extended_logo.svg",
    id: 12,
    category: "image",
    Img: general.enhanced_logoImage,
    href: "",
  },
};

const projectDescription =
  "The Écologies des Pratiques project explores the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. Supported by Google through its commitment to advancing ethical and impactful AI practices, this initiative combines cutting-edge technological tools with critical reflection on their implications. <br><br>At the heart of this project lies a collaborative and interdisciplinary approach, engaging researchers, practitioners, and students from diverse fields. By experimenting with LLMs, we seek to understand their potential as catalysts for new forms of knowledge production and dissemination while addressing the ecological and ethical questions they raise. The project delves into three key areas: <br><br> Technological Experimentation: By integrating LLMs into practical workflows, we assess how these tools reshape academic and professional practices. From creative writing to data analysis, the project tests the boundaries of LLMs' generative capabilities.<br><br> Critical Reflection: Alongside experimentation, we foster discussions on the broader societal and ecological implications of LLM adoption. What are the costs and benefits of scaling these technologies? How do they challenge or reinforce existing structures of knowledge and power?<br><br> Community Building: Through workshops, public events, and collaborative platforms, we aim to build a community of thinkers and makers who can collectively imagine and shape the future of AI-driven practices.<br><br> With Google’s support, Écologies des Pratiques not only investigates the possibilities of LLMs but also critically examines their role within contemporary ecological, cultural, and institutional systems. By bridging technological innovation and critical inquiry, this project seeks to illuminate how these powerful tools can contribute responsibly to a sustainable and inclusive future.";
