import bcrypt from "bcryptjs";

import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

const accFilePath = "acc.json";

export const POST = async (request) => {
  const { name, email, password, isAdmin } = await request.json();

  const accData = JSON.parse(await readFile(accFilePath, "utf-8"));

  const existingUserByName = accData.find((user) => user.name === name);
  const existingUserByEmail = accData.find((user) => user.email === email);

  if (existingUserByName) {
    return new NextResponse("Username already exists.", {
      status: 409,
    });
  }

  if (existingUserByEmail) {
    return new NextResponse("Email already exists.", {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    isAdmin,
  };

  accData.push(newUser);

  try {
    await writeFile(accFilePath, JSON.stringify(accData, null, 2), "utf-8");
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
