import swal, {SweetAlertResult} from "sweetalert2"
import dayjs from "dayjs"

import './style.css'
import {IProduct, IResponse} from "./types"
import {deleteProduct, getProductById, getProducts} from "./apis/product.ts"
import {formatNumber} from "./utils/formatNumber.ts"

const studentListBodyEl: Element | null = document.querySelector(".student-list__body");

const loadProducts = async (): Promise<void> => {
    const res: IResponse<IProduct[]> = await getProducts();
    const products = res.data;
    products.forEach(renderProduct);
}

const renderProduct = (product: IProduct): void => {
    const trEl = document.createElement("tr");
    trEl.classList.add("product-item");
    trEl.innerHTML = `
            <td class="border-b border-slate-300 text-center p-4 text-slate-800">${product.id}</td>
            <td class="border-b border-slate-300 text-center p-4 text-slate-800 truncate">${product.name}</td>
            <td class="border-b border-slate-300 text-center p-4 text-slate-800 max-w-[20rem] truncate" title="${product.description}">${product.description}</td>
            <td class="border-b border-slate-300 text-center p-4 text-slate-800">${product.stock}</td>
            <td class="border-b border-slate-300 text-center p-4 text-slate-800">${formatNumber(product.price)}</td>
            <td class="border-b border-slate-300 text-center p-4 text-slate-800">
                <button class="btn-primary btn-view-product-detail mx-4" data-id="${product.id}">View</button>
                <button class="btn-destroy btn-delete-product mx-4" data-id="${product.id}">Delete</button>
            </td>
        `
    studentListBodyEl!.appendChild(trEl);
}

const loadProductDetail = async (id: string): Promise<void> => {
    const res: IResponse<IProduct> = await getProductById(id!);
    const product: IProduct = res.data;

    const result: SweetAlertResult = await swal.fire({
        title: "Product Detail",
        icon: "info",
        html: `
           <ul>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">ID</span>
                    <span>${product.id}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Name</span>
                    <span>${product.name}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Description</span>
                    <span class="truncate max-w-[30rem]" title="${product.description}">${product.description}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Stock</span>
                    <span>${product.stock}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Price</span>
                    <span>${formatNumber(product.price)}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Slug</span>
                    <span>${product.slug}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Created At</span>
                    <span>${dayjs(product.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                </li>
                <li class="p-2 flex justify-between items-center">
                    <span class="font-medium">Updated At</span>
                    <span>${dayjs(product.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                </li>
           </ul>
        `,
        showCancelButton: true,
        confirmButtonText: "Edit",
        reverseButtons: true
    });

    if (result.isConfirmed) {
        window.location.href = `/edit-product.html?id=${product.id}`;
    }
}

const btnViewProductClickHandler = async (btn: HTMLButtonElement): Promise<void> => {
    btn.addEventListener("click", async (): Promise<void> => {
        const id: string | undefined = btn.dataset.id;
        await loadProductDetail(id!);
    });
}

const btnDeleteProductClickHandler = async (btn: HTMLButtonElement): Promise<void> => {
    btn.addEventListener("click", async (): Promise<void> => {
        const id: string | undefined = btn.dataset.id;

        try {
            await deleteProduct(id!);

            await swal.fire({
                title: "Success",
                icon: "success",
                text: "Product deleted successfully!"
            });

            window.location.reload();
        } catch (e: any) {
            await swal.fire({
                title: "Oops",
                icon: "error",
                text: e.message
            });
        }
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();

    const btnViewProductDetailEls: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btn-view-product-detail");
    const btnDeleteProductEls: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btn-delete-product");

    btnViewProductDetailEls.forEach(btnViewProductClickHandler);
    btnDeleteProductEls.forEach(btnDeleteProductClickHandler);
});
