// Product showcase in the home page hero: an ARIA tabs widget that also rotates.
// Each selected tab runs a CSS progress animation (see site.css); when it ends we
// show the next product. Hover/focus pauses the animation, reduced motion turns it
// off, and choosing a tab stops the rotation for good.
(function () {
    const showcase = document.querySelector("[data-showcase]");
    if (!showcase) return;

    const tabs = Array.from(showcase.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
    let current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");

    function select(index, focus) {
        current = (index + tabs.length) % tabs.length;
        tabs.forEach((tab, i) => {
            const active = i === current;
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
            panels[i].classList.toggle("is-active", active);
            panels[i].inert = !active;
        });
        if (focus) tabs[current].focus();
    }

    function stop() {
        showcase.classList.add("is-stopped");
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            stop();
            select(index, false);
        });
    });

    showcase.querySelector('[role="tablist"]').addEventListener("keydown", (event) => {
        const moves = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in moves)) return;
        event.preventDefault();
        stop();
        select(moves[event.key], true);
    });

    showcase.addEventListener("animationend", (event) => {
        if (!event.target.classList.contains("showcase-progress")) return;
        if (showcase.classList.contains("is-stopped")) return;
        select(current + 1, false);
    });

    select(current, false);
})();
