import { mockUsers } from "@/app/mockData/users";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Context {
  params: undefined;
}

export async function GET(request: NextRequest, context: Context) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!token) {
    return NextResponse.json('Unauthorized', {status: 401});
  }

  const [_, email] = token.split(';')

  const user = mockUsers.find((user) =>  user.email === email);

  // simulate IO latency

  if (!user)
  return NextResponse.json({message: 'Invalid creds!'}, {status: 400});

  // token simulate JWT token, with role for other APIs
  return NextResponse.json({ user: {email: user?.email, role: user?.role } });
}
