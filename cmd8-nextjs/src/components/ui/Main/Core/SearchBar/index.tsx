export const SearchBar = ({ searchWord, setSearchWord }: any): JSX.Element => {
	const onChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setSearchWord(event.target.value);
	};
  
	return (
	  <input
		id="searchWord"
		name="searchWord"
		type="text"
		className="coreSec-search rounded-full my-16 mx-12% py-auto  text-center text-base border h-14 w-3/4 lg:w-2/3 max-w-3xl"
		placeholder="이름, 용도, or 분야를 입력해주세요"
		value={searchWord}
		onChange={onChangeSearchWord}
	  />
	);
  };
  
