import { createFileRoute } from "@tanstack/react-router";
import { FileText, Users, Radio, ShieldAlert } from "lucide-react";
import { useMockSettings } from "@/lib/prototype-state";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Painel Admin — Gattini" }] }),
  component: AdminPage,
});

const stats = [
  { label: "Prontuários Hoje", value: "24", icon: FileText, hint: "+6 vs ontem" },
  { label: "Profissionais Ativos", value: "08", icon: Users, hint: "2 online agora" },
  { label: "Sincronizações PLAUD", value: "131", icon: Radio, hint: "última: 14:32" },
];

const logs = [
  { date: "28/05 14:33", user: "Dra. Ana Lima", action: "Aprovou prontuário", target: "TR-0420" },
  { date: "28/05 14:12", user: "Sistema (IA)", action: "Estruturou SOAP", target: "TR-0420" },
  { date: "28/05 13:55", user: "Dr. Marco Reis", action: "Vinculou paciente", target: "PAC-117" },
  { date: "28/05 12:08", user: "Dra. Ana Lima", action: "Login efetuado", target: "—" },
  { date: "28/05 09:45", user: "Sistema (PLAUD)", action: "Sincronização recebida", target: "TR-0418" },
  { date: "27/05 18:02", user: "Admin", action: "Atualizou config webhook", target: "Settings" },
];

function AdminPage() {
  const { requireAdminAuth, toggleSetting } = useMockSettings();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="font-serif text-4xl text-[#4B4037]">Painel Administrativo</h1>
        <p className="text-sm text-[#A68A72] mt-1">Visão geral operacional e auditoria de eventos.</p>
      </header>

      <div className="bg-[#F5EFE8] border border-amber-200/60 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#4B4037]">Restrição de Edição de Prontuários</h3>
            <p className="text-sm text-[#A68A72]">Bloqueia a edição de documentos já "Aprovados" para usuários comuns (Exige Admin).</p>
          </div>
        </div>
        <button 
          onClick={toggleSetting} 
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            requireAdminAuth 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-[#E8DCCF] text-[#4B4037] hover:bg-[#E8DCCF]/80'
          }`}
        >
          {requireAdminAuth ? "Regra Ativada" : "Regra Desativada"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#A68A72]">{s.label}</span>
                <Icon className="w-5 h-5 text-[#A68A72]" />
              </div>
              <div className="mt-4 font-serif text-5xl text-[#4B4037]">{s.value}</div>
              <div className="mt-2 text-xs text-[#A68A72]">{s.hint}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8DCCF]">
          <h2 className="font-serif text-xl text-[#4B4037]">Log de Atividades (Auditoria)</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[#A68A72] border-b border-[#E8DCCF]">
              <th className="px-6 py-3 font-medium">Data</th>
              <th className="px-6 py-3 font-medium">Usuário</th>
              <th className="px-6 py-3 font-medium">Ação</th>
              <th className="px-6 py-3 font-medium">Registro</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, i) => (
              <tr key={i} className="border-b border-[#E8DCCF] last:border-0 hover:bg-[#E8DCCF]/30">
                <td className="px-6 py-3 text-[#A68A72]">{l.date}</td>
                <td className="px-6 py-3 text-[#4B4037] font-medium">{l.user}</td>
                <td className="px-6 py-3 text-[#4B4037]">{l.action}</td>
                <td className="px-6 py-3 text-[#A68A72]">{l.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}