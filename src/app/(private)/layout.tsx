import Header from "@/components/Layout/Header";
import { LayoutProps } from "@/lib/types";

const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>;
    </>
  );
};

export default PrivateLayout;
