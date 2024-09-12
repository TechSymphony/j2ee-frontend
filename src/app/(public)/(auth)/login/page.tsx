import LoginForm from "@/app/(public)/(auth)/login/login-form";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
}
