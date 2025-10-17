
export type Order = {
    id:number;
    price:number;
    quantity:number;
    date:string;
    Category:string;
    author:string;
}

 export const order:Order[]=[
    {id:1, price:1000,quantity:2, date:"2023-01-01" , Category:"coffee", author:"deena"},
    {id:2, price:2000,quantity:3, date:"2023-01-01", Category:"tea", author:"mohamed"},
    {id:3, price:3000,quantity:4, date:"2023-01-01" , Category:"juice", author:"sara"},
    {id:4, price:4000,quantity:5, date:"2023-01-01" , Category:"Hot", author:"lina"},
    {id:5, price:5000,quantity:6, date:"2023-01-01" , Category:"Iced", author:"ali"},
]