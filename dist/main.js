"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const checkBoxes = document.querySelectorAll("input[type='checkbox'][data-product]");
    const products = document.querySelectorAll("[data-product]");
    const applyFilters = () => {
        const activeFilters = Array.from(checkBoxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.dataset.product || "")
            .filter(Boolean);
        products.forEach((product) => {
            const productType = product.dataset.product || "";
            const shouldShow = activeFilters.length === 0 || activeFilters.includes(productType);
            if (shouldShow) {
                product.classList.remove("d-none");
            }
            else {
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
    const navLinks = document.querySelectorAll(".navbar a.nav-link[href^='#']");
    const navbarCollapseEl = document.getElementById("navbarSupportedContent");
    const collapseNavbar = () => {
        if (!navbarCollapseEl)
            return;
        const winAny = window;
        const isShown = navbarCollapseEl.classList.contains("show");
        if (!isShown)
            return;
        if (winAny.bootstrap && winAny.bootstrap.Collapse) {
            const instance = winAny.bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);
            instance.hide();
        }
        else {
            navbarCollapseEl.classList.remove("show");
            const toggler = document.querySelector(".navbar-toggler");
            if (toggler)
                toggler.setAttribute("aria-expanded", "false");
        }
    };
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href") || "";
            if (!targetId.startsWith("#") || targetId === "#")
                return;
            const targetEl = document.querySelector(targetId);
            if (!targetEl)
                return;
            event.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            collapseNavbar();
        });
    });
});
let cartShopping = document.querySelector(".cart-shop");
let buttonSlider = document.querySelector(".button-cart");
buttonSlider.style.display = "none";
cartShopping.onclick = function () {
    buttonSlider.click();
};
//# sourceMappingURL=main.js.map