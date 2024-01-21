import { Layout, Menu } from "antd";
import { sidebarGenerator } from "../utils/sidebarGenerator";
import { adminPaths } from "../routes/adminRoutes";
import { facultyPaths } from "../routes/facultyRoutes";
import { studentPaths } from "../routes/studentRoutes";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/feature/auth/authSlice";

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
  };
  

const Sidebar = () => {
  const user = useAppSelector(currentUser);
  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
        sidebarItems = sidebarGenerator(adminPaths, userRole.ADMIN);
        break;
    case userRole.FACULTY:
        sidebarItems = sidebarGenerator(facultyPaths, userRole.FACULTY);
        break;
    case userRole.STUDENT:
        sidebarItems = sidebarGenerator(studentPaths, userRole.STUDENT);
        break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH UM</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
