import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(NextResponse);
  return NextResponse.json({
    hello: "world",
  });
}
