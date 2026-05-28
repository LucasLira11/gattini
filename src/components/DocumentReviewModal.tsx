import { X, FileCheck } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function DocumentReviewModal({ open, onClose }: Props) {
  if (!open) return null;

  function handleApprove() {
    toast.success("Prontuário aprovado e salvo no armazenamento local.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4B4037]/40 backdrop-blur-sm p-6">
      <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DCCF]">
          <div>
            <h2 className="font-serif text-2xl text-[#4B4037]">Revisão do Documento</h2>
            <p className="text-xs text-[#A68A72]">Confira o prontuário organizado pela IA antes de aprovar.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#E8DCCF]/50">
            <X className="w-5 h-5 text-[#A68A72]" />
          </button>
        </div>

        {/* A4 preview area */}
        <div className="flex-1 overflow-y-auto bg-[#E8DCCF]/30 px-8 py-10">
          <div className="mx-auto bg-[#FCFBF9] shadow-md border border-[#E8DCCF] max-w-2xl aspect-[1/1.414] p-12 text-[#4B4037]">
            <div className="border-b border-[#E8DCCF] pb-4 mb-6 text-center">
              <h3 className="font-serif text-2xl text-[#A68A72]">Clínica Gattini</h3>
              <p className="text-[10px] tracking-widest uppercase text-[#A68A72]">Psicologia Clínica · CRP 06/000000</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div><span className="text-[#A68A72]">Paciente:</span> Maria Helena S.</div>
              <div><span className="text-[#A68A72]">Data:</span> 28/05/2026</div>
              <div><span className="text-[#A68A72]">Profissional:</span> Dra. Ana Lima</div>
              <div><span className="text-[#A68A72]">Sessão:</span> #12</div>
            </div>

            <div className="space-y-4 text-[13px] leading-relaxed">
              <section>
                <h4 className="font-serif text-base text-[#A68A72] mb-1">S — Subjetivo</h4>
                <p>Paciente relata melhora na qualidade do sono ao longo da última semana, com redução dos despertares noturnos. Mantém queixa de ansiedade antecipatória em contextos profissionais.</p>
              </section>
              <section>
                <h4 className="font-serif text-base text-[#A68A72] mb-1">O — Objetivo</h4>
                <p>Apresenta-se colaborativa, com afeto congruente e discurso organizado. Sem sinais de risco. Realizou os exercícios de respiração diafragmática propostos na sessão anterior.</p>
              </section>
              <section>
                <h4 className="font-serif text-base text-[#A68A72] mb-1">A — Avaliação</h4>
                <p>Quadro de transtorno de ansiedade generalizada em evolução favorável. Resposta consistente à TCC com técnicas de reestruturação cognitiva.</p>
              </section>
              <section>
                <h4 className="font-serif text-base text-[#A68A72] mb-1">P — Plano</h4>
                <p>Manter frequência semanal. Introduzir registro de pensamentos automáticos. Reavaliar em 4 semanas.</p>
              </section>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8DCCF] px-6 py-4 flex items-center justify-between gap-4 bg-[#F5EFE8]">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-[#A68A72]">Vincular paciente</label>
            <select className="mt-1 w-full max-w-xs bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg px-3 py-2 text-sm text-[#4B4037] focus:outline-none focus:border-[#A68A72]">
              <option>Maria Helena S.</option>
              <option>João Pedro R.</option>
              <option>Carla Mendes T.</option>
              <option>+ Novo paciente</option>
            </select>
          </div>
          <button
            onClick={handleApprove}
            className="inline-flex items-center gap-2 bg-[#4B4037] text-[#FCFBF9] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4B4037]/90 transition"
          >
            <FileCheck className="w-4 h-4" /> Aprovar e Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
