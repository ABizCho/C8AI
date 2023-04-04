import React from "react";
import { Provider } from "react-redux";
import { Outlet, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "./layout/layout";
import { LayoutFooter } from "./layout/footer/layout-footer";
import { LayoutHeader } from "./layout/header/layout-header";
import store from "./store";
import "./App.css";

import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  // const name = this.props.name;
  // const imgUrl = `/${"images"}/${"logo"}.${"png"}`;
  return (
    <div className="App">
      {/* <img className="img-logo" src={imgUrl} alt={`logo`} title={`logo`} /> */}
      <QueryClientProvider client={queryClient}>
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
              <Route element={<Home />} index />
            </Route>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

// import React from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h1`
//   font-size: 32px;
//   color: #333;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   width: 100%;
// `;

// const Item = styled.div`
//   width: calc(33.33% - 20px);
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     width: calc(50% - 20px);
//   }

//   @media (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const Image = styled.img`
//   width: 100%;
// `;

// const Text = styled.p`
//   font-size: 16px;
//   color: #666;
// `;

// const App = () => {
//   return (
//     // <Container>
//     //   <Title>My Responsive Web</Title>
//     <Content>
//       <Item>
//         <Image src="image1.jpg" />
//         <Text>Image 1</Text>
//       </Item>
//       <Item>
//         <Image src="image2.jpg" />
//         <Text>Image 2</Text>
//       </Item>
//       <Item>
//         <Image src="image3.jpg" />
//         <Text>Image 3</Text>
//       </Item>
//       <Item>
//         <Image src="image4.jpg" />
//         <Text>Image 4</Text>
//       </Item>
//       <Item>
//         <Image src="image5.jpg" />
//         <Text>Image 5</Text>
//       </Item>
//       <Item>
//         <Image src="image6.jpg" />
//         <Text>Image 6</Text>
//       </Item>
//       <Item>
//         <Image src="image6.jpg" />
//         <Text>Image 6</Text>
//       </Item>
//       <Item>
//         <Image src="image6.jpg" />
//         <Text>Image 6</Text>
//       </Item>
//       <Item>
//         <Image src="image6.jpg" />
//         <Text>Image 6</Text>
//       </Item>
//     </Content>
//     // </Container>
//   );
// };

export default App;
