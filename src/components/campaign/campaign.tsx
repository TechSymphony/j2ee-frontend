import Image from "next/image";
import { CampaignType } from "@/schemas/campaign.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImage } from "@/utils/image";

interface CampaignProps {
  data: CampaignType;
  onClick: () => void;
}

export default function Campaign({ data, onClick }: CampaignProps) {

  const imageUrl = getImage(data.image);

  const router = useRouter();
  console.log(data);

  // Tính phần trăm tiến độ chiến dịch
  const percentage = data.targetAmount
    ? Math.round((data.currentAmount / data.targetAmount) * 100 * 100) / 100
    : 0;

  // Tính ngày còn lại của chiến dịch
  const endDate = new Date(data.endDate);
  const currentDate = new Date();
  let remainingDays = Math.ceil(
    (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (remainingDays < 0) {
    remainingDays = 0;
  }

  // Đinh dạng số tiền
  const formattedTargetAmount = data.targetAmount.toLocaleString("de-DE");
  const formattedCurrentAmount = data.currentAmount.toLocaleString("de-DE");

  // Hiển thị chiến dịch
  return (
    <div
      className="cursor-pointer group relative flex flex-col flex-nowrap overflow-hidden rounded-xl
        transition md:hover:text-momo
        shadow-sm hover:shadow-xl min-h-[460px]"
      onClick={onClick}
    >
      <div className="relative w-full h-5 pt-[50%]">
        <Image
          src={imageUrl}
          alt="Image"
          width={200}
          height={200}
          quality={100}
          className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          unoptimized
        />
      </div>
      <div className="min-h-1 flex-1 px-4 pb-3 pt-4">
        <div className="line-clamp-3 text-lg font-bold leading-snug transition ">
          {data.name}
        </div>

      </div>
      <div className="mb-4 px-4 pt-0">
        {/* sponsor  */}
        <div className="mb-3 flex flex-nowrap items-center space-x-2">
          <div className="flex-1 font-semibold leading-4 text-pink-600 md:text-sm">
            {data.shortDescription}
          </div>
          <div className="shrink-0">
            <span className="rounded-3xl px-2 py-1 text-xs text-orange-400 bg-[rgba(252,100,45,.15)]">
              Còn {remainingDays} ngày
            </span>
          </div>
        </div>
        {/* detail  */}
        <div>
          <div className="dn-money mb-2 flex items-end">
            <strong className="item-end flex leading-5 text-gray-700">
              {formattedCurrentAmount} VNĐ
            </strong>
            <span className="pl-2 text-xs text-gray-500 md:text-sm">
              / {formattedTargetAmount} VNĐ
            </span>
          </div>
          {/* progress  */}
          <div className=" my-1 flex h-1.5 w-full overflow-hidden rounded-lg bg-gray-200">
            <div
              className={`h-1.5 rounded-lg ${percentage === 100 ? 'bg-green-500' : 'bg-pink-darker'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          {/* Remain  */}
          <div className=" mt-3 flex flex-nowrap items-center  justify-between space-x-2 md:space-x-3 ">
            <div className="grow ">
              <div className=" text-xs text-gray-500">Lượt quyên góp</div>
              <div className=" text-sm font-bold text-gray-600">
                {data?.numberOfDonations}
              </div>
            </div>
            <div className="grow">
              <div className=" text-xs text-gray-500">Đạt được</div>
              <div className=" text-sm font-bold text-gray-600">
                {percentage}%
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 h-8 w-full">
          {data.currentAmount === data.targetAmount ? (
            <div className="text-green-500 font-semibold">
              Chiến dịch đã đạt target
            </div>
          ) : remainingDays === 0 ? (
            <div className="text-red-500 text-base font-semibold">
              Chiến dịch đã kết thúc
            </div>
          ) : !data.disabledAt ? (
            <Button
              className="w-full bg-pink-500 text-gray-100 text-base hover:bg-pink-600"
              onClick={() => router.push(`/campaign/${data.id}`)}
            >
              Quyên góp
            </Button>
          ) : (
            <div className="text-yellow-600 font-semibold">
              Hiện chiến dịch đã tạm dừng hoạt động
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}
