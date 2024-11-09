"use client";
import CampaignList from "@/components/campaign/campaign-list";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8 md:py-10 lg:py-14  bg-pink-50 min-h-screen">
      <div className="container">
        <div className="mb-5 text-center md:mb-8" id="section-article">
          <h2 className="text-2xl font-bold lg:text-3xl text-pink-darker">
            Các hoàn cảnh quyên góp
          </h2>
          <h3 className="mx-auto mt-2 max-w-3xl text-md text-gray-500 lg:text-lg">
            Chung tay quyên góp giúp đỡ các hoàn cảnh khó khăn trên khắp cả
            nước.
          </h3>
        </div>

        <CampaignList />
      </div>
    </div>
  );
}

function OldHome() {
  return (
    <div>
      <div className="py-8 md:py-10 lg:py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {/* left content  */}
            <div className="order-2 sm:order-1 sm:col-start-1">
              {/* heading vs description  */}
              <div className="text-left">
                <h1 className=" mb-2 text-2xl font-bold text-pink-600 md:mb-6 md:text-3xl lg:text-4xl">
                  Tấm Lòng Nhân Ái - Thiện nguyện mỗi ngày
                </h1>
                <p className="text-lg font-light text-gray-600">
                  Tấm Lòng Nhân Ái là tính năng tập hợp tất cả các dự án, tổ
                  chức đang gây quỹ từ thiện trên MoMo. Nơi bạn có thể thực hiện
                  “sống tốt” bằng cách quyên góp Heo Vàng hoặc tiền mặt.
                  <br />
                  <span className="block text-md pt-4">
                    Nhìn lại chặng đường Tấm Lòng Nhân Ái đã đi qua
                  </span>
                </p>
              </div>
              {/* data  */}
              <div className="mt-3 grid gap-2 lg:grid-cols-4 grid-cols-2 gap-y-3">
                <div className=" sl-item  pl-3">
                  <h4 className=" pb-1 pl-0 text-lg font-bold text-gray-700 ">
                    <span>1</span>
                    <span className="">+ ngàn</span>
                  </h4>
                  <p className="  text-sm  leading-4  text-gray-500">
                    dự án đã được gây quỹ thành công
                  </p>
                </div>
                <div className=" sl-item  pl-3">
                  <h4 className=" pb-1 pl-0 text-lg font-bold text-gray-700 ">
                    <span>86</span>
                    <span className="">+ tỷ</span>
                  </h4>
                  <p className="  text-sm  leading-4  text-gray-500">
                    đồng được quyên góp
                  </p>
                </div>
                <div className=" sl-item  pl-3">
                  <h4 className=" pb-1 pl-0 text-lg font-bold text-gray-700 ">
                    <span>1</span>
                    <span className="">+ tỷ</span>
                  </h4>
                  <p className="  text-sm  leading-4  text-gray-500">
                    heo vàng được quyên góp
                  </p>
                </div>
                <div className=" sl-item  pl-3">
                  <h4 className=" pb-1 pl-0 text-lg font-bold text-gray-700 ">
                    <span>186</span>
                    <span className="">+ triệu</span>
                  </h4>
                  <p className="  text-sm  leading-4  text-gray-500">
                    lượt quyên góp
                  </p>
                </div>
              </div>
              {/* button  */}
              <div className="mt-7">
                <div className="space-x-3 text-center md:text-left">
                  <Link href={"/"} className="overflow-hidden">
                    <span className="inline-block py-2 px-4 text-white font-bold bg-pink-darker hover:bg-pink-darker/80 outline-none rounded-sm text-center ">
                      Quyên góp
                    </span>
                  </Link>
                  <Link href={"/"} className="overflow-hidden">
                    <span className="inline-block py-2 px-4 text-pink-darker font-bold bg-white hover:bg-slate-100 outline-none border border-pink-darker rounded-sm text-center ">
                      Giới thiệu
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* right content  */}
            <div className="order-1 sm:order-2 sm:col-start-2">
              <div className="w-full h-full  relative">
                <Image
                  src="/static/images/gold-pig.png"
                  alt="Logo"
                  width={400}
                  height={400}
                  quality={100}
                  className="absolute top-0 left-0 h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 md:py-10 lg:py-14  bg-pink-50">
        <div className="container">
          <div className="mb-5 text-center md:mb-8" id="section-article">
            <h2 className="text-2xl font-bold lg:text-3xl text-pink-darker">
              Các hoàn cảnh quyên góp
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
