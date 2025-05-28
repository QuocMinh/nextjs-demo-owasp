import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("isLoggedIn")?.value === "true";
  if (isLoggedIn) {
    redirect("/home");
  }
  redirect("/login");
}
