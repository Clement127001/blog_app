import { Outlet } from "react-router-dom";
import { LoginProvider } from "@/contexts/LoginProvider";
import { PageLoaderProvider } from "@/contexts/pageLoaderProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Toaster />
      <LoginProvider>
        <PageLoaderProvider>
          <main>
            <Navbar />
            <div className="px-20">
              <Outlet />
            </div>
          </main>
        </PageLoaderProvider>
      </LoginProvider>
    </>
  );
};

export default RootLayout;
