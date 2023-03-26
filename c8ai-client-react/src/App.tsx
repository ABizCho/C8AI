import React from "react";
import { Provider } from "react-redux";
import { Outlet, Routes, Route } from "react-router-dom";

import { Layout } from "./layout/layout";
import { LayoutFooter } from "./layout/footer/layout-footer";
import { LayoutHeader } from "./layout/header/layout-header";
import store from "./store";
import "./App.css";
import Home2 from "./routes/Home2";
import Home from "./routes/Home";

function App() {
  // const name = this.props.name;
  // const imgUrl = `/${"images"}/${"logo"}.${"png"}`;
  return (
    <div className="App">
      {/* <img className="img-logo" src={imgUrl} alt={`logo`} title={`logo`} /> */}
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              // 콜백으로 컴포넌트 전달하는 이유가 있나? 가독성은 떨어져보이는데. https://github.com/ABizCho/react-redux-typescript-guide 참고한 코드임
              <Layout
                renderHeader={() => <LayoutHeader />}
                renderFooter={() => <LayoutFooter />}
                // Outlet : 자식경로에 해당하는 컴포넌트를 렌더링하는 역할
                renderContent={() => <Outlet />}
              />
            }
          >
            <Route
              element={<Home />}
              index
              //index는 동일 경로 상 가장 우선순위로 렌더링 될 컴포넌트 지정
            />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
