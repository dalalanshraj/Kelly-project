import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import api from "../api/axios";
import SeychellesImg from "../assets/Seychelles-img/img1.jpg"
import LaketownImg from "../assets/Laketown-Img/img2.jpg"
import ShoresImg  from "../assets/Shores-img/img1.jpg"
export default function FeatureSection() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const res = await api.get(
        "/listings/communities/all"
      );

      setCommunities(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const communityImages = {
  "Seychelles Properties": SeychellesImg,

    "Laketown Wharf Properties":LaketownImg,

    "Shores Of Panama Properties":ShoresImg,
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">

        {communities.map(
          (community) => (
            <FeatureCard
              key={community}
              title={community}
              subtitle="RENTALS"
              imageSrc={
                communityImages[
                  community
                ]
              }
              link={`/community/${encodeURIComponent(
                community
              )}`}
            />
          )
        )}

      </div>
    </section>
  );
}