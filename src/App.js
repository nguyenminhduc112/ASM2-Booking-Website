import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import { Suspense, lazy } from "react";

const Detail = lazy(() => import('./pages/detail/Detail'))
const Search = lazy(() => import('./pages/search/Search'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Transaction = lazy(() => import('./pages/transaction/Transaction'))
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Suspense fallback={<p>...Loading</p>}><Search /></Suspense>} />
        <Route path="/detail/:hotelId" element={<Suspense fallback={<p>...Loading</p>}><Detail /></Suspense>} />
        <Route path="/signin" element={<Suspense fallback={<p>...Loading</p>}><Login /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<p>...Loading</p>}><Register /></Suspense>} />
        <Route path="/transaction" element={<Suspense fallback={<p>...Loading</p>}><Transaction /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
