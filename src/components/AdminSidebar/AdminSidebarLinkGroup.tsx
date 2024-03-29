import { ReactNode, useState } from "react";

interface AdminSidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const AdminSidebarLinkGroup = ({
  children,
  activeCondition,
}: AdminSidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default AdminSidebarLinkGroup;
