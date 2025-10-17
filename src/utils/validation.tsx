// ✅ Regester validation
// src/utils/validation.ts
import { text } from "stream/consumers";
import { email, z } from "zod";
export const registerValidationSchema = z.object({
  username: z.string().min(3, "اسم المستخدم قصير جداً"), email: z.string().email("بريد إلكتروني غير صالح"),
  password: z .string() .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل") .regex(/[A-Z]/, "تتضمن حرفاً كبيراً واحداً على الأقل").regex(/[0-9]/, "تتضمن رقماً واحداً على الأقل"),
});
export type RegisterInput = z.infer<typeof registerValidationSchema>;

//Login validation
export const LoginValidationSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "تتضمن حرفاً كبيراً واحداً على الأقل")
    .regex(/[0-9]/, "تتضمن رقماً واحداً على الأقل"),
});
export type LoginInput = z.infer<typeof LoginValidationSchema>;


//////////////////////////////////////////////////
//

export const CreateCommentsValidationSchema = z.object({
  text: z
    .string({ 
    })
    .min(2, "Comment must be at least 2 characters long")
    .max(500, "Comment cannot exceed 500 characters"),

 IDmenu: z
    .number({
      })
    .int("menuId must be an integer")
    .positive("menuId must be a positive number"),
});

