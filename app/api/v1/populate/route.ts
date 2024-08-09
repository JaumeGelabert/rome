import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // create 10 random tasks
    await db.task.createMany({
      data: Array.from({ length: 10 }, (_, i) => ({
        title: `Task ${i}`,
        userId: "474c5841-92e7-4fc9-a46a-59a905378659",
      })),
    });
    return NextResponse.json({
      message: "Populated 10 tasks",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      isError: true,
      message: "Error while populating ",
    });
  }
}
