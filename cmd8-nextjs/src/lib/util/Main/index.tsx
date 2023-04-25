import { IAiTool } from "@/interfaces/main";

function KoAutoComplete(searchWord: any, arrAi: IAiTool[]): IAiTool[] {
  // console.log("ko-filter");
  return arrAi.filter((item: any) => {
    return (
      item.ko.name.some((name: any) => name.includes(searchWord)) ||
      item.ko.category.some((category: any) => category.includes(searchWord))
    );
  });
}

function EnAutoComplete(searchWord: any, arrAi: IAiTool[]): IAiTool[] {
  // console.log("en-filter");
  return arrAi.filter((item: any) => {
    return (
      item.en.name.some((name: any) => name.includes(searchWord)) ||
      item.en.category.some((category: any) => category.includes(searchWord))
    );
  });
}

export { KoAutoComplete, EnAutoComplete };
