import axios from "../utils/axios"
import {IProduct, IResponse} from "../types";

const baseUri = "/api/v1/products";

export const getProducts = async (): Promise<IResponse<IProduct[]>> => {
    const res = await axios.get(baseUri);
    return res.data;
}

export const getProductById = async (id: string): Promise<IResponse<IProduct>> => {
    const res = await axios.get(`${baseUri}/${id}`);
    return res.data;
}

export const createProduct = async (product: IProduct): Promise<IResponse<IProduct>> => {
    const res = await axios.post(baseUri, product);
    return res.data;
}

export const updateProduct = async (id: string, product: IProduct): Promise<IResponse<IProduct>> => {
    const res = await axios.put(`${baseUri}/${id}`, product);
    return res.data;
}

export const deleteProduct = async (id: string): Promise<IResponse<IProduct>> => {
    const res = await axios.delete(`${baseUri}/${id}`);
    return res.data;
}