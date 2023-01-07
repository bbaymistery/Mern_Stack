import '../styles/App.css';
import {  RouterProvider } from 'react-router-dom'
import { router } from '../routers';
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// import Main from './Main';
// import Quiz from './Quiz';
// import Result from './Result';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />
//   },
//   {
//     path: "/quiz",
//     element: <Quiz />
//   },
//   {
//     path: "/result",
//     element: <Result />
//   },
// ])