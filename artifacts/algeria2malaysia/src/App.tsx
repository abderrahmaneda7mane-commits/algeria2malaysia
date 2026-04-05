import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ThankYouPage from "./pages/ThankYouPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniApplyPage from "./pages/UniApplyPage";
import UPMCoursesPage from "./pages/UPMCoursesPage";
import { getNavState, subscribeNav } from "./hooks/useNavigate";

function App() {
  const [nav, setNav] = useState(getNavState);

  useEffect(() => {
    return subscribeNav(() => setNav(getNavState()));
  }, []);

  const { page, state } = nav;

  const showNavbar = page === "home" || page === "universities" || page === "upm";

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {showNavbar && <Navbar />}
      {page === "home" && <HomePage />}
      {page === "universities" && <UniversitiesPage />}
      {page === "apply" && <ApplyPage initialType={state.type} />}
      {page === "thank-you" && <ThankYouPage />}
      {page === "uni-apply" && <UniApplyPage />}
      {page === "upm" && <UPMCoursesPage />}
    </div>
  );
}

export default App;
