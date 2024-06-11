type ProductOptionChoice = {
    text: string;
}

type ProductOption = {
    choices: ProductOptionChoice[];
}

export type ProductDetailType = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    options?: ProductOption[];
}