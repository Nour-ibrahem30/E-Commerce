"use strict";
const cartShopping = document.querySelector(".cart-shop");
const buttonSlider = document.querySelector(".button-cart");
const sliderBody = document.querySelector(".offcanvas-body");
const buttonMessage = document.querySelector(".button-message");
const offcanvas = document.querySelector(".offcanvas");
const totalPrice = document.querySelector(".total-price");
const iconRemove = document.querySelector(".icon-remove");
const checkBoxes = document.querySelectorAll("input[type='checkbox'][data-product]");
const products = document.querySelectorAll("[data-product]:not(input)");
buttonSlider.style.display = "none";
iconRemove.style.display = "none";
document.addEventListener("DOMContentLoaded", () => {
    const applyFilters = () => {
        const activeFilters = Array.from(checkBoxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.dataset.product || "")
            .filter(Boolean);
        products.forEach((product) => {
            const productType = product.dataset.product || "";
            const shouldShow = activeFilters.length === 0 || activeFilters.includes(productType);
            product.classList.toggle("d-none", !shouldShow);
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
const countNumberElement = document.createElement("span");
countNumberElement.classList.add("cart-badge");
cartShopping.appendChild(countNumberElement);
function updateCartCount() {
    const productsInCart = sliderBody.querySelectorAll(".cart-item");
    countNumberElement.textContent = `${productsInCart.length}`;
}
function updateTotalPrice() {
    let sum = 0;
    sliderBody.querySelectorAll(".cart-item .price").forEach((e) => {
        let text = e.textContent || "0";
        text = text.replace(/[^0-9.]/g, "");
        let value = parseFloat(text);
        sum += isNaN(value) ? 0 : value;
    });
    totalPrice.textContent = sum.toFixed(2) + " $";
}
cartShopping.onclick = () => buttonSlider.click();
products.forEach((e) => {
    e.addEventListener("click", () => {
        const productCopy = e.cloneNode(true);
        productCopy.classList.add("cart-item", "col-lg-7", "col-md-6", "col-sm-12");
        productCopy.style.transition = "0.3s";
        productCopy.style.marginBottom = "30px";
        const iconRemoveCopy = iconRemove.cloneNode(true);
        iconRemoveCopy.style.cursor = "pointer";
        iconRemoveCopy.style.display = "block";
        iconRemoveCopy.style.margin = "30px";
        iconRemoveCopy.style.color = "red";
        buttonMessage.click();
        productCopy.appendChild(iconRemoveCopy);
        sliderBody.appendChild(productCopy);
        updateCartCount();
        updateTotalPrice();
        buttonSlider.click();
        iconRemoveCopy.onclick = () => {
            productCopy.style.opacity = "0";
            setTimeout(() => {
                productCopy.remove();
                updateCartCount();
                updateTotalPrice();
            }, 300);
        };
    });
});
offcanvas.addEventListener("show.bs.offcanvas", () => {
    products.forEach((e) => (e.style.cursor = "no-drop"));
});
offcanvas.addEventListener("hide.bs.offcanvas", () => {
    products.forEach((e) => (e.style.cursor = "pointer"));
});
const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
if (toastTrigger && typeof bootstrap !== "undefined" && toastLiveExample) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
    });
}
//# sourceMappingURL=main.js.map