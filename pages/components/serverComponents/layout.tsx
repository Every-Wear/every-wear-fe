import { ReactElement } from "react";
import BottomNavBar from "./bottomNavBar";

interface LayoutType {
  children: ReactElement;
}

export default function Layout({ children }: LayoutType) {
  return (
    <div>
      {children}
      <BottomNavBar />
    </div>
  );
}
