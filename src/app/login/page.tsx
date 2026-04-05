import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/auth-shell";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (email) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to your campus drip network."
      subtitle="Access your feed, borrow dashboard, and lending control center inside DripSwap."
    >
      <LoginForm />
    </AuthShell>
  );
}