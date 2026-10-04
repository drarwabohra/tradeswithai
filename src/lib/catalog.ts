import products from "@/data/products.json";
import site from "@/data/site.json";
export type Product = (typeof products)[number];
export type Site = typeof site;
export const catalog: Product[] = products;
export const findProduct = (id: string) => catalog.find(p => p.id === id);
