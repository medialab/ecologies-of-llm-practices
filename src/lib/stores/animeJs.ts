import { createTimeline, stagger, splitText, animate } from "animejs";
import { isPageLoaded } from "./globalStores";
import { get } from "svelte/store";

export const pillAnimation = (node: HTMLElement) => {
    const text = node.querySelector("p");
    if (!text) return;

    const { chars } = splitText(text, {
        chars: {
            wrap: "clip",
            class: "split-word",
            clone: "bottom",
        },
        includeSpaces: true,
    });

    const tl = createTimeline({
        loop: false,
        autoplay: false,
        defaults: {
            duration: 200,
            ease: "inOut(2)",
        },
    }).add(
        chars,
        {
            y: "-100%",
        },
        stagger(50, { from: "random" }),
    );

    const onMouseEnter = () => tl.play();
    const onMouseLeave = () => {
        tl.reverse();
        tl.seek(0);
    };

    node.addEventListener("mouseenter", onMouseEnter);
    node.addEventListener("mouseleave", onMouseLeave);

    return {
        destroy() {
            node.removeEventListener("mouseenter", onMouseEnter);
            node.removeEventListener("mouseleave", onMouseLeave);
        }
    };
};

export const heroAnimation = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const hasLoaded = get(isPageLoaded);

    const h1s = document.querySelectorAll("#hero-h1");
    if (h1s.length === 0) {
        if (!hasLoaded) isPageLoaded.set(true);
        return;
    }

    // Skip if already split to prevent bizarre nested animations
    if (h1s[0].classList.contains("ready") || h1s[0].querySelector(".split-word")) {
        return;
    }

    const { words } = splitText("#hero-h1", {
        words: { wrap: "visible", class: "split-word" },
        chars: true,
    });

    // Reveal the h1 containers now that text is split and hidden by .split-word opacity
    h1s.forEach(h1 => h1.classList.add("ready"));

    const timeline = createTimeline({
        loop: false,
        defaults: {
            ease: isMobile ? "out(3)" : "inOut(3)",
            duration: hasLoaded ? 600 : (isMobile ? 800 : 1200)
        },
    });

    if (isMobile) {
        // Simpler, cleaner animation for mobile
        timeline.add(
            words,
            {
                y: ["100%", "0%"],
                opacity: [0, 1],
            },
            stagger(hasLoaded ? 20 : 40)
        );
    } else {
        timeline.add(
            words,
            {
                y: [($el: any) => (+$el.dataset.line % 2 ? "135%" : "-135%"), "0%"],
                opacity: [0, 1],
            },
            stagger(hasLoaded ? 30 : 50)
        );
    }

    timeline.init();

    if (!hasLoaded) {
        setTimeout(() => {
            isPageLoaded.set(true);
        }, isMobile ? 800 : 1200);
    }
};

export const inquirersAnimation = (el: HTMLElement) => {
    const words = el;

    const { chars } = splitText(words, {
        chars: {
            wrap: "clip",
            class: "split-word",
            clone: "bottom",
        },
        includeSpaces: true,
    });

    const timeline = createTimeline({
        loop: false,
        autoplay: false,
        defaults: {
            duration: 200,
            ease: "inOut(2)",
        },
    }).add(
        chars,
        {
            y: "-100%",
        },
        stagger(50, { from: "center" }),
    );

    const onMouseEnter = () => timeline.play();
    const onMouseLeave = () => {
        timeline.reverse();
        timeline.seek(0);
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return {
        destroy() {
            el.removeEventListener("mouseenter", onMouseEnter);
            el.removeEventListener("mouseleave", onMouseLeave);
        }
    };


}