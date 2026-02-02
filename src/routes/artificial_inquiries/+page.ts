/** @type {import('./$types').PageLoad} */
import { artificialInquiriesImgs } from "$database/media";

export function load() {
  return {
    title: "Artificial Inquiries: A <i>Vademecum</i> for <i>Workers</i> in the age of AI",
    subtitle: `Artificial Inquiries is the exercise book, core of the <b>Ecologie of LLM Practices</b> project.
      It is a low-tech vademecum designed to guide the participatory inquiry through subsequent exercises, aiming to create a mutual reflection between the user and the various LLMs.`,
    description: `<b>Origin</b>: This book was born during the inquiries of the Ecologies of LLM Practices.<br><br>
      <b>Purpose</b>: Its shape and form are designed to create an object of reflection and understanding, detaching the LLM discourse from the screen and the digital medium.<br><br>
      <b>Structure</b>:<br>
      - 6 sections plus a short notebook at the end.<br>
      - Each section focuses on one dedicated aspect of the common relation with LLMs.<br>
      - Each section includes exercises tailored to the experience of users.<br><br>
      <b>Materiality</b>:<br>
      - Layouts harmonize the production of data between users, LLMs, and researchers.<br>
      - Bound with a steel bar to make it <b>de-composable</b> and re-composable.<br>
      - Designed to be disassembled, studied, and re-assembled.<br><br>
      <b>Use</b>: It can be read in the most common order, or distilled and shared.<br><br>
      <b>Graphic project</b>: Born from the need for something printable on common office paper to maximize the circulation of the volume, while reminding us to stay humble and simple when designing paper interfaces for users.<br><br>
      <b>Intent</b>: A pedagogic entity that strives for clarity and ease of use, and that wants to remain in the user's memory, creating a point of friction between LLMs and UX.`,
    media: artificialInquiriesImgs,
  };
}
