import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { RecoilRoot } from "recoil";
import useThemeStore from "@zustand/themeStore";
import { useEffect } from "react";

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
