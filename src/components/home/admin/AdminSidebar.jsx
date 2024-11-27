import { FaUserCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const menuItems = [
    { label: "Usuarios Registrados", href: "/administracion/usuarios" },
    { label: "Pedidos", href: "/administracion/orderlist" },
    { label: "Modificar Productos"}, //Kikeeeeeee falta ponerle la ruta pra que vaya a Stripe ☻☺☻☺☻☺☻☺
  ];

  const userName = user ? `${user.first_name} ${user.last_name}` : "Admin";

  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>

      <div className="flex flex-col items-center relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">
          Administración
        </h2>

        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-lg shadow-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
          <FaUserCog className="text-white text-2xl" />
        </div>

        <h3 className="text-xl font-medium mb-8 text-gray-700 text-center px-2">
          {userName}
        </h3>

        <div className="w-full space-y-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`
                  block relative group transition-all duration-300
                  ${isActive ? "text-white" : "text-gray-600 hover:text-gray-800"}
                `}
              >
                <div
                  className={`
                    relative w-full py-3 px-4 rounded-l-lg transition-all duration-100
                    ${
                      isActive
                        ? "bg-green-500 shadow-lg"
                        : "hover:bg-green-50 hover:shadow-md"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute right-0 top-0 h-full w-4">
                      <div className="absolute right-0 top-0 h-full w-6 bg-green-500 transform translate-x-6">
                        <div className="absolute left-0 top-0 h-full w-0 border-[20px] border-l-green-500 border-y-transparent border-r-transparent"></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <span
                      className={`
                        font-medium transition-all duration-100
                        ${
                          isActive
                            ? "transform translate-x-6"
                            : "group-hover:translate-x-4"
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;