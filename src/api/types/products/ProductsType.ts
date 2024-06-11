export type ProductType = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    options: {
        choices: { text: string }[];
    }[];
    media: {
        images: { imageOriginalUrl: string }[];
    };
}