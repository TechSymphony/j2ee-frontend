"use client";
import Image from "next/image";
import { Heart, Home } from "lucide-react";
import CampaignList from "@/components/campaign/campaign-list";
import { useParams } from "next/navigation";
import { useGetCampaignClientQuery } from "@/queries/useCampaign";
import DonationDialog from "@/components/donation/donation-dialog";
import {
  useGetTopListDonationQuery,
  useGetNewListDonationQuery,
} from "@/queries/useDonation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImage } from "@/utils/image";

export default function CampaignDetail() {
  const params = useParams();

  const dataCampaignId = Number(params.campaignId as string);

  const { data: initialData } = useGetCampaignClientQuery({
    id: dataCampaignId,
    enabled: Boolean(dataCampaignId),
  });

  const { data: topDonation } = useGetTopListDonationQuery({
    id: dataCampaignId,
    enabled: Boolean(dataCampaignId),
  });

  const { data: newDonation } = useGetNewListDonationQuery({
    id: dataCampaignId,
    enabled: Boolean(dataCampaignId),
  });

  const donations = topDonation?.payload ?? [];
  const newDonations = newDonation?.payload ?? [];

  const aggregatedDonations = donations?.reduce((acc, donation) => {
    const donorName = donation?.donor?.fullName || "";
    if (!acc[donorName]) {
      acc[donorName] = { ...donation };
    } else {
      acc[donorName].amountTotal += donation.amountTotal;
    }
    return acc;
  }, {});

  const aggregatedDonationsArray = Object.values(aggregatedDonations);
  // Sort the array by amountTotal in descending order
  const sortedAggregatedDonationsArray = aggregatedDonationsArray.sort((a, b) => b.amountTotal - a.amountTotal);

  // Take the top 10 elements
  const top10Donations = sortedAggregatedDonationsArray.slice(0, 10)

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
      user: {},
      situationDetail: "",
    },
    category: {
      name: "",
    },
    numberOfDonations: 0,
    disabledAt: false,
    shortDescription: "",
    image: "",
  };

  // Tính phần trăm tiến độ chiến dịch
  const percentage = campaign.targetAmount
    ? Math.round((campaign.currentAmount / campaign.targetAmount) * 100 * 100) / 100
    : 0;

  let imageUrl = getImage(campaign.image);
  if (!campaign.image) {
    imageUrl = '/static/images/campaign.jpg';
  };

  // Tính ngày còn lại của chiến dịch
  const endDate = new Date(campaign.endDate);
  const currentDate = new Date();
  let remainingDays = Math.ceil(
    (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (remainingDays < 0) {
    remainingDays = 0;
  }

  // Đinh dạng số tiền
  const formatTargetAmount = campaign.targetAmount.toLocaleString("de-DE");
  const formatCurrentAmount = campaign.currentAmount.toLocaleString("de-DE");

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Home className="w-4 h-4 mr-2" />
            <span>{campaign.category.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left content */}
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-2xl font-bold">{campaign.name}</h1>
              <div className="flex items-center space-x-2 text-pink-600">
                <Heart className="w-5 h-5 fill-current" />
                <span className="text-sm">
                  {campaign.shortDescription || "Chưa có mô tả"}
                </span>
              </div>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={imageUrl}
                  alt="Image"
                  fill
                  className="rounded-md object-cover"
                  unoptimized
                />
              </AspectRatio>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Mô tả chiến dịch</h2>
                <div dangerouslySetInnerHTML={{ __html: campaign.description }} className="text-gray-600 mb-4" />
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={imageUrl}
                    alt="Image"
                    fill
                    className="rounded-md object-cover"
                    unoptimized
                  />
                </AspectRatio>
              </div>
              {(campaign.beneficiary !== null) ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">
                    Một chút mô tả về nguyện vọng
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: campaign.beneficiary.situationDetail }} className="text-gray-600 mb-4" />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">
                    Một chút mô tả về nguyện vọng của chiến dịch phi thụ hưởng
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Nguyện vọng của chiến dịch phi thụ hưởng do phòng Công tác Sinh viên tổ chức
                    là tạo nên một cầu nối yêu thương, lan tỏa tinh thần tương thân tương ái và mang
                    lại sự hỗ trợ thiết thực cho những hoàn cảnh khó khăn. Chiến dịch hướng đến mục
                    tiêu khơi dậy lòng nhân ái trong cộng đồng sinh viên, đồng thời kêu gọi
                    sự đóng góp từ mọi nguồn lực để xây dựng một môi trường sống tốt đẹp hơn.
                    Phòng Công tác Sinh viên mong muốn không chỉ quyên góp được số tiền cần thiết mà còn
                    truyền cảm hứng về ý nghĩa của sự sẻ chia và trách nhiệm xã hội, để mỗi người
                    tham gia đều trở thành một phần của sự thay đổi tích cực. Thông qua chiến dịch,
                    họ hy vọng có thể mang lại cơ hội và hy vọng mới cho những người kém may mắn,
                    đồng thời xây dựng một cộng đồng đoàn kết, nhân văn và bền vững.
                  </p>
                </div>
              )}
              {/* Nhà hảo tâm hàng đầu */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Top 10 Nhà hảo tâm hàng đầu
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(top10Donations) &&
                    top10Donations.map((donation, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span>{donation.donor.fullName}</span>
                        </div>
                        <span className="font-semibold">
                          {donation.amountTotal.toLocaleString("de-DE")}đ
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              {/* Nhà hảo tâm mới nhất */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Nhà hảo tâm mới nhất
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(newDonations) &&
                    newDonations.map((donation, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span>{donation.donor.fullName}</span>
                        </div>
                        <span className="font-semibold">
                          {donation.amountTotal.toLocaleString("de-DE")}đ
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {/* Right content */}
            <div className="space-y-6 rounded-lg  ">
              {/* Thông tin quyên góp */}
              <div className="w-full border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-xl sticky top-20">
                <div className="text-pink-500 text-lg font-bold px-4 pt-4">
                  THÔNG TIN QUYÊN GÓP
                </div>
                <div className="space-y-4 px-4 pb-3 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-semibold">Đồng hành cùng dự án</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Siêu ứng dụng số 1 Việt Nam
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-semibold">Người thụ hưởng</span>
                    </div>
                    {campaign.beneficiary !== null ? (
                      <p className="text-sm text-muted-foreground">
                        {campaign.beneficiary.user?.fullName ?? "N/A"}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Phòng công tác sinh viên
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">
                        {formatCurrentAmount} VNĐ
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / {formatTargetAmount} VNĐ
                        </span>
                      </span>
                    </div>
                    <div className=" my-1 flex h-1.5 w-full overflow-hidden rounded-lg bg-gray-200">
                      <div
                        className={`h-1.5 rounded-lg ${percentage === 100 ? 'bg-green-500' : 'bg-pink-darker'}`}
                        style={{ width: `${percentage}%` }}
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
                  {campaign.currentAmount >= campaign.targetAmount ? (
                    <div className="text-green-500 font-semibold">
                      Chiến dịch đã đạt target
                    </div>
                  ) : remainingDays === 0 ? (
                    <div className="text-red-500 text-base font-semibold">
                      Chiến dịch đã kết thúc
                    </div>
                  ) : campaign.disabledAt ? (
                    <div className="text-yellow-600 font-semibold">
                      Hiện chiến dịch đã tạm dừng hoạt động
                    </div>
                  ) : (
                    <DonationDialog
                      campaignId={dataCampaignId}
                      campaignName={campaign.name}
                    ></DonationDialog>
                  )}
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
