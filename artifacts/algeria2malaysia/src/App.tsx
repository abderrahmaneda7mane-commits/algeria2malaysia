import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ThankYouPage from "./pages/ThankYouPage";
import { getNavState, subscribeNav } from "./hooks/useNavigate";

function App() {
  const [nav, setNav] = useState(getNavState);

  useEffect(() => {
    return subscribeNav(() => setNav(getNavState()));
  }, []);

  const { page, state } = nav;

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {page === "home" && <Navbar />}
      {page === "home" && <HomePage />}
      {page === "apply" && <ApplyPage initialType={state.type} />}
      {page === "thank-you" && <ThankYouPage />}
    </div>
  );
}

export default App;
