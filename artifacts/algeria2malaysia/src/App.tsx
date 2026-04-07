import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ThankYouPage from "./pages/ThankYouPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniApplyPage from "./pages/UniApplyPage";
import UPMCoursesPage from "./pages/UPMCoursesPage";
import APUCoursesPage from "./pages/APUCoursesPage";
import TaylorsCoursesPage from "./pages/TaylorsCoursesPage";
import MMUCoursesPage from "./pages/MMUCoursesPage";
import UniKLCoursesPage from "./pages/UniKLCoursesPage";
import LincolnCoursesPage from "./pages/LincolnCoursesPage";
import UTPCoursesPage from "./pages/UTPCoursesPage";
import UTMCoursesPage from "./pages/UTMCoursesPage";
import UTeMCoursesPage from "./pages/UTeMCoursesPage";
import UCSICoursesPage from "./pages/UCSICoursesPage";
import CityUCoursesPage from "./pages/CityUCoursesPage";
import { getNavState, subscribeNav } from "./hooks/useNavigate";

function App() {
  const [nav, setNav] = useState(getNavState);

  useEffect(() => {
    return subscribeNav(() => setNav(getNavState()));
  }, []);

  const { page, state } = nav;

  const showNavbar = page === "home" || page === "universities" || page === "upm" || page === "apu" || page === "taylors" || page === "mmu" || page === "unikl" || page === "lincoln" || page === "utp" || page === "utm" || page === "utem" || page === "ucsi" || page === "cityu-courses";

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {showNavbar && <Navbar />}
      {page === "home" && <HomePage />}
      {page === "universities" && <UniversitiesPage />}
      {page === "apply" && <ApplyPage initialType={state.type} />}
      {page === "thank-you" && <ThankYouPage />}
      {page === "uni-apply" && <UniApplyPage />}
      {page === "upm" && <UPMCoursesPage />}
      {page === "apu" && <APUCoursesPage />}
      {page === "taylors" && <TaylorsCoursesPage />}
      {page === "mmu" && <MMUCoursesPage />}
      {page === "unikl" && <UniKLCoursesPage />}
      {page === "lincoln" && <LincolnCoursesPage />}
      {page === "utp" && <UTPCoursesPage />}
      {page === "utm" && <UTMCoursesPage />}
      {page === "utem" && <UTeMCoursesPage />}
      {page === "ucsi" && <UCSICoursesPage />}
      {page === "cityu-courses" && <CityUCoursesPage />}
    </div>
  );
}

export default App;
