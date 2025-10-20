export const initCarousel = () => {
    const carouselDuplicates = 3;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function getTouchMidpoint(touches) {
        let midpoint = {
            x: touches[0].clientX,
            y: touches[0].clientY
        };

        for (let i = 1; i < touches.length; i++) {
            midpoint.x = lerp(midpoint.x, touches[i].clientX, 0.5);
            midpoint.y = lerp(midpoint.y, touches[i].clientY, 0.5);
        }

        return midpoint;
    }

    const carousel = document.querySelector(".Produit-categorie");
    if (!carousel) return;
    
    const carouselContent = carousel.querySelector(".carousel-content");
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const hasFinePointer = matchMedia("(pointer: fine)");
    let carouselHasMouse = false;
    let carouselTouches = 0;
    let lastMouseX = null;
    let lastTouchX = null;
    let scrollDelta = 0;
    let lastTimestamp = 0;

    const handleTouchRemove = (event) => {
        carouselTouches -= event.changedTouches.length;
        if (carouselTouches <= 0 && !carouselHasMouse) {
            lastTouchX = null;
        }
    };

    const updateScroll = (timestamp) => {
        carousel.scrollBy({ left: scrollDelta });

        if (carouselHasMouse || carouselTouches > 0 || prefersReducedMotion.matches) {
            scrollDelta = 0;
        } else {
            scrollDelta = lerp(scrollDelta, 0, 0.045);
        }

        lastTimestamp = timestamp;
        requestAnimationFrame(updateScroll);
    };

    carousel.addEventListener("mousedown", () => { carouselHasMouse = true; });
    window.addEventListener("mouseup", () => { carouselHasMouse = false; lastMouseX = null; });
    
    window.addEventListener("mousemove", (event) => {
        if (carouselHasMouse) {
            if (lastMouseX !== null) {
                scrollDelta = lastMouseX - event.x;
            }
            lastMouseX = event.x;
        }
    });

    carousel.addEventListener("wheel", (event) => {
        if (hasFinePointer.matches && event.shiftKey) {
            event.preventDefault();
            scrollDelta += event.deltaY * (prefersReducedMotion.matches ? 2 : 0.1);
        }
    });

    carousel.addEventListener("touchstart", (event) => {
        if (lastTouchX === null) {
            lastTouchX = getTouchMidpoint(event.touches).x;
        }
        carouselTouches += event.changedTouches.length;
    });

    window.addEventListener("touchmove", (event) => {
        if (lastTouchX !== null) {
            const touchMidpoint = getTouchMidpoint(event.touches);
            scrollDelta = -(touchMidpoint.x - lastTouchX);
            lastTouchX = touchMidpoint.x;
        }
    });

    window.addEventListener("touchend", handleTouchRemove);
    window.addEventListener("touchcancel", handleTouchRemove);

    carousel.addEventListener("scroll", () => {
        const carouselRect = carouselContent.getBoundingClientRect();
        if (carouselRect.left > window.innerWidth) {
            carousel.scrollLeft += carouselRect.width;
        } else if (carouselRect.right < 0) {
            carousel.scrollLeft -= carouselRect.width;
        }
    });

    for (let i = 0; i < carouselDuplicates; i++) {
        const carouselDuplicate = carouselContent.cloneNode(true);
        carouselDuplicate.ariaHidden = true;
        carouselDuplicate.querySelectorAll("a").forEach((el) => { el.tabIndex = "-1"; });
        carousel.prepend(carouselDuplicate);
        carousel.append(carouselDuplicate.cloneNode(true));
    }

    carousel.scrollLeft += carouselContent.offsetWidth * carouselDuplicates;
    requestAnimationFrame(updateScroll);
};