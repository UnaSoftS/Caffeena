export type MenuReq = {
  id: string;
  name: string;
  price: number; //Dollars
  category: string;
};
export interface updateMenuReq {
  id: string;
  name?: string;
  price?: number; 
  category?: string;
}
export interface RegisterUser {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface UpdateUser {
  usernam?: string;
  password?: string;
  email?: string;
}

export interface CreateComments {
  text: string;
  IDmenu: number;
}
