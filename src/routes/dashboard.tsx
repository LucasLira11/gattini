import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Inbox, ShieldCheck, Settings, LogOut } from "lucide-react";
import { useMockAuth } from "@/lib/prototype-state";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useMockAuth();

  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user, navigate]);

  if (!user) return null;

  const navItems = [
    { to: "/dashboard", label: "Caixa de Entrada", icon: Inbox, exact: true },
    ...(user.role === "admin" ? [
      { to: "/dashboard/admin", label: "Painel Admin", icon: ShieldCheck },
      { to: "/dashboard/settings", label: "Configurações", icon: Settings },
    ] : [])
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex bg-[#FCFBF9]">
      <aside className="w-64 bg-[#F5EFE8] border-r border-[#E8DCCF] flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="px-6 py-8 border-b border-[#E8DCCF]">
          <h1 className="font-serif text-3xl text-[#A68A72]">Gattini</h1>
          <p className="text-[10px] tracking-widest uppercase text-[#A68A72] mt-1">Clínica</p>
        </div>

        <div className="px-6 pt-4 pb-2 text-xs font-medium text-[#4B4037]">
          Olá, {user.name} <span className="text-[#A68A72]">({user.role})</span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#4B4037] hover:bg-[#E8DCCF]/50 transition-colors"
                activeProps={{ className: "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#4B4037] bg-[#E8DCCF]/70 font-medium" }}
              >
                <Icon className="w-4 h-4 text-[#A68A72]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#E8DCCF]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#4B4037] hover:bg-[#E8DCCF]/50 transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#A68A72]" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
}