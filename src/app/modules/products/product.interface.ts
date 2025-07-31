export type TProduct = {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    tags: string[];
    variants: TVariant[];
    inventory: TInventory,
}

export type TVariant = {
    type: string;
    value: string;
}

export type TInventory = {
    quantity: number;
    inStock: boolean;
}