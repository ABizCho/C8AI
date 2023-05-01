export interface IAiTool {
  [x: string]: any;
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
  summary: string;

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
  derived: IAiTool.derived;
}

export interface IGridAiToolParams {
  arrAi: IAiTool[];
  searchWord: string;
}
