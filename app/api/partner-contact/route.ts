import { NextResponse } from "next/server";
import { PartnerContactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = PartnerContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out. Our partnership team will be in touch within 1 business day.",
    });
  } catch (error: unknown) {
    const correlationId = `err-${Date.now()}`;
    console.error(
      `[${correlationId}] Partner contact submission error:`,
      error,
    );
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send message at this time. Please try again.",
        correlationId,
      },
      { status: 500 },
    );
  }
}
