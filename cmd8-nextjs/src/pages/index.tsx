import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import Main from "./Main";
import { IAiTool } from "@/interfaces/main";
import { getAllAITools, useAllAItools } from "../lib/api/core";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ aiTools }: { aiTools: IAiTool[] }) {
  return (
    <Layout home>
      <Main aiTools={aiTools} />
      <div>s</div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const aiTools = await getAllAITools();

  return {
    props: {
      aiTools,
    },
    revalidate: 60, // 60초마다 정적 페이지를 재생성 (콘텐츠 업데이트 주기 설정)
  };
};
