/*
입스크립트 선언 파일 d.ts는 타입스크립트 코드의 타입 추론을 돕는 파일입니다. 
예를 들어, 전역 변수로 선언한 변수를 특정 파일에서 import 구문 없이 사용하는 경우 해당 변수를 인식하지 못합니다.
 그럴 때 아래와 같이 해당 변수를 선언해서 에러가 나지 않게 할 수 있습니다
*/

export interface IAiTool {
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

export interface IAiCardParams {
  id: string | undefined;
  imgUrl: string;
  nameKo: string[] | string | undefined;
  categoryKo: string[] | string | undefined;
}

export interface IGridAiToolParams {
  arrAi: IAiTool[];
  searchWord: string;
  isFetched: boolean;
}
