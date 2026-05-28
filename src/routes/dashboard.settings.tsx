import { createFileRoute } from "@tanstack/react-router";
import { HardDrive, Webhook, ShieldCheck, Lock } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Configurações — Gattini" }] }),
  component: SettingsPage,
});

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-[#A68A72]">{label}</label>
      <div className="mt-1.5 flex items-center gap-2 bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg px-3 py-2.5 text-sm text-[#4B4037] font-mono">
        <Lock className="w-3.5 h-3.5 text-[#A68A72] shrink-0" />
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-10 max-w-6xl">
      <header className="mb-8">
        <h1 className="font-serif text-4xl text-[#4B4037]">Configurações</h1>
        <p className="text-sm text-[#A68A72] mt-1">Infraestrutura, integrações e conformidade.</p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-[#E8DCCF]/70 rounded-lg"><HardDrive className="w-5 h-5 text-[#A68A72]" /></div>
            <div>
              <h2 className="font-serif text-lg text-[#4B4037]">Armazenamento Local</h2>
              <p className="text-xs text-[#A68A72]">On-Premise · Servidor da clínica</p>
            </div>
          </div>
          <div className="space-y-3">
            <ReadOnlyField label="Diretório raiz" value="D:\Clinica\Gattini\Prontuarios" />
            <ReadOnlyField label="Backup automático" value="D:\Clinica\Backups\daily" />
          </div>
        </div>

        <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-[#E8DCCF]/70 rounded-lg"><Webhook className="w-5 h-5 text-[#A68A72]" /></div>
            <div>
              <h2 className="font-serif text-lg text-[#4B4037]">Integração Webhook</h2>
              <p className="text-xs text-[#A68A72]">PLAUD → Gattini</p>
            </div>
          </div>
          <div className="space-y-3">
            <ReadOnlyField label="Endpoint" value="https://api.gattini.local/v1/plaud/ingest" />
            <ReadOnlyField label="Token" value="••••••••••••••••3f7a" />
          </div>
        </div>

        <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-[#E8DCCF]/70 rounded-lg"><ShieldCheck className="w-5 h-5 text-[#A68A72]" /></div>
            <div>
              <h2 className="font-serif text-lg text-[#4B4037]">Segurança e LGPD</h2>
              <p className="text-xs text-[#A68A72]">Conformidade ativa</p>
            </div>
          </div>
          <div className="space-y-3">
            <ReadOnlyField label="Túnel" value="Cloudflare Tunnel · Ativo" />
            <ReadOnlyField label="Política IA" value="Zero Data Retention" />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-6 flex items-center gap-4">
        <ShieldCheck className="w-6 h-6 text-[#A68A72]" />
        <p className="text-sm text-[#4B4037]">
          Todos os dados sensíveis permanecem no servidor da clínica. Nenhum prontuário é armazenado em nuvens externas.
        </p>
      </div>
    </div>
  );
}
