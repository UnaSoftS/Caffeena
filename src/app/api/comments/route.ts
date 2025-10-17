import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { CreateComments } from "@/utils/Dtos";
import { CreateCommentsValidationSchema } from "@/utils/validation";
import { verifyToken } from "@/utils/verifayToken";

// ✅ Create Comment API (POST)
export async function POST(request: NextRequest) {
  try {
    // 1) Auth
    const authUser = verifyToken(request);
    if (!authUser) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );
    }

    // 2) Validate body
    const body = (await request.json()) as CreateComments;
    const parsed = CreateCommentsValidationSchema.safeParse(body);
    if (!parsed.success) {
      // نُظهر رسالة مختصرة من Zod بدون تفصيل طويل
      return NextResponse.json(
        { message: "invalid comment payload" },
        { status: 400 }
      );
    }

    // 3) Create comment
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        menuId: body.IDmenu, // نحافظ على IdMenu كما هو في جسم الطلب
        userId: authUser.id,
      },
      // اختياري: إرجاع روابط مبسطة
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error wallah" },
      { status: 500 }
    );
  }
}
