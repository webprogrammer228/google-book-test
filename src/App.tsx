import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookPage from "./pages/BookPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:id" element={<BookPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
