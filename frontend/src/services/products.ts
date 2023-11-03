import { Axios } from "axios";
import { Product } from "../components/CreateProductForm";
import { api } from "./api";

class ProductsService {
  api: Axios;

  constructor(api: Axios) {
    this.api = api;
  }

  async create(data: Product, token: string) {
    return await this.api.post("/products/", data, {
      headers: {
        Authorization: token,
      },
    });
  }

  async update(data: Product, id: number, token: string) {
    return await this.api.patch(`/products/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  async get(id: number) {
    return await this.api.get<Product>(`/products/${id}`);
  }

  async delete(id: number, token: string) {
    this.api.delete(`/products/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

const productsService = new ProductsService(api);

export default productsService;
