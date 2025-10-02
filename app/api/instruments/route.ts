import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { instrumentSchema } from "@/lib/validations/instrument";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  try {
    const requestData = await request.json();

    const validatedData = instrumentSchema.parse(requestData);

    const { data: newInstrument, error: insertError } = await supabase
      .from("instruments")
      .insert({
        ...validatedData,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting instrument:", insertError);
      return NextResponse.json(
        { error: "Could not create the instrument." },
        { status: 500 }
      );
    }

    return NextResponse.json(newInstrument, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data provided.", details: String(error) },
      { status: 400 }
    );
  }
}
