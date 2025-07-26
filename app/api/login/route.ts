import { mockUsers } from "@/app/mockData/users";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Context {
  params: undefined;
}

export async function POST(request: NextRequest, context: Context) {
  const body: { email: string, password: string } = await request.json();
  const { email, password } = body;

  const user = mockUsers.find((user) =>  user.email === email && user.password === password);

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!user)
  return NextResponse.json({message: 'Invalid creds!'}, {status: 400});

  // token simulate JWT token, with role for other APIs
  return NextResponse.json({ user: {email: user?.email, role: user?.role }, token: `token;${user?.email};${user?.role}` });
}
