import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { NewRecordModal } from "@/components/NewRecordModal";
import { DocumentReviewModal } from "@/components/DocumentReviewModal";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Caixa de Entrada — Gattini" }] }),
  component: InboxPage,
});

type Status = "em_analise" | "pronto" | "aprovado";

const rows: { id: string; date: string; status: Status }[] = [
  { id: "TR-0421", date: "28/05/2026 · 14:32", status: "em_analise" },
  { id: "TR-0420", date: "28/05/2026 · 11:08", status: "pronto" },
  { id: "TR-0419", date: "27/05/2026 · 17:45", status: "aprovado" },
  { id: "TR-0418", date: "27/05/2026 · 09:12", status: "pronto" },
  { id: "TR-0417", date: "26/05/2026 · 16:20", status: "aprovado" },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "em_analise") {
    return (
      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 pulse-dot" />
        Em Análise
      </span>
    );
  }
  if (status === "pronto") {
    return <span className="inline-flex px-2.5 py-1 rounded-full bg-[#E8DCCF]/70 text-[#4B4037] text-xs font-medium">Pronto p/ Revisão</span>;
  }
  return <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">Aprovado</span>;
}

function InboxPage() {
  const [newOpen, setNewOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <div className="p-10 max-w-6xl">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl text-[#4B4037]">Caixa de Entrada</h1>
          <p className="text-sm text-[#A68A72] mt-1">Transcrições recebidas do hardware PLAUD aguardando estruturação.</p>
        </div>
        <button
          onClick={() => setNewOpen(true)}
          className="inline-flex items-center gap-2 bg-[#4B4037] text-[#FCFBF9] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4B4037]/90 transition"
        >
          <Plus className="w-4 h-4" /> Novo Prontuário
        </button>
      </header>

      <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[#A68A72] border-b border-[#E8DCCF]">
              <th className="px-6 py-4 font-medium">ID · Data</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#E8DCCF] last:border-0 hover:bg-[#E8DCCF]/30 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#A68A72]" />
                    <div>
                      <div className="text-[#4B4037] font-medium">{r.id}</div>
                      <div className="text-xs text-[#A68A72]">{r.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setReviewOpen(true)}
                    disabled={r.status === "em_analise"}
                    className="text-[#4B4037] text-sm font-medium hover:underline disabled:text-[#A68A72]/60 disabled:no-underline disabled:cursor-not-allowed"
                  >
                    Revisar Documento
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewRecordModal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        onOrganized={() => { setNewOpen(false); setReviewOpen(true); }}
      />
      <DocumentReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)} />
    </div>
  );
}
