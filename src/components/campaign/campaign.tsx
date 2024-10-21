import Image from "next/image";
import Link from "next/link";

interface CampaignProps {
  data: {
    [key: string]: any;
  };
}

export default function Campaign({ data }: CampaignProps) {

  // Kiểm tra chiến dịch đã được duyệt chưa
  if (data.isApproved !== "APPROVED") {
    return null;
  }

  // Tính phần trăm tiến độ chiến dịch
  const percentage = data.targetAmount ? (data.currentAmount / data.targetAmount) * 100 : 0;

  // Tính ngày còn lại của chiến dịch
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const remainingDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Đinh dạng số tiền
  const formattedTargetAmount = data.targetAmount.toLocaleString('de-DE');
  const formattedCurrentAmount = data.currentAmount.toLocaleString('de-DE');

  // Hiển thị chiến dịch
  return (
    <div
      className="cursor-pointer group relative flex flex-col flex-nowrap overflow-hidden rounded-xl 
        border border-gray-200 bg-white text-gray-700 transition md:hover:text-momo
        shadow-sm hover:shadow-xl "
    >
      <div className="relative w-full pt-[50%]">
        <Image
          src="/static/images/campaign.jpg"
          alt="campaign"
          width={200}
          height={200}
          quality={100}
          className="absolute left-0 top-0 h-full w-full bg-white object-cover"
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
          <div className="shrink-0">
            <div className="overflow-hidden rounded-full border border-gray-200 p-1">
              <div className="relative h-11 w-11 md:h-7 md:w-7">
                <Image
                  src="/static/images/sponsor.png"
                  alt="campaign"
                  width={200}
                  height={200}
                  quality={100}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-xs leading-4 text-gray-600 md:text-sm">
            {data.beneficiary.situationDetail}
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
              {formattedCurrentAmount}đ
              <svg
                className="icon relative  top-px ml-1 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="20"
                viewBox="0 0 17 20"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#D28C12"
                    d="M6.696 3.537S6.612 2.31 6.412 1.95c-.201-.361-.67-.977-.97-.927-.302.05-1.273.64-1.406.927-.134.288-.193 1.118-.298 1.377-.104.26.281.563.281.563s2.543.096 2.677-.353m3.168 0s.083-1.226.284-1.587c.2-.361.67-.977.97-.927.302.05 1.272.64 1.406.927.134.288.193 1.118.297 1.377.104.26-.28.563-.28.563s-2.543.096-2.677-.353"
                  ></path>
                  <path
                    fill="#FFC00F"
                    d="M15.312 6.161c-1.423-2.497-3.702-4.04-6.894-4.04-3.133 0-5.48 1.62-6.925 4.04-.585.98-1.23 1.992-1.424 3.142a4.114 4.114 0 0 0-.057.68c0 4.424 3.766 5.79 8.409 5.79h.094c4.6-.018 8.31-1.396 8.31-5.79 0-1.382-.866-2.687-1.513-3.822"
                  ></path>
                  <path
                    fill="#FED373"
                    d="M10.565 3.53c.358.098.552-.405.22-.571-.685-.343-1.477-.53-2.38-.53-.88 0-1.666.193-2.351.537-.337.17-.142.674.22.573a7.877 7.877 0 0 1 2.13-.283 8.23 8.23 0 0 1 2.16.274"
                  ></path>
                  <path
                    fill="#E5AB11"
                    d="M6.348 2.378s-1.242.31-2.067 1.442c-.395.542-.553 1.755-.77 2.186-.48.958-1.46.044-1.661-.255-.201-.3.19-2.386.91-2.686.718-.3 3.334-.898 3.588-.687"
                  ></path>
                  <path
                    fill="#C18C16"
                    d="M8.316 13.642c-1.034 0-1.896-.04-2.283-.342.186.325 1.122.782 2.292.782 1.197 0 2.264-.496 2.485-.805-.4.313-1.434.365-2.494.365"
                  ></path>
                  <path
                    fill="#D79414"
                    d="M4.783 7.14c0-.303.096-.573.236-.755a.756.756 0 0 1 .231-.205.512.512 0 0 1 .508 0c.123.067.241.19.327.358.087.167.14.375.14.602a.274.274 0 0 0 .548 0 1.79 1.79 0 0 0-.347-1.085 1.303 1.303 0 0 0-.402-.352c-.155-.086-.334-.136-.52-.136s-.364.05-.52.136c-.235.13-.42.337-.548.586-.129.248-.2.54-.2.851a.273.273 0 1 0 .547 0m5.827 0c0-.303.096-.573.236-.755a.76.76 0 0 1 .232-.205.506.506 0 0 1 .508 0c.122.067.24.19.326.358.087.167.14.375.14.602a.274.274 0 0 0 .548 0 1.79 1.79 0 0 0-.347-1.085 1.31 1.31 0 0 0-.401-.352 1.072 1.072 0 0 0-1.04 0c-.235.13-.42.337-.549.586-.128.248-.2.54-.2.851a.274.274 0 0 0 .548 0"
                  ></path>
                  <path
                    fill="#D28C12"
                    d="M12.6 12.222s-.518 2.185-4.322 2.325c-2.301.085-3.859-1.434-4.062-2.227-.203-.794 7.509-.83 8.384-.098"
                  ></path>
                  <path
                    fill="#E5AB11"
                    d="M13.004 11.255c0 1.56-2.136 2.975-4.667 2.975-2.531 0-4.498-1.415-4.498-2.975 0-.716.124-1.518.838-2.016.84-.586 2.376-.809 3.744-.809 1.178 0 2.517.154 3.328.604.933.517 1.255 1.387 1.255 2.221"
                  ></path>
                  <path
                    fill="#FED473"
                    d="M8.548 8.879c1.664 0 3.048.2 3.672.685-.3-.522-1.805-1.122-3.686-1.122-1.924 0-3.641.661-3.996 1.159.641-.503 2.306-.722 4.01-.722"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M3.839 11.254c0 1.56 1.967 2.975 4.498 2.975 1.523 0 2.904-.514 3.761-1.263a15.148 15.148 0 0 1-7.803-3.369c-.378.48-.456 1.094-.456 1.657"
                    opacity=".079"
                  ></path>
                  <path
                    fill="#D28C12"
                    d="M6.526 11.066c-.147.79-.557 1.378-.918 1.312-.36-.066-.896-.521-.75-1.311.147-.792.92-1.619 1.281-1.553.36.066.533.761.387 1.552"
                  ></path>
                  <path
                    fill="#AF6E0F"
                    d="M6.61 11.415c-.147.79-.557 1.379-.917 1.312-.36-.066-.897-.52-.75-1.312.146-.79.92-1.618 1.28-1.552.36.067.533.761.387 1.552"
                  ></path>
                  <path
                    fill="#D28C12"
                    d="M10.317 11.066c.146.79.557 1.378.917 1.312.36-.066.896-.521.75-1.311-.147-.792-.92-1.619-1.28-1.553-.36.066-.534.761-.387 1.552"
                  ></path>
                  <path
                    fill="#AF6E0F"
                    d="M10.233 11.415c.146.79.557 1.379.917 1.312.36-.066.896-.52.75-1.312-.147-.79-.92-1.618-1.28-1.552-.36.067-.534.761-.387 1.552"
                  ></path>
                  <path
                    fill="#FED373"
                    d="M4.074 9.41c-.653.69-.348 1.276-.813 1.125-.464-.15-.608-.933-.424-1.495.184-.563.71-.897 1.174-.747.464.15.474.683.063 1.117m9.301.53c.386 1.404-.45 1.981.289 2.11.739.129 1.5-.831 1.658-1.727.158-.896-.313-1.726-1.053-1.855-.74-.13-1.138.588-.894 1.472"
                  ></path>
                  <path
                    fill="#E5AB11"
                    d="M1.119 11.086C.555 10.33.537 8.453.959 7.064.365 8.139.155 8.79.069 9.304c-.037.22-.058.447-.058.679 0 4.424 3.767 5.79 8.41 5.79h.094a18.94 18.94 0 0 0 2.185-.127c-1.885-.005-3.023-.215-4.994-.765-2.122-.59-3.686-2.587-4.587-3.795"
                  ></path>
                  <path
                    fill="#E5AB11"
                    d="M.07 9.303a4.009 4.009 0 0 0-.059.68c0 4.424 3.768 5.79 8.41 5.79h.094c-3.242-.175-4.227-.741-6.376-2.406-.945-.733-1.96-2.94-2.07-4.064"
                  ></path>
                  <path
                    fill="#FFC00F"
                    d="M4.106 3.371c.308-1.127 1.003-1.944 1.29-2.026.759-.111.952 1.033.952 1.033.175-.045.353-.084.534-.118C5.744-.228 4.148.48 3.757.745c-.323.31-1.818.266-2.175.3-1.026.232-1.093.81-1.026 1.92C.72 4.262 1.31 5.107 1.855 5.6a8.343 8.343 0 0 1 2.25-2.23"
                  ></path>
                  <path
                    fill="#FFC00F"
                    d="M4.036 3.664c.02-.1.043-.197.07-.293a8.332 8.332 0 0 0-2.251 2.23c.418.379.808.55.954.56.658.011.77-1.043 1.227-2.497"
                  ></path>
                  <path
                    fill="#FED373"
                    d="M2.194 1.359c.311.038.875.078 1.301-.07.146-.05.286.092.231.235-.163.432-.528 1.075-.853 1.097-.304.02-.837-.354-1.044-.72a.365.365 0 0 1 .365-.542"
                  ></path>
                  <path
                    fill="#FFE2A9"
                    d="M15.324 6.15c-.747-1.31-1.73-2.356-2.955-3.055.911.743 1.679 1.68 2.304 2.776.753 1.322 1.76 2.84 1.76 4.45 0 1.181-.231 2.174-.651 3.004.671-.844 1.054-1.943 1.054-3.353 0-1.382-.865-2.687-1.512-3.822"
                  ></path>
                  <path
                    fill="#E5AB11"
                    d="M10.212 2.378s1.241.31 2.066 1.442c.396.542.554 1.755.77 2.186.48.958 1.461.044 1.662-.255.2-.3-.191-2.386-.91-2.686-.719-.3-3.335-.898-3.588-.687"
                  ></path>
                  <path
                    fill="#FFC00F"
                    d="M11.163 1.345c.266.075.878.777 1.213 1.771.986.567 1.813 1.359 2.487 2.332.496-.508.992-1.31 1.14-2.483.068-1.11 0-1.687-1.026-1.92-.357-.034-1.851.011-2.174-.3-.388-.264-1.966-.962-3.103 1.466.18.026.355.057.527.093.058-.251.295-1.053.936-.96"
                  ></path>
                  <path
                    fill="#FFC00F"
                    d="M12.376 3.116c.059.175.11.358.148.548.457 1.454.569 2.509 1.227 2.497.164-.01.637-.227 1.112-.713-.673-.973-1.5-1.765-2.487-2.332"
                  ></path>
                  <path
                    fill="#FED373"
                    d="M14.366 1.359c-.312.038-.875.078-1.302-.07-.145-.05-.286.092-.23.235.163.432.528 1.075.852 1.097.304.02.838-.354 1.045-.72a.365.365 0 0 0-.365-.542"
                  ></path>
                  <path
                    fill="#FFE4AE"
                    d="M14.519 9.562c.042.308.098.866.025 1.296-.025.146.075.28.165.22.272-.176.475-.57.472-.894-.003-.302-.08-.81-.33-1.004-.178-.138-.373.085-.332.382"
                  ></path>
                </g>
              </svg>
            </strong>
            <span className="pl-2 text-xs text-gray-500 md:text-sm">
              / {formattedTargetAmount}đ<span className="font-bold"> Heo vàng</span>
            </span>
          </div>
          {/* progress  */}
          <div className=" my-1 flex h-1.5 w-full overflow-hidden rounded-lg bg-gray-200">
            <div
              className="h-1.5 rounded-lg bg-pink-darker"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          {/* Remain  */}
          <div className=" mt-3 flex flex-nowrap items-center  justify-between space-x-2 md:space-x-3 ">
            <div className="grow ">
              <div className=" text-xs text-gray-500">Lượt quyên góp</div>
              <div className=" text-sm font-bold text-gray-600">7.297</div>
            </div>
            <div className="grow">
              <div className=" text-xs text-gray-500">Đạt được</div>
              <div className=" text-sm font-bold text-gray-600">{percentage}%</div>
            </div>
            <div className="flex grow items-center justify-end">
              <Link href={"/"} className="overflow-hidden">
                <span className="inline-block py-2 px-4 text-pink-darker font-bold bg-white hover:bg-slate-100 outline-none border border-pink-darker rounded-md text-center ">
                  Quyên góp
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
