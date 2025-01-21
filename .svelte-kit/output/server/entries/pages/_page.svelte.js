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
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Capitols($$payload, $$props) {
  push();
  let data = $$props["data"];
  let bringToFront = $$props["bringToFront"];
  let suppressCover = $$props["suppressCover"];
  let simplebarContainer = $$props["simplebarContainer"];
  let condensed_logo = $$props["condensed_logo"];
  let circular_logo = $$props["circular_logo"];
  let isProjCover = data.isProjCover;
  if (isProjCover === false) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(data.Content ?? []);
    $$payload.out += `<section class="card_container svelte-1mwve08" draggable="true" aria-label="Draggable Card"${attr("data-section", data.Title)}><p class="h0 svelte-1mwve08" style="z-index: 7;">${html(data.Title)}</p> <a class="caption svelte-1mwve08" id="download_button"${attr("href", `PDF/${stringify(data.Title)}.pdf`)} download=""><p>DOWNLOAD</p></a> <img data-sveltekit-preload-data="" class="card_corner_logo svelte-1mwve08"${attr("src", condensed_logo)} alt="EL2MP Logo"> <div class="description_container svelte-1mwve08"${attr("style", `background-color: ${stringify(data.bgColor)}; border: 5px solid ${stringify(data.bgColor)};`)}><p class="h4 svelte-1mwve08" id="description">${html(data.Description)}</p></div> <div class="card_scrollable_container svelte-1mwve08" data-simplebar="" data-simplebar-auto-hide="false"${attr("data-section", data.Title)}><div class="card_scroll_flex svelte-1mwve08"${attr("data-section", data.Title)}>`;
    if (data.CoverImg) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="duotone_container">`;
      if (typeof data.CoverImg === "string") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<img data-sveltekit-preload-data=""${attr("src", data.CoverImg.img.src)} alt="CoverImg" class="duotone_image"${attr("width", data.CoverImg.img.w)}${attr("height", data.CoverImg.img.h)}>`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(Object.entries(data.CoverImg.sources));
        $$payload.out += `<picture><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [format, srcset] = each_array[$$index];
          $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
        }
        $$payload.out += `<!--]--> <img data-sveltekit-preload-data=""${attr("src", data.CoverImg.img.src)} alt="CoverImg" class="duotone_image"${attr("width", data.CoverImg.img.w)}${attr("height", data.CoverImg.img.h)}></picture>`;
      }
      $$payload.out += `<!--]--> <div class="duotone_overlay"${attr("style", `background-color: ${stringify(data.bgColor)};`)}></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (each_array_1.length !== 0) {
      $$payload.out += "<!--[-->";
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let section = each_array_1[index];
        $$payload.out += `<div class="section_container svelte-1mwve08" data-sveltekit-preload-data=""${attr("data-section", `Ex ${index + 1}`)}>`;
        if (section.title) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="h4">${html(section.title)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (section.subtitle) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<p class="p1 svelte-1mwve08" exercise-description="">${html(section.subtitle)}</p>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (section.picture) {
          $$payload.out += "<!--[-->";
          if (typeof section.picture === "string") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<img data-sveltekit-preload-data="" class="article_image svelte-1mwve08"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}>`;
          } else {
            $$payload.out += "<!--[!-->";
            const each_array_2 = ensure_array_like(Object.entries(section.picture.sources));
            $$payload.out += `<picture><!--[-->`;
            for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
              let [format, srcset] = each_array_2[$$index_1];
              $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
            }
            $$payload.out += `<!--]--> <img data-sveltekit-preload-data="" class="article_image svelte-1mwve08"${attr("src", section.picture.img.src)} alt="People"${attr("width", section.picture.img.w)}${attr("height", section.picture.img.h)}></picture>`;
          }
          $$payload.out += `<!--]-->`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> `;
        if (section.text) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="double_column_text_article svelte-1mwve08"><p class="p1 svelte-1mwve08">${escape_html(section.text)}</p> <p class="p1 svelte-1mwve08">${escape_html(section.text)}</p></div>`;
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
    $$payload.out += `<section class="card_container svelte-1mwve08" id="cover_description" draggable="true" style="color: white;"><p class="h0 svelte-1mwve08">${escape_html(data.Title)}</p> <img class="card_corner_logo svelte-1mwve08" style="position: absolute; left: 0; bottom: 0; width: 25%; opacity: 1;"${attr("src", condensed_logo)} alt="EL2MP Logo"> <div class="card_scrollable_container svelte-1mwve08"><div class="card_scroll_flex svelte-1mwve08"><p class="h4">${escape_html(data.Description)}</p></div></div> <a class="x_arrow svelte-1mwve08"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none"><path d="M1 1L20 20M1 20L20 1" stroke="white" stroke-width="2"></path></svg></a></section>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    data,
    bringToFront,
    suppressCover,
    simplebarContainer,
    condensed_logo,
    circular_logo
  });
  pop();
}
function Logo_button($$payload, $$props) {
  push();
  let data = $$props["data"];
  let switch_sidebar = $$props["switch_sidebar"];
  $$payload.out += `<div class="logo_button open svelte-1cojal7" id="sidebar"><a class="header_container svelte-1cojal7"><img class="logo_container"${attr("src", data.logoImage)} alt="Expanded logo version of EL2MP"></a>  <div class="description_scroll svelte-1cojal7"><p class="p1">${html(data.projectDescription)}</p> <div class="credits_container"><a><p class="h4">Privacy</p></a> <a><p class="h4">Cookie</p></a></div></div></div>`;
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
  $$payload.out += `<button class="position_button svelte-1c8sxos"><p class="s1">${escape_html(selectedCardTitle)}</p> <p class="s1">/</p> <!--[-->`;
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
  $$payload.out += `<button class="reset_button svelte-ph3ac6"><p class="s1">Reset everything!</p></button>`;
  bind_props($$props, { reset_function });
}
function Time_button($$payload, $$props) {
  let time = $$props["time"];
  console.log("Current DateTime:", time);
  $$payload.out += `<button class="time_button svelte-1q6y9k3"><p class="s1">${escape_html(time)}</p></button>`;
  bind_props($$props, { time });
}
function Floating_card($$payload, $$props) {
  push();
  let data = $$props["data"];
  let randomPosition = $$props["randomPosition"];
  let color = $$props["color"];
  $$payload.out += `<div class="floater_container closed svelte-gobgvc"${attr("style", `top: ${stringify(randomPosition.top)}; left: ${stringify(randomPosition.left)}; z-index: ${stringify(randomPosition.zIndex)}; animation-delay: ${stringify(randomPosition.animationDelay)};`)}>`;
  if (data.Img) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="floater_image svelte-gobgvc">`;
    if (typeof data.Img === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", data.Img.img.src)}${attr("alt", `${stringify(data.Title)} image`)}${attr("width", data.Img.img.w)}${attr("height", data.Img.img.h)} class="svelte-gobgvc">`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(Object.entries(data.Img.sources));
      $$payload.out += `<picture class="svelte-gobgvc"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [format, srcset] = each_array[$$index];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)} class="svelte-gobgvc">`;
      }
      $$payload.out += `<!--]--> <img${attr("src", data.Img.img.src)}${attr("alt", `${stringify(data.Title)} image`)}${attr("width", data.Img.img.w)}${attr("height", data.Img.img.h)} class="svelte-gobgvc"></picture>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->  <a class="floater_bottom svelte-gobgvc"${attr("style", `background-color: ${stringify(color)}`)}>`;
  if (data.category === "document") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="category_icon svelte-gobgvc" id="document"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="svelte-gobgvc"><path d="M330-250h300v-60H330v60Zm0-160h300v-60H330v60Zm-77.69 310Q222-100 201-121q-21-21-21-51.31v-615.38Q180-818 201-839q21-21 51.31-21H570l210 210v477.69Q780-142 759-121q-21 21-51.31 21H252.31ZM540-620v-180H252.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v615.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-620H540ZM240-800v180-180V-160v-640Z" class="svelte-gobgvc"></path></svg></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (data.category === "image") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="category_icon svelte-gobgvc" id="image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="svelte-gobgvc"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z" class="svelte-gobgvc"></path></svg></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (data.category === "video") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="category_icon svelte-gobgvc" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="svelte-gobgvc"><path d="m172.31-780 70 140h120l-70-140h80l70 140h120l-70-140h80l70 140h120l-70-140h95.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21ZM160-580v327.69q0 5.39 3.46 8.85t8.85 3.46h615.38q5.39 0 8.85-3.46t3.46-8.85V-580H160Zm0 0v340-340Z" class="svelte-gobgvc"></path></svg></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (data.category === "link") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="category_icon svelte-gobgvc" id="video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="svelte-gobgvc"><path d="M432.31-298.46H281.54q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h150.77v60H281.54q-50.39 0-85.96 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.96 35.58h150.77v60ZM330-450v-60h300v60H330Zm197.69 151.54v-60h150.77q50.39 0 85.96-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.96-35.58H527.69v-60h150.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H527.69Z" class="svelte-gobgvc"></path></svg></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (data.Title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p class="s2 svelte-gobgvc">${escape_html(data.Title)}</p>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></a></div>`;
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
  let activeMarker;
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
  const updateSelectedCard = (selectedCard2) => {
    {
      activeMarker = selectedCard2;
    }
  };
  updateSelectedCard(selectedCard);
  alignColor(selectedCard);
  const each_array = ensure_array_like(Object.values(data.cardsDb));
  const each_array_1 = ensure_array_like(Object.values(data.floatersDb));
  $$payload.out += `<div class="content_container">`;
  Logo_button($$payload, { data, switch_sidebar });
  $$payload.out += `<!----> <section class="host"><button class="closing_icon svelte-hkz2rh"><svg width="50px" height="50px" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-154.15 328.62-305.54l26.3-26.31L480-206.77l125.08-125.08 26.3 26.31L480-154.15ZM354.92-628.46l-26.3-26.31L480-806.15l151.38 151.38-26.3 26.31L480-753.54 354.92-628.46Z"></path></svg></button> `;
  Position_marker_button($$payload, {
    data,
    selectedCardTitle: activeMarker,
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
      simplebarContainer,
      condensed_logo: data.condensed_logo,
      circular_logo: data.circular_logo
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
  $$payload.out += `<!--]--> <div class="mobile_desc_container svelte-hkz2rh"><div class="mobile_text svelte-hkz2rh"><p class="s1">This website is meant to be seen from a desktop device. <br> Meanwhile, if you need informations on what EL2MP is, read below:</p></div> <div class="mobile_description svelte-hkz2rh"><p class="p2">${html(data.projectDescription)}</p></div></div></section></div> `;
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
