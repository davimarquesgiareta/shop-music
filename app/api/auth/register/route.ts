import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    email,
    password,
    name,
    age,
    gender,
    dateOfBirth,
    profileDescription,
  } = await request.json();
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete(name);
        },
      },
    }
  );

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Erro no registo (Supabase Auth):", authError);
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  if (!authData.user) {
    return NextResponse.json(
      { error: "O utilizador não pôde ser criado." },
      { status: 500 }
    );
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    name,
    age,
    gender,
    date_of_birth: dateOfBirth,
    profile_description: profileDescription,
  });

  if (profileError) {
    console.error("Erro ao inserir o perfil (Supabase DB):", profileError);
    return NextResponse.json(
      { error: "Utilizador autenticado, mas não foi possível criar o perfil." },
      { status: 500 }
    );
  }

  return NextResponse.json(authData);
}
