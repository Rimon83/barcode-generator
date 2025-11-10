import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./not-found";


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Catch-all route for any unmatched paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
