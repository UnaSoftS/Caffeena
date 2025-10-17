import { NextRequest, NextResponse } from "next/server";
import { order } from "@/lib/ordedata";
// Removed duplicate import

/*
method: 'GET', // Type of request
    description: 'Get all menu items', // Description of the endpoint
    route: '/api/menu', // Route of the endpoint
    access: 'public', // Access level (public or private)
*/ 
export function GET(request: NextRequest) {
     // يقوم بتحويل ملف الجافا سكربت الى ملف جيسون
    // ويقوم بارسال البيانات الى الواجهة الامامية
    //ويقوم بارسال كود 200 اذا تم بنجاح
    return NextResponse.json(order, { status: 200 });
}

