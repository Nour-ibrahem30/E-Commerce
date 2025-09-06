// Select Elements 
const cartShopping = document.querySelector(".cart-shop") as HTMLElement;
const buttonSlider = document.querySelector(".button-cart") as HTMLElement;
const sliderBody = document.querySelector(".offcanvas-body") as HTMLElement;
const buttonMessage = document.querySelector(".button-message") as HTMLElement;
const offcanvas = document.querySelector(".offcanvas") as HTMLElement;
const totalPrice = document.querySelector(".total-price") as HTMLElement;
const iconRemove = document.querySelector(".icon-remove") as HTMLElement;
const checkBoxes = document.querySelectorAll<HTMLInputElement>("input[type='checkbox'][data-product]");
const products = document.querySelectorAll<HTMLElement>("[data-product]:not(input)");
// Style Element
buttonSlider.style.display = "none";
iconRemove.style.display = "none";

// Guard until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Filtering (runs only if elements exist)
    const applyFilters = () => {
        const activeFilters: string[] = Array.from(checkBoxes)
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



// Badge counter
const countNumberElement = document.createElement("span");
countNumberElement.classList.add("cart-badge");
cartShopping.appendChild(countNumberElement);

// Update cart count
function updateCartCount() {
    const productsInCart = sliderBody.querySelectorAll(".cart-item");
    countNumberElement.textContent = `${productsInCart.length}`;
}

// Update total price
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

// Cart toggle
cartShopping.onclick = () => buttonSlider.click();

// Add product to cart
products.forEach((e) => {
    e.addEventListener("click", () => {
        const productCopy = e.cloneNode(true) as HTMLElement;
        productCopy.classList.add("cart-item", "col-lg-7", "col-md-6", "col-sm-12");
        productCopy.style.transition = "0.3s";
        productCopy.style.marginBottom = "30px";

        const iconRemoveCopy = iconRemove.cloneNode(true) as HTMLElement;
        iconRemoveCopy.style.cursor = "pointer";
        iconRemoveCopy.style.display = "block";
        iconRemoveCopy.style.margin = "30px";
        iconRemoveCopy.style.color = "red";
        buttonMessage.click();

        productCopy.appendChild(iconRemoveCopy);
        sliderBody.appendChild(productCopy);

        // Update UI
        updateCartCount();
        updateTotalPrice();
        buttonSlider.click();

        // Remove product
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

// Disable products when offcanvas is open
offcanvas.addEventListener("show.bs.offcanvas", () => {
    products.forEach((e) => (e.style.cursor = "no-drop"));
});
offcanvas.addEventListener("hide.bs.offcanvas", () => {
    products.forEach((e) => (e.style.cursor = "pointer"));
});


// Declare bootstrap if loaded globally
declare const bootstrap: any;

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger && typeof bootstrap !== "undefined" && toastLiveExample) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}