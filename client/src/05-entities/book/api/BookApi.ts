import type { AxiosResponse } from "axios";
import { axiosInstance } from "@/06-shared/lib/axiosInstance";
import type { IApiResponse } from "@/06-shared/types";
import type { IBook, IRawBook } from "../model";

export class BookApi {
  static async getAll(): Promise<IApiResponse<IBook[]>> {
    try {
      // деструктуризация из объекта response axios
      const { data } = await axiosInstance.get<IApiResponse<IBook[]>>("/books");
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async create(book: IRawBook): Promise<IApiResponse<IBook>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IBook>>(
        "/books",
        book
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async delete(id: number): Promise<AxiosResponse> {
    try {
      const { data } = await axiosInstance.delete<AxiosResponse>(
        `/books/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async update(id: number, data: IRawBook): Promise<IBook> {
    try {
      const responce = await axiosInstance.put<IBook>(`/books/${id}`, data);
      return responce.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getOne(id: number): Promise<IApiResponse<IBook>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IBook>>(
        `/books/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllBooksByUserId(id: number): Promise<IApiResponse<IBook[]>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IBook[]>>(
        `/account/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
