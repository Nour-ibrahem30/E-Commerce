// Select Elements
let checkBoxes = document.querySelectorAll<HTMLInputElement>("input[type='checkbox']");
let products = document.querySelectorAll<HTMLElement>(".col-lg-3.col-md-6.col-sm-12");

// Handle Change Event
checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        // Collect all checked values
        let activeFilters: string[] = [];
        checkBoxes.forEach((cb) => {
            if (cb.checked) {
                activeFilters.push(cb.dataset.product || "");
            }
        });

        products.forEach((product) => {
            let productType = product.dataset.product;

            if (activeFilters.length === 0) {
                product.classList.remove("hide");
                product.classList.add("show");
            } else if (productType && activeFilters.includes(productType)) {
                product.classList.remove("hide");
                product.classList.add("show");
            } else {
                product.classList.remove("show");
                product.classList.add("hide");
            }
        });
    });
});
