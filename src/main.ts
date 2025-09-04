// Guard until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Filtering (runs only if elements exist)
    const checkBoxes = document.querySelectorAll<HTMLInputElement>("input[type='checkbox'][data-product]");
    const products = document.querySelectorAll<HTMLElement>("[data-product]");

    const applyFilters = () => {
        const activeFilters: string[] = Array.from(checkBoxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.dataset.product || "")
            .filter(Boolean);

        products.forEach((product) => {
            const productType = product.dataset.product || "";
            const shouldShow = activeFilters.length === 0 || activeFilters.includes(productType);

            if (shouldShow) {
                product.classList.remove("d-none");
            } else {
                product.classList.add("d-none");
            }
        });
    };

    if (checkBoxes.length > 0 && products.length > 0) {
        checkBoxes.forEach((checkbox) => {
            checkbox.addEventListener("change", applyFilters, { passive: true });
        });
        applyFilters();
    }

    // Smooth scroll and auto-collapse navbar on link click
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".navbar a.nav-link[href^='#']");
    const navbarCollapseEl = document.getElementById("navbarSupportedContent");

    const collapseNavbar = () => {
        if (!navbarCollapseEl) return;
        const winAny = window as unknown as { bootstrap?: any };
        const isShown = navbarCollapseEl.classList.contains("show");
        if (!isShown) return;
        if (winAny.bootstrap && winAny.bootstrap.Collapse) {
            const instance = winAny.bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);
            instance.hide();
        } else {
            navbarCollapseEl.classList.remove("show");
            const toggler = document.querySelector<HTMLButtonElement>(".navbar-toggler");
            if (toggler) toggler.setAttribute("aria-expanded", "false");
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href") || "";
            if (!targetId.startsWith("#") || targetId === "#") return;
            const targetEl = document.querySelector<HTMLElement>(targetId);
            if (!targetEl) return;
            event.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            collapseNavbar();
        });
    });
});
