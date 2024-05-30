import { Route, Routes } from "react-router-dom";
import ZustandPage from "./zustand";
import RootPage from "./root";

export default function PageRoute() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/zustand" element={<ZustandPage />} />
    </Routes>
  );
}
