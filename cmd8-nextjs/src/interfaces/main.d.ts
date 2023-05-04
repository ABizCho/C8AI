export interface IAiTool {
  [x: string]: any;
  id: string;
  imgUrl: string;
  // 클라이언트를 재설계하자.
  ko: {
    name: string[];
    category: string[];
  };
  en: {
    name: string[];
    category: string[];
  };
  summary: string;
  redirectUrl: string;
  derived: {
    score: {
      avg: number;
      cnt: number;
    };
    favoriteCnt: number;
  };
}

export interface IAiCardParams {
  id: string | undefined;
  imgUrl: IAiTool.imgUrl;
  nameKo: string[];
  categoryKey: string;
  summary: IAiTool.summary;
  redirectUrl: IAiTool.redirectUrl;
  derived: IAiTool.derived;
}

export interface IGridAiToolParams {
  arrAi: IAiTool[];
  searchWord: string;
}
