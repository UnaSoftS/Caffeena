// import { Users, Comment, Menu, Categorys } from "@prisma/client";

// export type Jwtpayload = {
//   id: number;
//   email: string;
//   username: string;
//   isAdmin: boolean;
// };
import { Menu, Comment, User } from "@prisma/client";

export type Jwtpayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export type CommentWithUser = Comment & { user: User };
