import { useEffect, useState } from "react";

import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { GridItemWrap, GridBox } from "../../../../components/Grid";
import AIINFO from "../../../../assets/data/aiInfo.json";
import {
  IAiTool,
  IAiCardParams,
  IGridAiToolParams,
} from "../../../../interface/main";
import { useAllAItools } from "../../../../api";

export default function CoreSec() {
  const [arrAi, setArrAi] = useState<IAiTool[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const { data, isLoading, error, refetch } = useAllAItools();

  // // local dev 빌드용
  // useEffect(() => {
  //   setArrAi(AIINFO as IAiTool[]);
  //   console.log(arrAi);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await refetch(); // refetch 함수를 사용하여 데이터를 가져옵니다.
      if (!error && !isLoading && result.data) {
        let arr: any = Object.values(result.data)[0];
        console.log("useEffect-fetch", arr);

        setArrAi(arr as IAiTool[]); // 가져온 데이터를
      }
    }
    fetchData();
  }, [refetch, error, isLoading, setArrAi]);

  return (
    <section className=" content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <div className="coreSec-itemBox">
        <CategorySelectBar />
        <GridAiTools
          arrAi={arrAi}
          searchWord={searchWord}
          isFetched={isFetched}
        />
      </div>
    </section>
  );
}

const GridAiTools = ({ arrAi, searchWord, isFetched }: IGridAiToolParams) => {
  const enPattern = /[a-zA-Z]/;
  const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let filteredData: IAiTool[];

  function KoAutoComplete(searchWord: any, data: any): IAiTool[] {
    // console.log("ko-filter");
    return data.filter((item: any) => {
      return (
        item.ko.name.some((name: any) => name.includes(searchWord)) ||
        item.ko.category.some((category: any) => category.includes(searchWord))
      );
    });
  }

  function EnAutoComplete(searchWord: any, data: any): IAiTool[] {
    // console.log("en-filter");
    return data.filter((item: any) => {
      return (
        item.en.name.some((name: any) => name.includes(searchWord)) ||
        item.en.category.some((category: any) => category.includes(searchWord))
      );
    });
  }
  if (enPattern.test(searchWord)) {
    filteredData = EnAutoComplete(searchWord, arrAi);
  } else if (koPattern.test(searchWord)) {
    filteredData = KoAutoComplete(searchWord, arrAi);
  }
  // else filteredData = isFetched === true ? [] : arrAi;
  else filteredData = arrAi;

  console.log("GridAiTools: ", filteredData);

  return (
    <div className="container">
      <GridBox>
        {filteredData.map((v, idx) => (
          <GridItemWrap key={idx} style={{ width: "270px" }}>
            <AiGridItemInner
              key={v.id}
              imgUrl={v.imgUrl}
              id={v.id}
              nameKo={v.ko?.name}
              categoryKo={v.ko?.category}
            />
          </GridItemWrap>
        ))}
      </GridBox>
    </div>
  );
};
const AiGridItemInner = ({ id, imgUrl, nameKo, categoryKo }: IAiCardParams) => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <img src={imgUrl} /> */}
      <div>{id}</div>
      <div>{nameKo}</div>
      <div>{categoryKo}</div>
    </div>
  );
};

const SearchBar = ({ searchWord, setSearchWord }: any): JSX.Element => {
  const onChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <input
      id="searchWord"
      name="searchWord"
      type="text"
      className="coreSec-search"
      placeholder="이름, 용도, or 분야를 입력해주세요"
      value={searchWord}
      onChange={onChangeSearchWord}
    />
  );
};

const CategorySelectBar = (): JSX.Element => {
  return (
    <div className="coreSec-categoryBox">
      <div>All</div>
      <div>그림</div>
      <div>영상</div>
      <div>3D렌더링</div>
      <div>글쓰기</div>
      <div></div>
    </div>
  );
};
