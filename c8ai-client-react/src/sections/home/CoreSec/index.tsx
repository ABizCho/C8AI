import { GridItemWrap, GridBox } from "../../../components/Grid";
import AIINFO from "../../../assets/data/aiInfo.json";

import { useEffect, useState } from "react";

interface AiDataType {
  id: string;
  imgUrl: string;
  ko: {
    name: string[];
    category: string[];
  };
  en: {
    name: string[];
    category: string[];
  };
}

interface AiCardProps {
  id: string | undefined;
  imgUrl: string;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

interface GridContainerProps {
  arrAi: AiDataType[];
  searchWord: string;
}

const CoreSec = () => {
  const [arrAi, setArrAi] = useState<AiDataType[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    setArrAi(AIINFO as AiDataType[]);
    console.log(arrAi);
  }, []);

  return (
    <section className=" content-section">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <div className="coreSec-itemBox">
        <CategorySelectBar />
        <GridContainer arrAi={arrAi} searchWord={searchWord} />
      </div>
    </section>
  );
};

const GridContainer = ({ arrAi, searchWord }: GridContainerProps) => {
  const enPattern = /[a-zA-Z]/;
  const koPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  let filteredData: AiDataType[];

  function KoAutoComplete(searchWord: any, data: any): AiDataType[] {
    // console.log("ko-filter");
    return data.filter((item: any) => {
      return (
        item.ko.name.some((name: any) => name.includes(searchWord)) ||
        item.ko.category.some((category: any) => category.includes(searchWord))
      );
    });
  }

  function EnAutoComplete(searchWord: any, data: any): AiDataType[] {
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
  } else filteredData = [];

  console.log(filteredData);

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
const AiGridItemInner = ({ id, imgUrl, nameKo, categoryKo }: AiCardProps) => {
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

export default CoreSec;
