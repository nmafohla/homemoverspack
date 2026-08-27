import { NextResponse } from "next/server";
import { FeedbackSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = FeedbackSchema.safeParse(body);

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
        "Thank you for sharing your feedback with the HomeMoversPack team!",
    });
  } catch (error: unknown) {
    const correlationId = `err-${Date.now()}`;
    console.error(`[${correlationId}] Feedback submission error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit feedback at this moment. Please try again.",
        correlationId,
      },
      { status: 500 },
    );
  }
}
