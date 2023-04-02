import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import Books from '../../components/store/Books';

import { useEffect, useState, useRef } from "react";

import axios from "axios";

// const host =
//   window.location.hostname === "localhost"
//     ? process.env.REACT_APP_SERVER_URL
//     : "api";

// export const apiClient = axios.create({
//   baseURL: host,
// });

// //

// /**
//  * 등록된 책들의 리스트 요청
//  * @returns
//  */
// export const getBooks = async () => {
//   return await apiClient({
//     method: "get",
//     url: `/`,
//   });
// };

const SearchBar = ({ searchWord, onChangeSearchWord }) => {
  return (
    <div className="container">
      <div className="desktop-box">
        <div className="search-bar ">
          <span className="material-symbols-outlined">search</span>
          <input
            id="searchWord"
            name="searchWord"
            type="text"
            placeholder="이름, 용도 등을 입력해주세요"
            value={searchWord}
            onChange={onChangeSearchWord}
            className="w-100p"
          />
        </div>
      </div>
    </div>
  );
};

const SearchBarContainer = ({ searchWord, setSearchWord }) => {
  const onChangeSearchWord = (event) => {
    setSearchWord(event.target.value);
  };
  return (
    <SearchBar
      searchWord={searchWord}
      onChangeSearchWord={onChangeSearchWord}
    />
  );
};

//

const Books = ({ filteredBooks, onClickBook }) => {
  return (
    <>
      <div className="content-section">
        <div className="container grid-store">
          {filteredBooks.map((book, index) => (
            <div key={index}>{book.title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

const BooksContainer = ({ totalBooks, searchWord }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["userData"]);

  const filteredBooks = totalBooks.filter((book) => {
    console.log(
      book.title
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchWord.toLocaleLowerCase().replace(" ", ""))
    );

    return book.title
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(searchWord.toLocaleLowerCase().replace(" ", ""));
  });
  console.log(filteredBooks);

  const onClickBook = (isbn) => {
    navigate(`/detail`, {
      state: {
        registered: isbn,
      },
    });
  };

  return <Books filteredBooks={filteredBooks} onClickBook={onClickBook} />;
};

const FullPage = () => {
  const [totalBooks, setTotalBooks] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    // getBooks().then((response) => {
    //   setTotalBooks(response.data.data);
    setTotalBooks([
      {
        title: "chatGPT",
        isbn: "111",
      },
      {
        title: "midjourney",
        isbn: "222",
      },
    ]);
    console.log(totalBooks);
  }, []);

  return (
    <>
      <header className="genre-header bg-full">
        <div className="overlay">
          <h1 className="subtitle">우리가 만드는 공유책방</h1>
          <div className="mouse-icon">
            <div className="wheel" />
          </div>
        </div>
      </header>

      <div className="white-cement-bg">
        <div className="gallery-area">
          <SearchBarContainer
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
          <BooksContainer totalBooks={totalBooks} searchWord={searchWord} />
        </div>
      </div>
    </>
  );
};

export default FullPage;
