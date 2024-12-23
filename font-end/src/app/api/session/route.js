const fs = require("fs");
import { NextResponse } from "next/server";
export async function POST(request) {
    const { token, user } = await request.json();
    if (token) {
        const name = token.split('|').slice(-1).join('');
        const path = process.cwd() + "/session/" + name;
        fs.writeFileSync(path, JSON.stringify(user));
    }
    
    return NextResponse.json({
        success: true,
    });
    
} 
export async function GET(request) {
  const token = request.headers.get("token");
  if (token) {
    const name = token.split("|").slice(-1).join("");
    const path = process.cwd() + "/session/" + name;
    const user = JSON.parse(fs.readFileSync(path));
    return NextResponse.json({
      user,
    });
  }
  return NextResponse.json({
    user: null,
  });
}