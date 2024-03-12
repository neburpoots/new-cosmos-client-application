import { Product } from "./product";
import { PurchasingData } from "./purchasingData";
import { Stock } from "./stock";

export interface CDArtikel {
    cdartikel: string;
    stock: Stock;
    product: Product;
    purchasingData: PurchasingData;
    advice: number;
}