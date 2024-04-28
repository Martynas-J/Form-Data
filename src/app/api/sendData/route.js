import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(request) {
  const formData = await request.json();

  try {
    let existingData = {};

    if (fs.existsSync('formData.json')) {
      const fileContent = fs.readFileSync('formData.json', 'utf-8');
      if (fileContent.trim() !== '') {
        existingData = JSON.parse(fileContent);
      }
    }

    const id = uuidv4();

    const nr = existingData.PEOPLE?.length > 0 ? existingData.PEOPLE[existingData.PEOPLE?.length-1]?.nr +1  : 1;
    const currentDate = new Date().toISOString(); // Gauname dabartinę datą laiko juosta ISO formatu

    // Sukuriame newData objektą su visais laukais, įskaitant datą
    const newData = {
      nr,
      id,
      createdAt: currentDate, // Sukurimo data
      updatedAt: currentDate, // Atnaujinimo data pradinėje įrašo kūrimo stadijoje yra tokia pati kaip ir sukūrimo data
      ...formData
    };

    if (!existingData.PEOPLE) {
      existingData.PEOPLE = [];
    }

    existingData.PEOPLE.push(newData);
    fs.writeFileSync('formData.json', JSON.stringify(existingData));

    return new NextResponse(`Data has been updated`, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Database Error :(", { status: 500 });
  }
}
