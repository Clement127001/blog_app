import { Button } from "@/components/ui/button";
import type { LucideProps } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const NavLinkButton = ({
  label,
  to,
  Icon,
}: {
  label: string;
  to: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  const router = useLocation();
  const isActive = router.pathname === to;

  return (
    <Link to={to} className="cursor-pointer">
      <div className="relative">
        <Button
          className={`cursor-pointer gap-4 py-5 text-md font-normal min-h-[40px]
        transition-colors duration-300 bg-transparent w-fit  shadow-none text-[15px] hover:bg-transparent hover:cursor-pointer  ${
          isActive
            ? " text-black shadow-freelancer"
            : "text-gray-700 hover:text-black"
        }`}
        >
          <span className="p-2 lg:p-0 bg-[#186B641A] lg:bg-transparent rounded-[6px]">
            {Icon && <Icon strokeWidth={2.5} size={32} />}
          </span>
          <p className="text-md font-medium capitalize">{label}</p>
        </Button>

        {isActive && (
          <div className="bg-app-primary-700  h-1 rounded-t-sm hidden lg:block absolute w-full bottom-[-16px]" />
        )}
      </div>
    </Link>
  );
};

export default NavLinkButton;
