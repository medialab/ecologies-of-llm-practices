/** @type {import('./$types').PageLoad} */
import { artificialInquiriesImgs } from "$database/media";

export function load() {
  return {
    title: "Artificial Inquiries: A <i>Vademecum</i> for <i>Workers</i> in the age of AI",
    subtitle: `Artificial Inquiries is the exercise book at the core of the <b>Ecologies of LLM Practices</b> project.
      It is a low-tech vademecum designed to guide participatory inquiry through successive exercises, fostering mutual reflection between users and various LLMs.`,
    description: `<b>Origin</b>: This book was born during the inquiries of the Ecologies of LLM Practices.<br><br>
      <b>Purpose</b>: Its shape and form are designed to create an object of reflection and understanding, detaching the LLM discourse from the screen and the digital medium.<br><br>
      <b>Structure</b>: The book is organized into six sections plus a short notebook at the end. Each section focuses on one dedicated aspect of our common relation with LLMs, and includes exercises tailored to the experience of users.<br><br>
      <b>Materiality</b>: The layouts harmonize the production of data between users, LLMs, and researchers. The volume is bound with a steel bar to make it <b>de-composable</b> and re-composable—designed to be disassembled, studied, and re-assembled.<br><br>
      <b>Use</b>: It can be read in the most common order, or distilled and shared.<br><br>
      <b>Graphic project</b>: The graphic project emerged from the need for something printable on common office paper to maximize circulation, while reminding us to stay humble and simple when designing paper interfaces for users.<br><br>
      <b>Intent</b>: A pedagogic entity that strives for clarity and ease of use, and that wants to remain in the user's memory, creating a point of friction between LLMs and UX.`,
    media: artificialInquiriesImgs,
  };
}

