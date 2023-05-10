import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import Main from "./Main";
import { IAiTool } from "@/interfaces/main";
import { getAllAITools, useAllAItools } from "./api/core";
import { GetStaticProps } from "next";

import AIINFO from "../../public/data/aiInfo.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ aiTools }: { aiTools: IAiTool[] }) {
  console.log("@@@@@@@@@@@@@@@@ aiTools: ", aiTools);
  return (
    <Layout home>
      <Main aiTools={aiTools} />
      <div>s</div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let aiTools: any;

  try {
    // 서버에서 데이터 가져오기
    aiTools = await getAllAITools();
    console.log(aiTools);
    aiTools = aiTools.aiTools;
  } catch (error: any) {
    // 서버 실패 시, Public data 참조
    console.log("server req failed,", error.message);
    aiTools = AIINFO;
  }
  return {
    props: {
      aiTools,
    },
    revalidate: 60, // 60초마다 정적 페이지를 재생성 (콘텐츠 업데이트 주기 설정)
  };
};
