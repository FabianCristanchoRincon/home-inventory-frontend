export class ListItem {
    id: number;
    desc: string;
    complete: boolean;
    name: string;

    constructor( desc:string ){ 
        this.desc = desc;
        this.complete = false;
    }
}