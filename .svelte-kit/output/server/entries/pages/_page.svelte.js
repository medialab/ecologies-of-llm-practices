import { e as ensure_array_like, d as stringify, f as bind_props, c as pop, p as push } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function Capitols($$payload, $$props) {
  push();
  let data = $$props["data"];
  let bringToFront = $$props["bringToFront"];
  let suppressCover = $$props["suppressCover"];
  let simplebarContainer = $$props["simplebarContainer"];
  let isProjCover = data.isProjCover;
  if (isProjCover === false) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(data.Content);
    $$payload.out += `<section class="card_container svelte-efp01l" draggable="true" aria-label="Draggable Card"${attr("data-section", data.Title)}><p class="h0 svelte-efp01l" style="z-index: 7;">${escape_html(data.Title)}</p> <p class="caption svelte-efp01l">BLOCK ${escape_html(data.IndexNum)}</p> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-efp01l"${attr("src", data.logoImage)} alt="EL2MP Logo"> <div class="description_container svelte-efp01l"${attr("style", `background-color: ${stringify(data.bgColor)}; border: 5px solid ${stringify(data.bgColor)};`)}><p class="h4 svelte-efp01l" id="description">${escape_html(data.Description)}</p></div> <div class="card_scrollable_container svelte-efp01l" data-simplebar="" data-simplebar-auto-hide="false"><div class="card_scroll_flex svelte-efp01l">`;
    if (data.CoverImg) {
      $$payload.out += "<!--[-->";
      if (typeof data.CoverImg === "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", data.CoverImg.img.src)} alt="CoverImg"${attr("width", data.CoverImg.img.w)}${attr("height", data.CoverImg.img.h)}>`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(Object.entries(data.CoverImg.sources));
        $$payload.out += `<picture><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [format, srcset] = each_array[$$index];
          $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
        }
        $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", data.CoverImg.img.src)} alt="CoverImg"${attr("width", data.CoverImg.img.w)}${attr("height", data.CoverImg.img.h)}></picture>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (each_array_1.length !== 0) {
      $$payload.out += "<!--[-->";
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let section = each_array_1[index];
        $$payload.out += `<div class="section_container svelte-efp01l" data-sveltekit-preload-data=""${attr("data-section", `Ex ${index + 1}`)}>`;
        if (section.subtitle) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="h4">${escape_html(section.subtitle)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (section.picture) {
          $$payload.out += "<!--[-->";
          if (typeof section.picture === "string") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<img data-sveltekit-preload-data="" class="article_image svelte-efp01l"${attr("src", section.picture.img.src)} alt="image"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}>`;
          } else {
            $$payload.out += "<!--[!-->";
            const each_array_2 = ensure_array_like(Object.entries(section.picture.sources));
            $$payload.out += `<picture><!--[-->`;
            for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
              let [format, srcset] = each_array_2[$$index_1];
              $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
            }
            $$payload.out += `<!--]--> <img data-sveltekit-preload-data="" class="article_image svelte-efp01l"${attr("src", section.picture.img.src)} alt="image"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}></picture>`;
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (section.text) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="p1">${escape_html(section.text)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      }
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p>If you see this we are encountering issues</p>`;
    }
    $$payload.out += `<!--]--></div></div></section>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<section class="card_container svelte-efp01l" id="cover_description" draggable="true" style="color: white;"><p class="h0 svelte-efp01l">${escape_html(data.Title)}</p> <img class="card_corner_logo svelte-efp01l" style="position: absolute; left: 0; bottom: 0; width: 25%; opacity: 1;"${attr("src", data.logoImage)} alt="EL2MP Logo"> <div class="card_scrollable_container svelte-efp01l"><div class="card_scroll_flex svelte-efp01l"><p class="h4">${escape_html(data.Description)}</p></div></div> <a class="x_arrow svelte-efp01l"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none"><path d="M1 1L20 20M1 20L20 1" stroke="white" stroke-width="2"></path></svg></a></section>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    data,
    bringToFront,
    suppressCover,
    simplebarContainer
  });
  pop();
}
function Logo_button($$payload, $$props) {
  push();
  let data = $$props["data"];
  let switch_sidebar = $$props["switch_sidebar"];
  $$payload.out += `<div class="logo_button open" id="sidebar"><a class="header_container"><img class="logo_container"${attr("src", data.expanded_logo)} alt="Expanded logo version of EL2MP"></a>  <div class="description_scroll"><p class="p1">The Écologies des Pratiques project explores the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. Supported by Google through its commitment to advancing ethical and impactful AI practices, this initiative combines cutting-edge technological tools with critical reflection on their implications. <br><br> At the heart of this project lies a collaborative and interdisciplinary approach, engaging researchers, practitioners, and students from diverse fields. By experimenting with LLMs, we seek to understand their potential as catalysts for new forms of knowledge production and dissemination while addressing the ecological and ethical questions they raise.
            The project delves into three key areas: <br><br> Technological Experimentation: By integrating LLMs into practical workflows, we assess how these tools reshape academic and professional practices. From creative writing to data analysis, the project tests the boundaries of LLMs' generative capabilities.<br><br> Critical Reflection: Alongside experimentation, we foster discussions on the broader societal and ecological implications of LLM adoption. What are the costs and benefits of scaling these technologies? How do they challenge or reinforce existing structures of knowledge and power?<br><br> Community Building: Through workshops, public events, and collaborative platforms, we aim to build a community of thinkers and makers who can collectively imagine and shape the future of AI-driven practices.<br><br> With Google’s support, Écologies des Pratiques not only investigates the possibilities of LLMs but also critically examines their role within contemporary ecological, cultural, and institutional systems. By bridging technological innovation and critical inquiry, this project seeks to illuminate how these powerful tools can contribute responsibly to a sustainable and inclusive future.</p> <div class="credits_container"><a><p class="h4">Privacy</p></a> <a><p class="h4">Cookie</p></a></div></div></div>`;
  bind_props($$props, { data, switch_sidebar });
  pop();
}
function Position_marker_button($$payload, $$props) {
  let selectedCardTitle = $$props["selectedCardTitle"];
  let currentScrollLevel = $$props["currentScrollLevel"];
  let exercises = [];
  const allExercises = Array.from({ length: 12 }, (_, i) => ({ id: `Ex ${i + 1}`, label: `Ex ${i + 1}` }));
  exercises = allExercises.filter((ex) => {
    const currentIndex = allExercises.findIndex((e) => e.id === currentScrollLevel);
    return allExercises.indexOf(ex) <= currentIndex;
  });
  const each_array = ensure_array_like(exercises);
  $$payload.out += `<button class="position_button svelte-jsjsbj"><p class="s1">${escape_html(selectedCardTitle)}</p> <p class="s1">/</p> <!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let exercise = each_array[index];
    $$payload.out += `<p class="s1">${escape_html(exercise.label)}</p> `;
    if (index < exercises.length - 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="s1">/</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></button>`;
  bind_props($$props, { selectedCardTitle, currentScrollLevel });
}
function Reset_button($$payload, $$props) {
  let reset_function = $$props["reset_function"];
  $$payload.out += `<button class="reset_button svelte-vfwf76"><p class="s1">Reset everything!</p></button>`;
  bind_props($$props, { reset_function });
}
function Time_button($$payload, $$props) {
  let time = $$props["time"];
  console.log("Current DateTime:", time);
  $$payload.out += `<button class="time_button svelte-cjteda"><p class="s1">${escape_html(time)}</p></button>`;
  bind_props($$props, { time });
}
function Floating_card($$payload, $$props) {
  push();
  let data = $$props["data"];
  let randomPosition = $$props["randomPosition"];
  let color = $$props["color"];
  $$payload.out += `<div class="floater_container closed"${attr("style", `top: ${stringify(randomPosition.top)}; left: ${stringify(randomPosition.left)}; z-index: ${stringify(randomPosition.zIndex)}; animation-delay: ${stringify(randomPosition.animationDelay)};`)}>`;
  if (data.Img) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="floater_image">`;
    if (typeof data.Img === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", data.Img.img.src)} alt=""${attr("width", data.Img.img.w)}${attr("height", data.Img.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(Object.entries(data.Img.sources));
      $$payload.out += `<picture><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [format, srcset] = each_array[$$index];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
      }
      $$payload.out += `<!--]--> <img${attr("src", data.Img.img.src)} alt=""${attr("width", data.Img.img.w)}${attr("height", data.Img.img.h)}></picture>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="floater_bottom"${attr("style", `background-color: ${stringify(color)}`)}>`;
  if (data.Title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="s2">${escape_html(data.Title)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <a style="transform: rotate(-45deg);"><p class="s2">→</p></a></div></div>`;
  bind_props($$props, { data, randomPosition, color });
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let highestZIndex = 1;
  let cover;
  let sidebar;
  let isAnimating = false;
  let selectedCard = "Qualifying";
  let currentScrollLevel = null;
  let currentCardColor;
  let lastCardColor = null;
  let simplebarContainer;
  const reset_function = () => {
    {
      console.error("No containers found!");
      return;
    }
  };
  const bringToFront = (event) => {
    const container = event.currentTarget;
    highestZIndex += 1;
    container.style.zIndex = highestZIndex;
  };
  const suppressCover = () => {
    cover.style.display = "none";
  };
  const open_sidebar = () => {
    if (sidebar.classList.contains("closed")) {
      sidebar.classList.remove("closed");
      sidebar.classList.add("open");
    }
  };
  const close_sidebar = () => {
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      sidebar.classList.add("closed");
    }
  };
  const switch_sidebar = () => {
    if (isAnimating) return;
    isAnimating = true;
    if (sidebar.classList.contains("open")) {
      close_sidebar();
    } else if (sidebar.classList.contains("closed")) {
      open_sidebar();
    } else {
      open_sidebar();
    }
    setTimeout(
      () => {
        isAnimating = false;
      },
      1e3
    );
  };
  const calculateRandomPosition = (floaterWidth = 100, floaterHeight = 40) => {
    if (typeof window === "undefined") {
      return { top: "0px", left: "0px", zIndex: 0 };
    }
    const safetyInset = 20;
    const columns = Math.floor((window.innerWidth - safetyInset * 2) / floaterWidth);
    const rows = Math.floor((window.innerHeight - safetyInset * 2) / floaterHeight);
    const validRows = rows - 1;
    const gridWidth = window.innerWidth - safetyInset * 2;
    const gridHeight = window.innerHeight - safetyInset * 2;
    const cellWidth = gridWidth / columns;
    const cellHeight = gridHeight / validRows;
    const row = Math.floor(Math.random() * validRows);
    const col = Math.floor(Math.random() * columns);
    const topPosition = safetyInset + row * cellHeight + (cellHeight - floaterHeight) / 2;
    const leftPosition = safetyInset + col * cellWidth + (cellWidth - floaterWidth) / 2;
    const validTopPosition = Math.min(topPosition, window.innerHeight - floaterHeight - safetyInset);
    const validLeftPosition = Math.min(leftPosition, window.innerWidth - floaterWidth - safetyInset);
    return {
      top: `${Math.round(validTopPosition)}px`,
      left: `${Math.round(validLeftPosition)}px`,
      zIndex: Math.floor(Math.random() * 1e3)
      // Randomize zIndex
    };
  };
  const alignColor = (selectedCard2) => {
    const selected = Object.values(data.cardsDb).find((card) => card.Title === selectedCard2);
    if (selected) {
      currentCardColor = selected.bgColor;
      lastCardColor = selected.bgColor;
    } else {
      currentCardColor = lastCardColor;
    }
  };
  alignColor(selectedCard);
  const each_array = ensure_array_like(Object.values(data.cardsDb));
  const each_array_1 = ensure_array_like(Object.values(data.floatersDb));
  $$payload.out += `<div class="content_container">`;
  Logo_button($$payload, { data, switch_sidebar });
  $$payload.out += `<!----> <section class="host"><button class="closing_icon"><svg width="50px" height="50px" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-154.15 328.62-305.54l26.3-26.31L480-206.77l125.08-125.08 26.3 26.31L480-154.15ZM354.92-628.46l-26.3-26.31L480-806.15l151.38 151.38-26.3 26.31L480-753.54 354.92-628.46Z"></path></svg></button> `;
  Position_marker_button($$payload, {
    data,
    selectedCardTitle: selectedCard,
    currentScrollLevel
  });
  $$payload.out += `<!----> `;
  Reset_button($$payload, { data, reset_function });
  $$payload.out += `<!----> `;
  Time_button($$payload, { data, time: "Loading..." });
  $$payload.out += `<!----> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let card = each_array[$$index];
    Capitols($$payload, {
      data: card,
      bringToFront,
      suppressCover,
      simplebarContainer
    });
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let floater = each_array_1[$$index_1];
    Floating_card($$payload, {
      data: floater,
      randomPosition: calculateRandomPosition(),
      color: currentCardColor
    });
  }
  $$payload.out += `<!--]--></section></div> `;
  if (typeof data.backgroundImage === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img class="background_image"${attr("src", data.backgroundImage.img.src)} alt="DotsDotsDots?"${attr("width", data.backgroundImage.img.w)}${attr("height", data.backgroundImage.img.h)}>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_2 = ensure_array_like(Object.entries(data.backgroundImage.sources));
    $$payload.out += `<picture><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let [format, srcset] = each_array_2[$$index_2];
      $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
    }
    $$payload.out += `<!--]--> <img class="background_image"${attr("src", data.backgroundImage.img.src)} alt="DotsDotsDots?"${attr("width", data.backgroundImage.img.w)}${attr("height", data.backgroundImage.img.h)}></picture>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
