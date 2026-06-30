import React from "react";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import HeroBlock from "@labs/ui/components/hero-block";
import BentoBlock from "@labs/ui/components/bento-block";
import Loader from "@/components/loader";

const HomePage = () => {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  return (
    <div>
      <HeroBlock />
      {/* <Loader /> */}
      <BentoBlock />
    </div>
  );
};

export default HomePage;
