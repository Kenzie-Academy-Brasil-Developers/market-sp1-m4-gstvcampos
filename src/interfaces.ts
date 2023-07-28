export interface Product {
    id: number;
    name: string;
    price: number;
    weight: number; //gramas
    section: "food" | "cleaning";
    calories: number | null | undefined;
    expirationDate: Date;
}