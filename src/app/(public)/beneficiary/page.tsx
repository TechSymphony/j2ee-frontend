import BeneficiaryForm from "@/components/forms/beneficiary-form";

export default function Beneficiary() {
  return (
    <div className="bg-pink-50">
      <div className="container px-4 py-8 md:py-10 lg:py-14 ">
        <div className="my-6 bg-white rounded-xl px-4 py-8">
          <h2 className="text-xl  font-bold lg:text-2xl text-pink-darker text-center">
            Gửi nguyện vọng mới
          </h2>
          <h3 className="text-sm my-2 w-3/5 m-auto text-center leading-4 text-gray-600 md:text-base">
            Cá nhân có hoàn cảnh khó khăn mong muốn nhận sự hỗ trợ vui lòng điền
            thông tin vào form nguyện vọng và gửi đi. Chúng tôi sẽ xem xét và
            phản hồi sớm nhất cho bạn !
          </h3>
          <BeneficiaryForm />
        </div>
      </div>
    </div>
  );
}
