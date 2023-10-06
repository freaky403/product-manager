import swal from "sweetalert2"

import "./style.css"
import {IProduct, IResponse} from "./types"
import {getProductById, updateProduct} from "./apis/product.ts"

const productNameEl: HTMLInputElement | null = document.querySelector("#name");
const productDescriptionEl: HTMLInputElement | null = document.querySelector("#description");
const productStockEl: HTMLInputElement | null = document.querySelector("#stock");
const productPriceEl: HTMLInputElement | null = document.querySelector("#price");
const productSlugEl: HTMLInputElement | null = document.querySelector("#slug");
const btnEditProductEl: HTMLButtonElement | null = document.querySelector("#edit-product");

const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
const id: string | null = urlParams.get("id");

const loadProduct = async (): Promise<void> => {
    if (!id) return;

    const res: IResponse<IProduct> = await getProductById(id);
    const product = res.data;
    setProductData(product);
}

const setProductData = (product: IProduct): void => {
    productNameEl!.value = product.name;
    productDescriptionEl!.value = product.description;
    productStockEl!.value = String(product.stock);
    productPriceEl!.value = String(product.price);
    productSlugEl!.value = product.slug;
}

const updateProductHandler = async (): Promise<void> => {
    if (!id) return;

    const product: IProduct = {
        name: productNameEl!.value,
        description: productDescriptionEl!.value,
        stock: Number(productStockEl!.value),
        price: Number(productPriceEl!.value),
        slug: productSlugEl!.value
    }

    try {
        const res: IResponse<IProduct> = await updateProduct(id, product);

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

document.addEventListener("DOMContentLoaded", async () => {
    await loadProduct();
    btnEditProductEl!.addEventListener("click", updateProductHandler);
});