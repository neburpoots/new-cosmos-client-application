import { Product } from "./product";
import { Stock } from "./stock";

export interface CDArtikel {
    cdartikel: string;
    stock: Stock;
    product: Product;
    advice: number;
}