import AllRepositories from "./pages/searchRepo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleRepoDetail from "./components/singleRepoDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<AllRepositories />} />
          <Route exact path="/repo/:id" element={<SingleRepoDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
