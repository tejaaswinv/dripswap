import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/signup-form";
import AuthShell from "@/components/auth/auth-shell";

export default async function SignUpPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("dripswap_user_email")?.value;

  if (email) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="DripSwap"
      title="Join your verified campus drip network."
      subtitle="Borrow for occasions. Lend responsibly. Build trust within real university communities."
    >
      <SignUpForm />
    </AuthShell>
  );
}