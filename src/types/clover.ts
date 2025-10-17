// src/types/clover.ts

/** الحقول التي نحتاجها من Clover Payment */
export interface CloverTender {
  label?: string;
  labelKey?: string;
}

export interface CloverOrderRef {
  id?: string;
}

export type CloverPaymentResult =
  | "SUCCESS"
  | "VOIDED"
  | "FAIL"
  | "OFFLINE_UNCREDITED"
  | "PENDING"
  | string; // احتياط لأي قيم مستقبلية

export interface CloverPayment {
  id: string;
  /** المبلغ الإجمالي بالـ cents (ms units للوقت فقط) */
  amount: number;
  tipAmount?: number;
  taxAmount?: number;

  /** وقت الإنشاء بالـ milliseconds since epoch */
  createdTime: number;

  result: CloverPaymentResult;
  tender?: CloverTender;
  order?: CloverOrderRef;

  // حقول شائعة أخرى إن احتجتها لاحقًا:
  /** last4, brand, إلخ… تظهر أحيانًا داخل tender أو source */
  // cardTransaction?: { ... }
}

/** استجابة Clover القياسية لقوائم العناصر */
export interface CloverListResponse<T> {
  elements: T[];
  href?: string;
  /** للترقيم/الصفحات */
  next?: string;
}
