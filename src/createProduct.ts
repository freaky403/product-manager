import swal from "sweetalert2"

import "./style.css"
import {IProduct, IResponse} from "./types"
import {createProduct} from "./apis/product.ts"

const productNameEl: HTMLInputElement | null = document.querySelector("#name");
const productDescriptionEl: HTMLInputElement | null = document.querySelector("#description");
const productStockEl: HTMLInputElement | null = document.querySelector("#stock");
const productPriceEl: HTMLInputElement | null = document.querySelector("#price");
const productSlugEl: HTMLInputElement | null = document.querySelector("#slug");
const btnCreateProductEl: HTMLButtonElement | null = document.querySelector("#create-product");

const createProductHandler = async (): Promise<void> => {
    const product: IProduct = {
        name: productNameEl!.value,
        description: productDescriptionEl!.value,
        stock: Number(productStockEl!.value),
        price: Number(productPriceEl!.value),
        slug: productSlugEl!.value
    };

    try {
        const res: IResponse<IProduct> = await createProduct(product);

        await swal.fire({
            title: "Success",
            icon: "success",
            text: res.msg
        });

        window.location.replace("/");
    } catch (e: any) {
        await swal.fire({
            title: "Oops",
            icon: "error",
            text: e.message
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    btnCreateProductEl!.addEventListener("click", createProductHandler);
});

