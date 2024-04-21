"use client";

// import AuctionBox from "../../_component/Auction/AuctionBox";
import { useEffect, useState } from "react";
import ReviewBox from "../../../_component/ReviewBox";
import Vip_Introduce from "../_component/Vip_Introduce";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useVip } from "@/app/utils/VipProvider";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";

const Page = () => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const [VipInfo, setVipInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [auctions, setAuctions] = useState(null);
  const { vipIntro } = useVip();

  let vipUUID = currPath;
  if (typeof vipUUID === "string") {
    vipUUID = vipUUID.replace("/vipinfo/", "");
  }
  console.log(vipUUID);

  useEffect(() => {
    setCurrPath(pathname);
  }, []);

  useEffect(() => {
    if (!vipUUID) return;
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // 리뷰 데이터를 가져옵니다.
        const token = localStorage.getItem("Authorization");

        const Allresponse = await HttpAuthInstance.get(
          `/api/all/vipDetail/${vipUUID}`
        );
        if (Allresponse.status === 200) {
          setVipInfo(Allresponse.data);
          console.log(Allresponse);
        }

        const reviewsResponse = await HttpAuthInstance.get(
          `/api/all/review/${vipUUID}?page=1&size=10`
        );
        if (reviewsResponse.status === 200) {
          setReviews(reviewsResponse.data);
          console.log(reviewsResponse);
        }

        // 경매 데이터를 가져옵니다.
        const auctionsResponse = await HttpAuthInstance.get(
          `/api/all/auction/${vipUUID}/progressList?page=1&size=10`
        );
        if (auctionsResponse.status === 200) {
          setAuctions(auctionsResponse.data);
          console.log(auctionsResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vipUUID]);

  return (
    <div>
      <div>
        <div></div>
      </div>
      <Vip_Introduce />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ alignSelf: "flex-start" }}>경매</h1>
        {/* <AuctionBox /> */}
      </div>
      <h1>리뷰</h1>
      {/* <ReviewBox />
      <ReviewBox />
      <ReviewBox />
      <ReviewBox />
      <ReviewBox />
      <ReviewBox /> */}
    </div>
  );
};

export default Page;
