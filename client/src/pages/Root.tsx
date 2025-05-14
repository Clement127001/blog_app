import { Outlet } from "react-router-dom";
import { LoginProvider } from "src/contexts/LoginProvider";

const RootLayout = () => {
  return (
    <LoginProvider>
      <main>
        <Outlet />
      </main>
    </LoginProvider>
  );
};

export default RootLayout;
