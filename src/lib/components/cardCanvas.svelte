<script lang="ts">
    import type { PageData } from "$lib/stores/types";
    
    let { data }: { data: PageData } = $props();

    import Capitols from "$lib/components/capitols.svelte";
    import Floater from "$lib/components/floaters.svelte";
    import Sharer from "$lib/components/sharer.svelte";
    import { onMount, onDestroy, tick } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";
    import templateMobileSvg from "$lib/media/template_mobile.svg?raw";
    import templateDesktopSvg from "$lib/media/template_desktop.svg?raw";

    import {
        currentHash,
        selectedCard,
        currentCardColor,
        highestZIndex,
        lastCardColor,
        isDesktop,
        isMobileDevice,
        startX,
        startY,
        transitionTime,
        transitionCurve,
        currentFocus,
        isPageLoaded,
        showSharer,
        shareInfo,
        sharingTextMobile,
        sharerVisibility,
        finalShareData,
        shareData,
    } from "$lib/stores/globalStores";

    $inspect("data.floatersDb", Object.values(data.floatersDb))

    let interact;
    let totalBlockWidth,
        totalBlockHeight,
        x,
        y,
        topLeftCornerX,
        topLeftCornerY,
        windowWidth,
        windowHeight,
        initialsY,
        topYCorner,
        bottomYCorner,
        initialX;

    let width = 0;
    let height = 0;

    let contentContainer: HTMLElement | undefined;

    let containers: NodeListOf<HTMLElement> | undefined;
    let scrollContainers: NodeListOf<HTMLElement> | undefined;

    let initialPositions: { x: number; y: number }[] = [];

    let scrollableElements: NodeListOf<HTMLElement> | undefined;

    let currentObserver: IntersectionObserver | undefined;
    let sections: HTMLElement[] = [];

    let hostElement: HTMLElement | undefined;

    let holdTimeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;
    let cardWidth: number, cardHeight: number, offset: number;

    let lastDeviceType: string | null = null;
    let isSwapping = false;
    let isInteractionLocked = false;

    const areCardsLoaded = writable(false);

    const waitForHash = writable(false);

    const windowSizeReady = writable(false);

    const getCardFlushOrder = (card: import("$lib/stores/types").CardData | undefined): number => {
        if (typeof document !== "undefined") {
            const currentCard = document.querySelector(
                `[data-section="${card?.Title}"]`,
            );
            if (currentCard) {
                const currentFlushOrder =
                    currentCard.getAttribute("data-flush-order");
                return parseInt(currentFlushOrder || "0", 10);
            }
        }

        return 0;
    };

    const updateWindowSize = () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        isMobileDevice.set(windowWidth <= 768);
        isDesktop.set(windowWidth > 768);
        windowSizeReady.set(true);
    };

    const bringToFront = (eventOrElement) => {
        const frontingTarget = eventOrElement.currentTarget || eventOrElement;
        $highestZIndex += 1;
        frontingTarget.style.zIndex = $highestZIndex;

        const blockTitle = frontingTarget.getAttribute("data-section");
        if (blockTitle) {
            $currentFocus = `${blockTitle}_`;
        }
    };



    const alignColor = ($selectedCard) => {
        const selected = Object.values(data.cardsDb).find(
            (card) => card.Title === $selectedCard,
        );

        if (selected) {
            $currentCardColor = selected.bgColor;
            $lastCardColor = selected.bgColor;
        } else {
            $currentCardColor = $lastCardColor;
        }
    };

    $effect(() => {
        if ($shareData && $shareData?.title && svgDoc) generateShareContent();
    });

    const placeCards = (containers) => {
        setTimeout(() => {
            if (containers && containers.length > 0) {
                const firstCard = containers[0];

                if ($isMobileDevice) {
                    containers.forEach((container) => {
                        container.style.height = "65%";
                    });
                }

                cardWidth = firstCard.getBoundingClientRect().width;
                cardHeight = firstCard.getBoundingClientRect().height;
                const opticalCorrection = -50;

                if ($isDesktop) {
                    offset = -30;

                    totalBlockWidth =
                        cardWidth + (containers.length - 1) * Math.abs(offset);
                    totalBlockHeight =
                        cardHeight + (containers.length - 1) * Math.abs(offset);

                    $startX =
                        (windowWidth - totalBlockWidth) / 2 -
                        offset * containers.length +
                        opticalCorrection;
                    $startY =
                        (windowHeight - totalBlockHeight) / 2 -
                        offset * containers.length +
                        opticalCorrection;
                } else if ($isMobileDevice) {
                    offset = -35;
                    const correction = 20;
                    totalBlockWidth = cardWidth;
                    totalBlockHeight =
                        cardHeight + (containers.length - 1) * Math.abs(offset);
                    $startX = (windowWidth - totalBlockWidth) / 2;
                    $startY =
                        (windowHeight - totalBlockHeight) / 2 +
                        correction -
                        offset * (containers.length - 1);
                }

                containers.forEach((container, index) => {
                    if ($isDesktop) {
                        x = $startX + index * offset;
                        y = $startY + index * offset;
                    } else if ($isMobileDevice) {
                        x = $startX;
                        y = $startY + index * offset;
                    }

                    initialPositions[index] = { x, y };
                    container.style.transition = "transform 0.3s ease-in-out";
                    container.style.transformOrigin = "top left";
                    container.style.transform = `translateX(${x}px) translateY(${y}px)`;
                    container.setAttribute("data-x", x);
                    container.setAttribute("data-y", y);
                    container.style.zIndex = -index + 4;

                    container.setAttribute("data-index", index);

                    const cardData = Object.values(data.cardsDb)[index];
                    if (cardData && cardData.bgColor) {
                        container.style.backgroundColor = cardData.bgColor;
                    }

                    setTimeout(() => {
                        container.style.transition = "";
                    }, 300);

                    if ($waitForHash) {
                        //If we arrive with a hash value, so a sharing link, we need to focus the correct card
                        setTimeout(() => {
                            setTimeout(() => {
                                container.style.opacity = "1";
                            }, index * 125);
                            areCardsLoaded.set(true);
                        }, 1000);
                    } else {
                        //If not the functioning is normal
                        setTimeout(() => {
                            setTimeout(() => {
                                container.style.opacity = "1";
                            }, index * 125);
                            areCardsLoaded.set(true);
                        }, 500);
                    }
                });

                $isPageLoaded = true;
            }
        }, 10);
    };

    const swapCards = (event: HTMLElement) => {
        alignColor(event.getAttribute("data-section"));

        const swapDuration = transitionTime * 300;
        const clickedCard = event;
        const clickedFlushOrder = Number(clickedCard.dataset.flushOrder);
        const topCard = Array.from(containers || []).find(
            (container) => container.dataset.flushOrder === "1",
        );
        const cubicBezier = ".1,.0,.0,.1";

        if (!topCard || isSwapping) {
            return;
        }

        if (clickedCard.dataset.flushOrder === "1") {
            return;
        }

        isSwapping = true;
        isInteractionLocked = true;

        const clickedCardY = Number(clickedCard.dataset.y);
        const clickedCardX = Number(clickedCard.dataset.x);

        const topCardY = Number(topCard.dataset.y);
        const topCardX = Number(topCard.dataset.x);

        // Disable pointer events during animation
        containers.forEach((container) => {
            container.style.pointerEvents = "none";
            container.style.touchAction = "none";
        });

        clickedCard.style.transition = `transform ${swapDuration}ms ${transitionCurve}`;
        topCard.style.transition = `transform ${swapDuration}ms ${transitionCurve} 100ms`;

        // Stage 1: Move cards to top/bottom positions
        clickedCard.style.transform = `translateX(${clickedCardX + 450}px) translateY(${topCardY}px) rotate(15deg)`;
        topCard.style.transform = `translateX(${topCardX - 450}px) translateY(${clickedCardY}px) rotate(-15deg)`;

        // Stage 2: After first movement, exchange flush orders
        setTimeout(() => {
            clickedCard.dataset.flushOrder = "1";
            (topCard as HTMLElement).dataset.flushOrder = clickedFlushOrder.toString();

            const currentTopZ = parseInt((topCard as HTMLElement).style.zIndex || "0");
            const currentClickedZ = parseInt(clickedCard.style.zIndex || "0");

            clickedCard.style.zIndex = String(currentTopZ);
            (topCard as HTMLElement).style.zIndex = String(currentClickedZ);

            setTimeout(() => {
                clickedCard.style.transform = `translateX(${clickedCardX}px) translateY(${topCardY}px)`;
                (topCard as HTMLElement).style.transform = `translateX(${topCardX}px) translateY(${clickedCardY}px)`;

                setTimeout(() => {
                    clickedCard.setAttribute("data-y", String(topCardY));
                    (topCard as HTMLElement).setAttribute("data-y", String(clickedCardY));

                    containers.forEach((container) => {
                        container.style.pointerEvents = "";
                        container.style.touchAction = "";
                    });

                    isSwapping = false;
                    isInteractionLocked = false;
                }, swapDuration);
            }, 100);
        }, swapDuration);
    };

    let svgDoc = null;
    let svgText = null;
    let svgRoot = null;

    let instrumentSerifBase64;
    let instrumentSansBase64;
    let maxCharsPerLine;
    let lineHeightConfig;
    let defs;
    let style;
    let fontCache = {};
    let canvas;
    let ctx;
    let svgWidth;
    let svgHeight;
    let svgScale = 2;
    let modifiedSvg;

    const loadFontAsBase64Cached = async (fontPath) => {
        if (fontCache[fontPath]) return fontCache[fontPath];

        const response = await fetch(fontPath);
        const buffer = await response.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        const dataUrl = `data:font/truetype;base64,${base64}`;

        fontCache[fontPath] = dataUrl;
        return dataUrl;
    };

    let preloadFonts;

    const prepareSVG = async () => {
        if (!preloadFonts) {
            preloadFonts = Promise.all([
                loadFontAsBase64Cached("/fonts/InstrumentSerif-Regular.woff2"),
                loadFontAsBase64Cached("/fonts/InstrumentSans-Regular.woff2"),
            ]).catch(() => {});
        }
        await preloadFonts;
        svgText = $isMobileDevice ? templateMobileSvg : templateDesktopSvg;

        instrumentSerifBase64 =
            fontCache["/fonts/InstrumentSerif-Regular.woff2"];
        instrumentSansBase64 = fontCache["/fonts/InstrumentSans-Regular.woff2"];

        const parser = new DOMParser();
        svgDoc = parser.parseFromString(svgText, "image/svg+xml");

        defs = svgDoc.createElementNS("http://www.w3.org/2000/svg", "defs");
        style = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        style.textContent = `
            @font-face {
                font-family: 'Instrument Serif';
                src: url('${instrumentSerifBase64}') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'Instrument Sans';
                src: url('${instrumentSansBase64}') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
        `;
        defs.appendChild(style);

        svgRoot = svgDoc.documentElement;
        svgRoot.insertBefore(defs, svgRoot.firstChild);

        maxCharsPerLine = $isMobileDevice ? 50 : 75;

        const textLimits = {
            default: maxCharsPerLine,
            exDescription: $isMobileDevice ? 50 : 70,
            exText: $isMobileDevice ? 65 : 70,
            exTitle: $isMobileDevice ? 35 : 45,
        };

        // Store text limits globally for use in other functions
        (window as typeof window & { svgTextLimits: typeof textLimits }).svgTextLimits = textLimits;

        lineHeightConfig = {
            exTitle: $isMobileDevice ? 1.05 : 1.1, // Tighter line height on mobile
            exDescription: $isMobileDevice ? 1.25 : 1.3, // Slightly tighter on mobile
            exText: $isMobileDevice ? 1.35 : 1.4, // Slightly tighter on mobile
        };

        modifiedSvg = new XMLSerializer().serializeToString(
            svgDoc.documentElement,
        );

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");

        svgWidth = parseFloat(svgRoot.getAttribute("width")) || 680;
        svgHeight = parseFloat(svgRoot.getAttribute("height")) || 474;

        canvas.width = svgWidth * svgScale;
        canvas.height = svgHeight * svgScale;
    };

    const stripHTML = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    const wrapText = (textToWrap, textType = "default") => {
        // Validate input
        if (!textToWrap || typeof textToWrap !== "string") {
            return [];
        }

        const textLimits = (window as typeof window & { svgTextLimits: Record<string, number> }).svgTextLimits;
        const customMaxChars = textLimits[textType] || textLimits.default;

        const words = textToWrap.trim().split(" ");
        const lines = [];
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            if (testLine.length <= customMaxChars) {
                currentLine = testLine;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    // Handle case where a single word is longer than the limit
                    lines.push(word);
                    currentLine = "";
                }
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    };

    const generateShareContent = async () => {
        // Helper function to determine if a color is dark
        const isColorDark = (hexColor) => {
            // Remove # if present
            const hex = hexColor.replace("#", "");

            // Convert to RGB
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);

            // Calculate brightness using luminance formula
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Return true if dark (brightness < 128)
            return brightness < 128;
        };

        $showSharer = true;

        setTimeout(() => {
            $sharingTextMobile = "Click here to share...";
            $sharerVisibility = true;
        }, 1500);

        if (!svgDoc) {
            await prepareSVG();
        }
        if (!svgDoc) {
            return;
        }

        const workingSvgDoc = svgDoc.cloneNode(true);

        // Track title height for positioning adjustments
        let titleHeightOffset = 0;

        if ($shareData.title) {
            const titleElement = workingSvgDoc.querySelector("#Title");
            if (titleElement) {
                const firstTspan = titleElement.querySelector("tspan");
                if (firstTspan) {
                    const x = firstTspan.getAttribute("x");
                    const y = firstTspan.getAttribute("y");
                    const dx = firstTspan.getAttribute("dx");
                    const dy = firstTspan.getAttribute("dy");
                    const transform = firstTspan.getAttribute("transform");

                    titleElement.innerHTML = "";
                    const newTspan = workingSvgDoc.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "tspan",
                    );
                    if (x) newTspan.setAttribute("x", x);
                    if (y) newTspan.setAttribute("y", y);
                    if (dx) newTspan.setAttribute("dx", dx);
                    if (dy) newTspan.setAttribute("dy", dy);
                    if (transform)
                        newTspan.setAttribute("transform", transform);
                    newTspan.textContent = stripHTML($shareData.title);
                    titleElement.appendChild(newTspan);
                } else {
                    titleElement.textContent = stripHTML($shareData.title);
                }
            }
        }

        if ($shareData.exTitle) {
            const exTitleElement = workingSvgDoc.querySelector("#Ex_Title");

            if (exTitleElement) {
                const firstTspan = exTitleElement.querySelector("tspan");

                if (firstTspan) {
                    const x = firstTspan.getAttribute("x");
                    const y = firstTspan.getAttribute("y");
                    const dx = firstTspan.getAttribute("dx");
                    const dy = firstTspan.getAttribute("dy");
                    const transform = firstTspan.getAttribute("transform");

                    const fontSize =
                        parseFloat(exTitleElement.getAttribute("font-size")) ||
                        24;
                    const lineHeight = fontSize * lineHeightConfig.exTitle;

                    exTitleElement.innerHTML = "";

                    // Strip HTML from title
                    const strippedTitle = stripHTML($shareData.exTitle);

                    // Use wrapText function for consistent wrapping
                    const titleLines = wrapText(strippedTitle, "exTitle");

                    let currentY = parseFloat(y);

                    // Create tspan for each line
                    titleLines.forEach((line, index) => {
                        const tspan = workingSvgDoc.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "tspan",
                        );
                        if (x) tspan.setAttribute("x", x);
                        tspan.setAttribute("y", currentY.toString());
                        if (dx && index === 0) tspan.setAttribute("dx", dx); // Only first line gets dx
                        if (dy && index === 0) tspan.setAttribute("dy", dy); // Only first line gets dy
                        if (transform)
                            tspan.setAttribute("transform", transform);
                        tspan.textContent = line;
                        exTitleElement.appendChild(tspan);

                        currentY += lineHeight;
                    });

                    const totalTitleHeight = currentY - parseFloat(y);
                    const singleLineHeight = lineHeight;
                    const extraTitleHeight = Math.max(
                        0,
                        totalTitleHeight - singleLineHeight,
                    );

                    // Apply mobile scaling to reduce excessive spacing
                    const mobileOffsetScale = $isMobileDevice ? 0.4 : 1.0; // Reduce to 40% on mobile
                    titleHeightOffset = extraTitleHeight * mobileOffsetScale;
                }
            }
        }

        if ($shareData.exText !== null && $shareData.exDescription !== null) {
            const exDescElement =
                workingSvgDoc.querySelector("#Ex_description");
            const firstTspan = exDescElement.querySelector("tspan");

            if (exDescElement) {
                const x = firstTspan.getAttribute("x");
                const y = firstTspan.getAttribute("y");
                const dx = firstTspan.getAttribute("dx");
                const dy = firstTspan.getAttribute("dy");
                const transform = firstTspan.getAttribute("transform");

                const fontSize =
                    parseFloat(exDescElement.getAttribute("font-size")) || 16;
                const descriptionLineHeight =
                    fontSize * lineHeightConfig.exDescription;
                const textLineHeight = fontSize * lineHeightConfig.exText;

                exDescElement.innerHTML = "";

                // Process description and text separately with different character limits
                const strippedDescription = stripHTML($shareData.exDescription);
                const strippedText = stripHTML($shareData.exText);

                // Adjust starting Y position based on title height
                // Eliminate additional spacing on mobile due to large font sizes
                const spacingMultiplier = $isMobileDevice ? 0 : 0.3;
                const additionalSpacing =
                    titleHeightOffset > 0 ? fontSize * spacingMultiplier : 0;
                let currentY =
                    parseFloat(y) + titleHeightOffset + additionalSpacing;

                // Process DESCRIPTION first with its specific character limit
                const descriptionLines = wrapText(
                    strippedDescription,
                    "exDescription",
                );

                // Process TEXT with its specific character limit
                const textLines = wrapText(strippedText, "exText");

                // Combine all content lines
                let allContentLines = [];

                // Add description lines with type marker
                descriptionLines.forEach((line) => {
                    allContentLines.push({
                        text: line,
                        type: "description",
                        lineHeight: descriptionLineHeight,
                    });
                });

                // Add spacing line between description and text if both exist
                if (descriptionLines.length > 0 && textLines.length > 0) {
                    allContentLines.push({
                        text: "",
                        type: "spacing",
                        lineHeight: descriptionLineHeight * 0.5,
                    });
                }

                // Add text lines with type marker
                textLines.forEach((line) => {
                    allContentLines.push({
                        text: line,
                        type: "text",
                        lineHeight: textLineHeight,
                    });
                });

                // Apply line limits based on device and background color
                let maxLines;
                const isDarkBackground =
                    $shareData.bgColor && isColorDark($shareData.bgColor);
                if (!$isMobileDevice) {
                    maxLines = isDarkBackground ? 15 : 6;
                } else {
                    maxLines = isDarkBackground ? 26 : 10;
                }

                if (
                    allContentLines.filter((line) => line.text !== "").length >
                    maxLines
                ) {
                    // Find the content line at the limit (excluding spacing)
                    let contentLineCount = 0;
                    let truncateIndex = -1;

                    for (let i = 0; i < allContentLines.length; i++) {
                        if (allContentLines[i].text !== "") {
                            contentLineCount++;
                            if (contentLineCount === maxLines) {
                                truncateIndex = i;
                                break;
                            }
                        }
                    }

                    if (truncateIndex !== -1) {
                        // Truncate the last line and add ellipsis
                        const lastLine = allContentLines[truncateIndex];
                        const maxCharsForEllipsis = lastLine.text.length - 3; // Leave room for "..."

                        if (maxCharsForEllipsis > 0) {
                            lastLine.text =
                                lastLine.text
                                    .substring(0, maxCharsForEllipsis)
                                    .trim() + "...";
                        } else {
                            lastLine.text = lastLine.text.trim() + "...";
                        }

                        // Remove all lines after the truncation point
                        allContentLines = allContentLines.slice(
                            0,
                            truncateIndex + 1,
                        );
                    }
                }

                // Render all content lines
                allContentLines.forEach((lineObj) => {
                    if (lineObj.text === "" && lineObj.type === "spacing") {
                        // Just add spacing, no tspan
                        currentY += lineObj.lineHeight;
                    } else if (lineObj.text !== "") {
                        const tspan = workingSvgDoc.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "tspan",
                        );
                        tspan.setAttribute("x", x);
                        tspan.setAttribute("y", currentY.toString());
                        if (transform)
                            tspan.setAttribute("transform", transform);
                        tspan.textContent = lineObj.text;
                        exDescElement.appendChild(tspan);

                        currentY += lineObj.lineHeight;
                    }
                });
            }
        }

        // Handle image element - either populate it with an image or remove it completely
        const legacyId = $isMobileDevice
            ? "#image1_777_3516"
            : "#image1_798_3654";
        let targetImage = workingSvgDoc.querySelector(legacyId);

        if ($shareData.exImage && $shareData.exImage.img?.src) {
            // Image is provided - populate the image element
            let imageUrl = new URL(
                $shareData.exImage.img.src,
                window.location.origin,
            ).href;
            let imageEmbedded = false;

            if (targetImage) {
                try {
                    const imageResponse = await fetch(imageUrl);
                    if (imageResponse.ok) {
                        const imageBlob = await imageResponse.blob();
                        const base64Promise = new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(imageBlob);
                        });

                        const imageDataUrl = await base64Promise;

                        targetImage.setAttribute("href", imageDataUrl);
                        targetImage.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            imageDataUrl,
                        );
                        targetImage.setAttribute(
                            "preserveAspectRatio",
                            "xMidYMid slice",
                        );

                        let defs = workingSvgDoc.querySelector("defs");

                        if (!defs) {
                            defs = workingSvgDoc.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "defs",
                            );
                            workingSvgDoc.documentElement.appendChild(defs);
                        }

                        const filter = workingSvgDoc.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "filter",
                        );
                        filter.setAttribute("id", "grayscale");
                        const colorMatrix = workingSvgDoc.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "feColorMatrix",
                        );
                        colorMatrix.setAttribute("type", "saturate");
                        colorMatrix.setAttribute("values", "0");
                        filter.appendChild(colorMatrix);
                        defs.appendChild(filter);
                        targetImage.setAttribute("filter", "url(#grayscale)");

                        await new Promise((resolve) =>
                            setTimeout(resolve, 100),
                        );
                        imageEmbedded = true;
                    }
                } catch (error) {
                    // Try a simpler approach for mobile - just set the original URL
                    if ($isMobileDevice) {
                        targetImage.setAttribute("href", imageUrl);
                        targetImage.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            imageUrl,
                        );
                    }
                }
            }
        } else {
            // No image provided - remove the image element and color block completely
            if (targetImage) {
                targetImage.remove();
            }

            // Also remove the Ex_colorBlock element
            const colorBlock = workingSvgDoc.querySelector("#Ex_colorBlock");
            if (colorBlock) {
                colorBlock.remove();
            }
        }

        if ($shareData.bgColor) {
            const targetColor = "#FBC797"; //replacing bg color
            const allElements = workingSvgDoc.querySelectorAll("*");

            allElements.forEach((element) => {
                const fillColor = element.getAttribute("fill");
                if (
                    fillColor &&
                    (fillColor.toUpperCase() === targetColor.toUpperCase() ||
                        fillColor.toUpperCase() === "FBC797")
                ) {
                    element.setAttribute("fill", $shareData.bgColor);
                }
            });

            // Check if the background color is dark and adjust text color accordingly
            if (isColorDark($shareData.bgColor)) {
                const textElements = workingSvgDoc.querySelectorAll("text");
                textElements.forEach((textElement) => {
                    const currentFill = textElement.getAttribute("fill");
                    // Only change black text to white (preserve other colored text)
                    if (
                        !currentFill ||
                        currentFill === "black" ||
                        currentFill === "#000000" ||
                        currentFill === "#000"
                    ) {
                        textElement.setAttribute("fill", "white");
                    }
                });

                // Also check for tspan elements that might have fill attributes
                const tspanElements = workingSvgDoc.querySelectorAll("tspan");
                tspanElements.forEach((tspanElement) => {
                    const currentFill = tspanElement.getAttribute("fill");
                    if (
                        !currentFill ||
                        currentFill === "black" ||
                        currentFill === "#000000" ||
                        currentFill === "#000"
                    ) {
                        tspanElement.setAttribute("fill", "white");
                    }
                });
            }
        }

        const slug = (str) =>
            (str || "")
                .toString()
                .replace(/<[^>]+>/g, "") // strip HTML
                .replace(/[^a-z0-9]+/gi, "_")
                .replace(/^_+|_+$/g, "")
                .substring(0, 25);

        const main = slug($shareData.title) || "EL2MP";
        const ex = slug($shareData.exTitle) || "Exercise";
        const filename = `${main}_${ex}.jpg`;

        // Serialize the modified SVG document
        modifiedSvg = new XMLSerializer().serializeToString(
            workingSvgDoc.documentElement,
        );

        // Function to preload all images in the SVG
        const preloadSvgImages = async (svgString) => {
            const imageUrlMatches =
                svgString.match(/(?:href|xlink:href)="(data:image[^"]+)"/g) ||
                [];
            const imageUrls = imageUrlMatches.map(
                (match) => match.split('"')[1],
            );

            if (imageUrls.length === 0) {
                return;
            }

            const imageLoadPromises = imageUrls.map((url) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = url;
                });
            });

            await Promise.all(imageLoadPromises);
        };

        // Preload images before rendering
        await preloadSvgImages(modifiedSvg);

        const jpegFile = await new Promise((resolve, reject) => {
            const img = new Image();

            const svgDataUrl =
                "data:image/svg+xml;base64," +
                btoa(unescape(encodeURIComponent(modifiedSvg)));

            const timeout = setTimeout(() => {
                reject(new Error("Image loading timeout"));
            }, 10000); // 10 second timeout

            img.onload = () => {
                try {
                    clearTimeout(timeout);

                    setTimeout(() => {
                        try {
                            // Reset canvas context
                            ctx.setTransform(1, 0, 0, 1, 0, 0);

                            ctx.fillStyle = "white";
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.scale(svgScale, svgScale);
                            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);

                            canvas.toBlob(
                                (blob) => {
                                    if (blob) {
                                        const file = new File(
                                            [blob],
                                            filename,
                                            {
                                                type: "image/jpeg",
                                                lastModified:
                                                    new Date().getTime(),
                                            },
                                        );
                                        resolve(file);
                                    } else {
                                        reject(
                                            new Error("Failed to create JPEG"),
                                        );
                                    }
                                },
                                "image/jpeg",
                                0.92,
                            );
                        } catch (error) {
                            reject(error);
                        }
                    }, 200);
                } catch (error) {
                    clearTimeout(timeout);
                    reject(error);
                }
            };

            img.onerror = (error) => {
                clearTimeout(timeout);
                reject(new Error("Failed to load SVG"));
            };
            img.src = svgDataUrl;
        });

        const exLabel = $shareData.exTitle
            ? $shareData.exTitle.replace(/<[^>]+>/g, "")
            : "Exercise";
        const blockLabel = $shareData.title
            ? $shareData.title.replace(/<[^>]+>/g, "")
            : "Block";

        const MAX_DESC_LENGTH = 200;
        let desc = "";

        if ($shareData.exText) {
            const cleanText = stripHTML($shareData.exText)
                .replace(/\s+/g, " ")
                .trim();
            desc =
                cleanText.length > MAX_DESC_LENGTH
                    ? cleanText.slice(0, MAX_DESC_LENGTH).trimEnd() + "…"
                    : cleanText;
        }

        const link = $shareData.url || window.location.href;
        const socialMessage =
            `\nExercise ${exLabel} | Block ${blockLabel}\n\n` + `${desc}`;

        $finalShareData = {
            text: socialMessage,
            url: link,
            files: [jpegFile],
        };

        const textOnlyPayload = {
            text: socialMessage,
            url: link,
        };

        $shareInfo = {
            title: $shareData.title,
            exTitle: $shareData.exTitle,
            text: socialMessage,
            url: link,
        };
    };

    onMount(async () => {
        const interact = (await import("interactjs")).default;

        updateWindowSize();

        await tick();

        containers = document.querySelectorAll("[data-card-container]");
        scrollContainers = document.querySelectorAll(
            ".card_scrollable_container",
        );
        scrollableElements = document.querySelectorAll(
            ".card_scrollable_container",
        );
        sections = Array.from(document.querySelectorAll<HTMLElement>(".section_container"));

        placeCards(containers);

        if (
            "requestIdleCallback" in window &&
            typeof window.requestIdleCallback === "function"
        ) {
            window.requestIdleCallback(
                () => {
                    void prepareSVG();
                },
                { timeout: 1500 },
            );
        } else {
            setTimeout(() => {
                void prepareSVG();
            }, 0);
        }

        if ($isMobileDevice) {
            const containerYCorners = new Map();
            const containersIds = new Map();

            containers.forEach((container, index) => {
                initialsY = Number(container.dataset.y);
                containerYCorners.set(container, initialsY);
                containersIds.set(container, container.id);

                if (!container.dataset.flushOrder) {
                    container.dataset.flushOrder = (index + 1).toString();
                }
            });

            if (containers && containers.length > 0) {
                bottomYCorner = Number(containers[0].dataset.y);
                topYCorner = Number(
                    containers[containers.length - 1].dataset.y,
                );
            }
        }

        if (!$isMobileDevice) {
            containers.forEach((container) => {
                container.classList.add("cursor-grab");
                container.style.touchAction = "none";

                interact(container).draggable({
                    inertia: {
                        resistance: 15,
                        minSpeed: 100,
                        endSpeed: 20,
                        smoothEndDuration: 500,
                    },

                    listeners: {
                        start(event) {
                            bringToFront(event);

                            const index =
                                event.target.getAttribute("data-index");

                            const cardData = Object.values(data.cardsDb)[index];

                            if (cardData && cardData.Title) {
                                $selectedCard = cardData.Title;
                            }

                            event.target.classList.remove("cursor-grab");
                            event.target.classList.add("cursor-grabbing");
                        },

                        move(event) {
                            const x =
                                (parseFloat(container.getAttribute("data-x")) ||
                                    0) + event.dx;
                            const y =
                                (parseFloat(container.getAttribute("data-y")) ||
                                    0) + event.dy;

                            container.style.transform = `translate(${x}px, ${y}px)`;
                            container.setAttribute("data-x", x);
                            container.setAttribute("data-y", y);
                        },

                        end(event) {
                            event.target.classList.remove("cursor-grabbing");
                            event.target.classList.add("cursor-grab");
                        },
                    },
                    modifiers: [
                        interact.modifiers.restrict({
                            restriction: hostElement,
                            endOnly: true,
                        }),
                    ],
                });
            });
        } else {
            return;
        }
    });

    onDestroy(() => {
        // Cancel any animation frames or timeouts
        if (typeof holdTimeout !== "undefined" && holdTimeout) {
            clearTimeout(holdTimeout);
        }

        // Clean up interact.js event handlers
        const cleanupInteract = () => {
            if (interact) {
                // Clean up containers
                if (containers) {
                    containers.forEach((container) => {
                        try {
                            interact(container).unset();
                        } catch (e) {}
                    });
                }
            }
        };

        // Clean up any observers
        const cleanupObservers = () => {
            if (currentObserver) {
                try {
                    currentObserver.disconnect();
                } catch (e) {}
            }
        };

        // Clear references to DOM elements to help garbage collection
        const clearReferences = () => {
            containers = null;
            scrollContainers = null;
            hostElement = null;
            scrollableElements = null;
            sections = null;

            // Clear arrays
            initialPositions = [];

            // Clear interact reference
            interact = null;
        };

        // Execute all cleanup functions
        cleanupInteract();
        cleanupObservers();
        clearReferences();
    });
</script>

{#if !$isPageLoaded}
    <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        out:fade={{ duration: 300 }}
    >
        <p>Loading...</p>
    </div>
{/if}

<Sharer />

<section
    class="relative z-[6] bg-transparent w-screen w-dvw min-h-screen min-h-dvh overflow-y-visible
           max-md:grid max-md:grid-rows-[auto_1fr] max-md:static max-md:h-screen max-md:h-[100dvh] max-md:overflow-hidden"
    bind:this={hostElement}
>
    {#if isInteractionLocked}
        <div
            class="fixed inset-0 z-[10000] bg-transparent pointer-events-auto touch-manipulation tap-highlight-transparent"
            aria-hidden="true"
        ></div>
    {/if}

    {#if $windowSizeReady}
        {#each Object.values(data.cardsDb || {}) as card (card.IndexNum)}
            {@const typedCard = card as import("$lib/stores/types").CardData}
            <Capitols
                card={typedCard}
                transitionDelay={getCardFlushOrder(typedCard) * 10}
                {bringToFront}
                {swapCards}
            />
        {/each}
    <!--
        {#if !$isMobileDevice}
            {#each Object.values(data.floatersDb) as singleFloater}
                <Floater
                    data={singleFloater}
                    {hostElement}
                />
            {/each}
        {/if}
        -->
    {/if}
</section>
