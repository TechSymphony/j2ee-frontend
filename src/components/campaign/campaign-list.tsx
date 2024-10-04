import Campaign from "@/components/campaign/campaign";
import React from "react";

export default function CampaignList() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <Campaign key={index} />
        ))}
    </div>
  );
}
