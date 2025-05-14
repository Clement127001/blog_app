import { Outlet } from "react-router-dom";
import { LoginProvider } from "@/contexts/LoginProvider";
import { PageLoaderProvider } from "@/contexts/pageLoaderProvider";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <Toaster />
      <LoginProvider>
        <PageLoaderProvider>
          <main>
            <Outlet />
          </main>
        </PageLoaderProvider>
      </LoginProvider>
    </>
  );
};

export default RootLayout;
