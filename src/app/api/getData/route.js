import { NextResponse } from "next/server";
import fs from 'fs';

export async function GET(request) {
  try {
    let existingData = {};

    if (fs.existsSync('formData.json')) {
      const fileContent = fs.readFileSync('formData.json', 'utf-8');
      if (fileContent.trim() !== '') {
        existingData = JSON.parse(fileContent);
      }
    }

    const peopleData = existingData.PEOPLE || [];

    return new NextResponse(JSON.stringify({ PEOPLE: peopleData }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error :(", { status: 500 });
  }
}
  