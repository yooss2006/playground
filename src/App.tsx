import { BrowserRouter } from "react-router-dom";
import PageRoute from "./pages";

function App() {
  return (
    <BrowserRouter>
      <PageRoute />
    </BrowserRouter>
  );
}

export default App;
