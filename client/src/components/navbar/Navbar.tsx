import { UseLogin } from "@/contexts/LoginProvider";
import NavLinkButton from "@/components/navbar/NavLinkButton";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { lazy, useState } from "react";
import { LogOut } from "lucide-react";
import { loggedUserNavItems, publicNavItems } from "@/utils/navigation";
import { logout } from "@/utils/common";

const LogoutConfirmationModal = lazy(
  () => import("@/components/ConfirmationModal")
);

const Navbar = () => {
  const [logoutConfirmationModalOpened, setLogoutConfirmationModalOpened] =
    useState<boolean>(false);
  const { isLoggedIn } = UseLogin();
  const navigate = useNavigate();

  const navItems = isLoggedIn ? loggedUserNavItems : publicNavItems;

  const handleOpenLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(true);
  };

  const handleCloseLogoutConfirmationModal = () => {
    setLogoutConfirmationModalOpened(false);
  };

  const handleLogout = () => {
    handleCloseLogoutConfirmationModal();
    navigate("/login?ua=" + false);
    logout();
  };

  return (
    <>
      <nav className="w-full py-4 px-20 flex justify-between items-center border-b">
        <Link to={"/"}>
          <img src="/assets/logo.svg" width={40} height={50} />
        </Link>

        <div className="flex gap-6 items-center">
          {navItems.map((navItem) => (
            <Fragment key={navItem.label}>
              <NavLinkButton {...navItem} />
            </Fragment>
          ))}
        </div>

        {isLoggedIn && (
          <Button
            className="bg-app-accent-error-500 hover:bg-app-accent-error-600"
            onClick={handleOpenLogoutConfirmationModal}
          >
            <LogOut fontWeight={3} />
            Logout
          </Button>
        )}
      </nav>

      {logoutConfirmationModalOpened && (
        <LogoutConfirmationModal
          opened={logoutConfirmationModalOpened}
          onClose={handleCloseLogoutConfirmationModal}
          title="Log Out"
          description="Are you sure you want to log out? You will need to sign in again to access your account."
          confirmText="Yes, Logout"
          onClickConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
