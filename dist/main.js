"use strict";
let checkBoxes = document.querySelectorAll("input[type='checkbox']");
let products = document.querySelectorAll(".col-lg-3.col-md-6.col-sm-12");
checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let activeFilters = [];
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
//# sourceMappingURL=main.js.map
