import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "user_id parameter is required" },
        { status: 400 }
      );
    }

    // Backend API URL - hardcoded to localhost:8000
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "BACKEND_URL environment variable is not set" },
        { status: 500 }
      );
    }
    const apiEndpoint = `${backendUrl}/autorec/random-top-rated?user_id=${userId}`;

    console.log("Proxying request to:", apiEndpoint);

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("Backend error:", response.status, errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch top-rated movie from backend server",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
