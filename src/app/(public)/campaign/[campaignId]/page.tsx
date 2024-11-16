"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Home } from "lucide-react";
import CampaignList from "@/components/campaign/campaign-list";
import { useParams } from "next/navigation";
import { useGetCampaignQuery } from "@/queries/useCampaign";
import DonationDialog from "@/components/donation/donation-dialog";

// import Link from 'next/link'

export default function CampaignDetail() {
  const params = useParams();
  const dataCampaignId = Number(params.campaignId as string);

  const { data: initialData } = useGetCampaignQuery({
    id: dataCampaignId,
    enabled: Boolean(dataCampaignId),
  });

  const campaign = initialData?.payload ?? {
    id: 0,
    code: "",
    name: "",
    description: "",
    targetAmount: 0,
    currentAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    status: "",
    beneficiary: {
      id: 0,
      situationDetail: "",
      supportReceived: 0,
      verificationStatus: false,
    },
    numberOfDonations: 0,
  };

  // Tính phần trăm tiến độ chiến dịch
  const percentage = campaign.targetAmount
    ? (campaign.currentAmount / campaign.targetAmount) * 100
    : 0;

  // Tính ngày còn lại của chiến dịch
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const remainingDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Đinh dạng số tiền
  const formatTargetAmount = campaign.targetAmount.toLocaleString("de-DE");
  const formatCurrentAmount = campaign.currentAmount.toLocaleString("de-DE");

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Home className="w-4 h-4 mr-2" />
            <span>Vì Nhân Ái</span>
            <span className="mx-2">&gt;</span>
            <span>Tài Trợ MoMo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left content */}
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-2xl font-bold">{campaign.name}</h1>
              <div className="flex items-center space-x-2 text-pink-600">
                <Heart className="w-5 h-5 fill-current" />
                <span className="text-sm">
                  Trồng khoảng khổ để ấm Trăng mới cuộc đời, sáng đến cùng em
                  đến trường để cùng các những gói hỗ trợ giúp học và hoàn cảnh
                  của từng trẻ em khó khăn, đặc biệt đảm bảo các em có thể duy
                  trì được việc học tập.
                </span>
              </div>
              <Image
                src="/static/images/campaign.jpg"
                alt="Children smiling"
                width={600}
                height={400}
                className="w-full rounded-lg"
              />
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Câu chuyện</h2>
                <p className="text-gray-600 mb-4">
                  Gia Bảo, Gia Hân, Trường Vy và Gia Huy - bốn anh chị em nhỏ
                  với những nụ cười rạng rỡ và áo đồng phục trắng tinh là hình
                  ảnh đẹp mà chúng tôi đã gặp. Ấy vậy mà đằng sau những nụ cười
                  ấy là một hoàn cảnh gia đình vô cùng khó khăn khiến các em có
                  nguy cơ không được đến trường.
                </p>
                <Image
                  src="/static/images/campaign.jpg"
                  alt="Children smiling"
                  width={600}
                  height={400}
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-gray-600 text-sm italic">
                  Sau những nụ cười hạnh phúc là hoàn cảnh gia đình khó khăn
                  khiến các em có nguy cơ không được đến trường
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Về {campaign.beneficiary.situationDetail}:
                </h2>
                <p className="text-gray-600 mb-4">
                  {campaign.beneficiary.situationDetail} là tổ chức phi lợi
                  nhuận Việt Nam và là thành viên của United Way Worldwide -
                  mạng lưới phi lợi nhuận toàn cầu hoạt động hơn 135 năm tại hơn
                  40 quốc gia và vùng lãnh thổ. MSD United Way Việt Nam hoạt
                  động với mục tiêu nâng cao chất lượng giáo dục, cải thiện thu
                  nhập và đảm bảo cuộc sống khỏe mạnh cho những người yếu thế
                  trong xã hội như trẻ em, thanh niên, phụ nữ, người dân tộc
                  thiểu số, người khuyết tật... bằng cách huy động sự quan tâm
                  và giải quyết các vấn đề xã hội một cách có hệ thống.
                </p>
              </div>
              {/* Nhà hảo tâm hàng đầu */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Nhà hảo tâm hàng đầu
                </h2>
                <ul className="space-y-2">
                  {[
                    {
                      name: "Tạ Quý Đạt",
                      amount: "1.000.000đ",
                    },
                    {
                      name: "Nhà hảo tâm",
                      amount: "220.000đ",
                    },
                    {
                      name: "Đoàn Thị Thu Huyền",
                      amount: "120.000đ",
                    },
                    {
                      name: "Trương Quang Vũ",
                      amount: "100.000đ",
                    },
                    {
                      name: "Nguyễn Văn Trường",
                      amount: "100.000đ",
                    },
                    {
                      name: "Phạm Vũ Thảo Ly",
                      amount: "100.000đ",
                    },
                    {
                      name: "Nguyễn Trương Ngọc Thy",
                      amount: "100.000đ",
                    },
                    {
                      name: "Nguyễn Khôi",
                      amount: "100.000đ",
                    },
                    {
                      name: "Võ Văn Trà Win",
                      amount: "100.000đ",
                    },
                    {
                      name: "Đào Đức Vinh",
                      amount: "100.000đ",
                    },
                  ].map((donor, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{donor.name}</span>
                      <span className="font-semibold">{donor.amount}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Xem tất cả
                </Button>
              </div>
              {/* Nhà hảo tâm mới nhất */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Nhà hảo tâm mới nhất
                </h2>
                <ul className="space-y-2">
                  {[
                    {
                      initials: "NL",
                      name: "Trần Thị Ngọc Lan",
                      amount: "1.311đ",
                    },
                    {
                      initials: "VD",
                      name: "Trần Việt Dũng",
                      amount: "1.000đ",
                    },
                    {
                      initials: "VK",
                      name: "Bùi Văn Kiên",
                      amount: "1.000đ",
                    },
                    {
                      initials: "TV",
                      name: "Trần Lê Trường Vĩ",
                      amount: "2.000đ",
                    },
                    {
                      initials: "NN",
                      name: "Nguyễn Hữu Nghĩa",
                      amount: "1.000đ",
                    },
                    {
                      initials: "NT",
                      name: "Nhà hảo tâm",
                      amount: "10.000đ",
                    },
                    {
                      initials: "LN",
                      name: "Lê Ái Nhân",
                      amount: "10.000đ",
                    },
                    {
                      initials: "NL",
                      name: "Nguyễn Thị Thu Lê",
                      amount: "1.000đ",
                    },
                    {
                      initials: "QV",
                      name: "Liên Quang Vinh",
                      amount: "1.000đ",
                    },
                    {
                      initials: "DP",
                      name: "Thái Duy Phong",
                      amount: "1.000đ",
                    },
                  ].map((donor, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarFallback>{donor.initials}</AvatarFallback>
                        </Avatar>
                        <span>{donor.name}</span>
                      </div>
                      <span className="font-semibold">{donor.amount}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Xem tất cả
                </Button>
              </div>
            </div>
            {/* Right content */}
            <div className="space-y-6 rounded-lg  ">
              {/* Thông tin quyên góp */}
              <div className="w-full border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-xl sticky top-20">
                <div className="text-pink-500 font-semibold px-4 pt-4">
                  THÔNG TIN QUYÊN GÓP
                </div>
                <div className="space-y-4 px-4 pb-3 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Đồng hành cùng dự án</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Siêu ứng dụng số 1 Việt Nam
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Đối tác đồng hành</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {campaign.beneficiary.situationDetail}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">
                        {formatCurrentAmount}đ
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / {formatTargetAmount}đ
                        </span>
                      </span>
                    </div>
                    <div className=" my-1 flex h-1.5 w-full overflow-hidden rounded-lg bg-gray-200">
                      <div
                        className="h-1.5 rounded-lg bg-pink-darker"
                        style={{
                          width: `${percentage}`,
                        }}
                      ></div>
                    </div>
                    <div className=" mt-3 flex flex-nowrap items-center  justify-between space-x-2 md:space-x-3 ">
                      <div className="grow ">
                        <div className=" text-sm text-gray-500">
                          Lượt quyên góp
                        </div>
                        <div className=" text-sm font-bold text-gray-600">
                          {`${campaign.numberOfDonations}`}
                        </div>
                      </div>
                      <div className="grow">
                        <div className=" text-sm text-gray-500">Đạt được</div>
                        <div className=" text-sm font-bold text-gray-600">
                          {percentage}%
                        </div>
                      </div>
                      <div className="grow">
                        <div className=" text-sm text-gray-500">
                          Thời hạn còn
                        </div>
                        <div className=" text-sm font-bold text-gray-600">
                          {remainingDays} Ngày
                        </div>
                      </div>
                    </div>
                  </div>
                  <DonationDialog
                    campaignId={dataCampaignId}
                    campaignName={campaign.name}
                  ></DonationDialog>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="py-8 md:py-10 lg:py-14  border border-gray-200 bg-white rounded-xl">
        <div className="container">
          <div className="mb-5 text-center md:mb-8" id="section-article">
            <h2 className="text-2xl font-bold lg:text-3xl text-pink-darker">
              Các hoàn cảnh quyên góp khác
            </h2>
            <h3 className="mx-auto mt-2 max-w-3xl text-md text-gray-500 lg:text-lg">
              Chung tay quyên góp giúp đỡ các hoàn cảnh khó khăn trên khắp cả
              nước.
            </h3>
          </div>
          <CampaignList />
        </div>
      </div>
    </div>
  );
}
