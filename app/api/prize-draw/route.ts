import { NextResponse } from "next/server";
import { PrizeDrawSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = PrizeDrawSchema.safeParse(body);

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

    const { firstName, email } = result.data;
    const entryReference = `HMP-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      message: `Thank you ${firstName}! Your £10,000 Home Makeover prize draw entry has been registered.`,
      reference: entryReference,
      emailSentTo: email,
    });
  } catch (error: unknown) {
    const correlationId = `err-${Date.now()}`;
    console.error(`[${correlationId}] Prize draw submission error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process entry at this time. Please try again.",
        correlationId,
      },
      { status: 500 },
    );
  }
}
