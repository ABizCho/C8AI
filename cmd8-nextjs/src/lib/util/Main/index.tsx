import { IAiTool } from "@/interfaces/main";
import hangul from "hangul-js";

// function KoAutoComplete(searchWord: any, arrAi: IAiTool[]): IAiTool[] {
//   // console.log("ko-filter");
//   return arrAi.filter((item: any) => {
//     return (
//       item.ko.name.some((name: any) => name.includes(searchWord)) ||
//       item.ko.category.some((category: any) => category.includes(searchWord))
//     );
//   });
// }

// function EnAutoComplete(searchWord: any, arrAi: IAiTool[]): IAiTool[] {
//   // console.log("en-filter");
//   return arrAi.filter((item: any) => {
//     return (
//       item.en.name.some((name: any) => name.includes(searchWord)) ||
//       item.en.category.some((category: any) => category.includes(searchWord))
//     );
//   });
// }

function KoAutoComplete(searchWord: string, arrAi: IAiTool[]): IAiTool[] {
  const searchWordArray = hangul.disassemble(searchWord).join("");

  return arrAi.map((item) => {
    const isFilteredOut =
      !item.ko.name.some((name) => {
        const nameArray = hangul.disassemble(name).join("");
        return nameArray.toLowerCase().includes(searchWordArray.toLowerCase());
      }) &&
      !item.ko.category.some((category) => {
        const categoryArray = hangul.disassemble(category).join("");
        return categoryArray
          .toLowerCase()
          .includes(searchWordArray.toLowerCase());
      });

    return {
      ...item,
      isFilteredOut,
    };
  });
}

function EnAutoComplete(searchWord: string, arrAi: IAiTool[]): IAiTool[] {
  return arrAi.map((item) => {
    const isFilteredOut =
      !item.en.name.some((name) =>
        name.toLowerCase().includes(searchWord.toLowerCase())
      ) &&
      !item.en.category.some((category) =>
        category.toLowerCase().includes(searchWord.toLowerCase())
      );

    return {
      ...item,
      isFilteredOut,
    };
  });
}

export { KoAutoComplete, EnAutoComplete };
