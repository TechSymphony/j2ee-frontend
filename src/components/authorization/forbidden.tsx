import { useRouter } from "next/navigation";

const Forbidden = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold mt-4">
        Bạn không có quyền truy cập vào trang này.
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Vui lòng kiểm tra lại quyền truy cập của bạn hoặc liên hệ với quản trị
        viên.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default Forbidden;
