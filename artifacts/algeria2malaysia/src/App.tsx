import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ThankYouPage from "./pages/ThankYouPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniApplyPage from "./pages/UniApplyPage";
import { getNavState, subscribeNav } from "./hooks/useNavigate";

function App() {
  const [nav, setNav] = useState(getNavState);

  useEffect(() => {
    return subscribeNav(() => setNav(getNavState()));
  }, []);

  const { page, state } = nav;

  const showNavbar = page === "home" || page === "universities";

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {showNavbar && <Navbar />}
      {page === "home" && <HomePage />}
      {page === "universities" && <UniversitiesPage />}
      {page === "apply" && <ApplyPage initialType={state.type} />}
      {page === "thank-you" && <ThankYouPage />}
      {page === "uni-apply" && <UniApplyPage />}
    </div>
  );
}

export default App;
