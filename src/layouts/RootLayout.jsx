import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 p-2">
      <Outlet />
    </div>
  );
};

export default RootLayout;
