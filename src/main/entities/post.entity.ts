interface IPost {
    title: string;
    content: string;
    author: string; // author id
    tags: string[]; // tags names
    categories: string[]; // categories names
    createdAt?: string;
    updatedAt?: string;
}

export { IPost };