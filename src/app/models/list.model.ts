import { ListItem } from "./list-item.model";

export class List {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    finishedAt: Date;
    complete: boolean;
    items: ListItem[];
    products: ListItem[];

    constructor( name:string, description: string){ 
        this.name = name;
        this.description = description;
        this.createdAt = new Date();
        this.complete = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}