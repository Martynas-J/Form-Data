import { NextResponse } from "next/server";
import fs from "fs";

export async function PUT(request) {
  const formData = await request.json();

  try {
    if (fs.existsSync("formData.json")) {
      const fileContent = fs.readFileSync("formData.json", "utf-8");
      if (fileContent.trim() !== "") {
        let existingData = JSON.parse(fileContent);

        const existingIndex = existingData.PEOPLE.findIndex(
          (item) => item.id === formData.id
        );

        if (existingIndex !== -1) {
          existingData.PEOPLE[existingIndex] = formData;
        }

        fs.writeFileSync(
          "formData.json",
          JSON.stringify(existingData, null, 2)
        );

        return new NextResponse(`Data has been updated`, { status: 200 });
      }
    }

    return new NextResponse(`No data found to delete`, { status: 404 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error :(", { status: 500 });
  }
}
