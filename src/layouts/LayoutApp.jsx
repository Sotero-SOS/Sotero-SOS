import { Outlet } from "react-router-dom";

function LayoutApp() {
  return (
    <div className="LayoutApp ">
      <p>header</p>
      <h2>nav</h2>
      <p>footer</p>
      <Outlet />
    </div>
  );
}

export default LayoutApp;
