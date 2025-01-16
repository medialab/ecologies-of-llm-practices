/** @type {import('./$types').PageLoad} */

export const prerender = true;

export const trailingSlash = "always";

import backgroundImage from "$media/Dot_background.png?enhanced";
import logoImage from "$media/logo_complete.svg";
import circle_logo from "$media/CIRCLE.svg";
import enhanced_logoImage from "$media/enhanced_logoImage.png?enhanced";

import CoverImg from "$media/photos/img1.jpg?enhanced";

import image_1 from "$media/photos/img1.jpg?enhanced";
import image_2 from "$media/photos/img2.jpg?enhanced";
import image_3 from "$media/photos/img3.jpg?enhanced";
import image_4 from "$media/photos/img4.jpg?enhanced";
import image_5 from "$media/photos/img5.jpg?enhanced";
import image_6 from "$media/photos/img6.jpg?enhanced";
import image_7 from "$media/photos/img7.jpg?enhanced";
import image_8 from "$media/photos/img8.jpg?enhanced";
import image_9 from "$media/photos/img9.jpg?enhanced";
import image_10 from "$media/photos/img10.jpg?enhanced";
import image_11 from "$media/photos/img11.jpg?enhanced";
import image_12 from "$media/photos/img12.jpg?enhanced";
import image_13 from "$media/photos/img13.jpg?enhanced";
import image_14 from "$media/photos/img14.jpg?enhanced";
import image_15 from "$media/photos/img15.jpg?enhanced";
import image_16 from "$media/photos/img16.jpg?enhanced";
import image_17 from "$media/photos/img17.jpg?enhanced";
import image_18 from "$media/photos/img18.jpg?enhanced";
import image_19 from "$media/photos/img19.jpg?enhanced";
import image_20 from "$media/photos/img20.jpg?enhanced";
import image_21 from "$media/photos/img21.jpg?enhanced";
import { mergeAlias } from "vite";
import { id } from "date-fns/locale";

const cardsDb = {
  Card1: {
    Title: "Qualifying",
    Description:
      "Where do LLMs live in our professional practices, norms and relationships?",
    IndexNum: 1,
    CoverImg: image_3,
    Content: [
      {
        subtitle: "Exercise 1 - Breaking the Ice",
        text: "In this exercise, participants are encouraged to share unique facts about themselves to build rapport. This activity not only helps to set a friendly tone but also fosters connections by highlighting shared interests and experiences among the group. It’s an opportunity for everyone to feel seen and heard in a relaxed setting.",
        picture: image_1,
      },
      {
        subtitle: "Exercise 2 - Taking Stocks",
        text: "This phase involves assessing current strengths and weaknesses. Participants reflect on their achievements, identify growth areas, and discuss obstacles they've faced. Through guided prompts, this exercise promotes self-awareness and sets a foundation for planning future goals. It's a moment for introspection and honest evaluation.",
        picture: image_6,
      },
      {
        subtitle: "Exercise 3 - Bon Anneè",
        text: "Celebrate milestones and set goals for the future. Participants take time to appreciate their progress, acknowledge their accomplishments, and craft personal and professional resolutions. This reflective process aims to boost motivation and provide clarity on the next steps in their journey. It’s about starting the new phase with intention and focus.",
        picture: image_15,
      },
      {
        subtitle: "Exercise 4 - Collaborative Challenge",
        text: "Teams collaborate on solving complex puzzles or scenarios that require creativity and cooperation. The challenges are designed to encourage problem-solving under pressure, fostering teamwork and adaptability. By working together, participants learn to value diverse perspectives and leverage each other's strengths.",
        picture: image_18,
      },
      {
        subtitle: "Exercise 5 - Vision Crafting",
        text: "Participants visualize their ideal outcomes and articulate a clear vision for their personal or professional paths. Through guided exercises, they create vision boards or write detailed descriptions of their goals. This process not only fosters inspiration but also provides a tangible roadmap for future action.",
        picture: image_11,
      },
      {
        subtitle: "Exercise 6 - Feedback Loop",
        text: "Engage in a structured feedback exchange where participants give and receive constructive insights to encourage improvement. Feedback is framed positively to ensure it is both actionable and supportive. This exercise builds a culture of trust and open communication, emphasizing growth over criticism.",
        picture: image_19,
      },
      {
        subtitle: "Exercise 7 - Reflection and Gratitude",
        text: "Participants reflect on their journey, express gratitude for the support they have received, and recognize key lessons learned. Through storytelling and sharing, the group collectively reinforces their achievements. This session closes the exercise series on a high note, with a focus on connection and appreciation.",
        picture: image_13,
      },
    ],
    logoImage: logoImage,
    bgColor: "#97D2FB",
    isProjCover: false,
  },
  Card2: {
    Title: "Benchmarking",
    Description: "How do we judge the performance of an LLM?",
    IndexNum: 2,
    CoverImg: image_6,
    Content: [
      {
        subtitle: "Exercise 1 - Breaking the Ice",
        text: "Participants share spontaneous descriptions of abstract images to spark creativity and open their minds to new perspectives.",
        picture: image_7, // Randomly chosen
      },
      {
        subtitle: "Exercise 2 - Taking Stocks",
        text: "This exercise focuses on analyzing visual elements in detail, encouraging participants to articulate their thoughts with precision.",
        picture: image_12, // Randomly chosen
      },
      {
        subtitle: "Exercise 3 - Bon Anneè",
        text: "Reflect on how visual representations influence personal interpretations and compare perspectives within the group.",
        picture: image_3, // Randomly chosen
      },
      {
        subtitle: "Exercise 4 - Visual Storytelling",
        text: "Create narratives based on image sequences, blending imagination and structured communication.",
        picture: image_15, // Randomly chosen
      },
      {
        subtitle: "Exercise 5 - Collaborative Ekphrasis",
        text: "Work in pairs or teams to construct descriptions of challenging visuals, enhancing collaborative analysis and creativity.",
        picture: image_8, // Randomly chosen
      },
      {
        subtitle: "Exercise 6 - Abstract Exploration",
        text: "Dive into abstract images and explore how emotions and context affect interpretation.",
        picture: image_21, // Randomly chosen
      },
      {
        subtitle: "Exercise 7 - Reflective Wrap-Up",
        text: "Participants share their key insights and discuss the power of visual literacy in communication.",
        picture: image_5, // Randomly chosen
      },
    ],
    logoImage: logoImage,
    bgColor: "#FB9799",
    isProjCover: false,
  },
  Card3: {
    Title: "Innovation Strategies",
    Description:
      "Exploring modern approaches to foster innovation in organizations",
    IndexNum: 3,
    CoverImg: image_8,
    Content: [
      {
        subtitle: "Exercise 1 - Ideation",
        text: "Generate a wide array of ideas to solve a problem or enhance a product. This exercise encourages free thinking and helps develop creative solutions.",
        picture: image_10, // Randomly chosen
      },
      {
        subtitle: "Exercise 2 - SWOT Analysis",
        text: "Evaluate the strengths, weaknesses, opportunities, and threats related to a new business idea or strategy.",
        picture: image_14, // Randomly chosen
      },
      {
        subtitle: "Exercise 3 - Brainstorming",
        text: "Collaboratively generate ideas to tackle a specific challenge. This exercise encourages participants to think creatively and build on each other's ideas.",
        picture: image_16, // Randomly chosen
      },
      {
        subtitle: "Exercise 4 - Mind Mapping",
        text: "Create a visual representation of thoughts and ideas to explore connections and generate new perspectives on a topic.",
        picture: image_20, // Randomly chosen
      },
      {
        subtitle: "Exercise 5 - Rapid Prototyping",
        text: "Design quick prototypes of ideas to test and iterate rapidly. This exercise promotes agility in the innovation process.",
        picture: image_19, // Randomly chosen
      },
      {
        subtitle: "Exercise 6 - User Feedback",
        text: "Engage users early to collect feedback on prototypes and ideas. This exercise helps refine and improve solutions.",
        picture: image_9, // Randomly chosen
      },
      {
        subtitle: "Exercise 7 - Innovation Pitch",
        text: "Present your innovative ideas to stakeholders and gather feedback on their viability and potential for success.",
        picture: image_18, // Randomly chosen
      },
    ],
    logoImage: logoImage,
    bgColor: "#A8E2B4",
    isProjCover: false,
  },
  Card4: {
    Title: "Data Analysis",
    Description: "Understanding and interpreting data for actionable insights",
    IndexNum: 4,
    CoverImg: image_2,
    Content: [
      {
        subtitle: "Exercise 1 - Data Collection",
        text: "Learn how to collect data effectively, ensuring that it is accurate, reliable, and relevant to your analysis goals.",
        picture: image_11, // Randomly chosen
      },
      {
        subtitle: "Exercise 2 - Data Cleaning",
        text: "Explore techniques for cleaning data, handling missing values, and correcting inaccuracies to prepare it for analysis.",
        picture: image_17, // Randomly chosen
      },
      {
        subtitle: "Exercise 3 - Exploratory Data Analysis",
        text: "Analyze data to uncover patterns, trends, and insights using visualizations and statistical techniques.",
        picture: image_4, // Randomly chosen
      },
      {
        subtitle: "Exercise 4 - Predictive Modeling",
        text: "Learn how to build and evaluate predictive models to forecast future trends or behaviors based on historical data.",
        picture: image_13, // Randomly chosen
      },
      {
        subtitle: "Exercise 5 - Data Visualization",
        text: "Master the art of creating compelling visualizations that communicate data insights clearly and effectively.",
        picture: image_14, // Randomly chosen
      },
      {
        subtitle: "Exercise 6 - Data Interpretation",
        text: "Understand how to interpret the results of data analyses and make data-driven decisions.",
        picture: image_8, // Randomly chosen
      },
      {
        subtitle: "Exercise 7 - Reporting Results",
        text: "Learn how to present data findings in a clear and engaging way to stakeholders, ensuring that the insights are actionable.",
        picture: image_12, // Randomly chosen
      },
    ],
    logoImage: logoImage,
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
    Img: image_13,
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
    Img: image_12,
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
    Img: image_3,
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
    Img: enhanced_logoImage,
    href: "",
  },
};

export function load({ params }) {
  return {
    backgroundImage,
    logoImage,
    cardsDb,
    floatersDb,
  };
}
