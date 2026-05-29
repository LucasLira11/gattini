import { useState, useEffect } from "react";
import { X, FileCheck, Loader2, Bold, Italic, AlignLeft, AlignCenter, AlignRight, CloudCheck, CloudLightning } from "lucide-react";
import { toast } from "sonner";
import { saveDocument } from "@/lib/api/document.functions";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function DocumentReviewModal({ open, onClose }: Props) {
  const [patient, setPatient] = useState("Maria Helena S.");
  const [documentText, setDocumentText] = useState(
    `SUBJETIVO:\nPaciente relata melhora significativa na qualidade do sono ao longo da última semana, com redução drástica dos despertares noturnos. Mantém leve queixa de ansiedade antecipatória em contextos profissionais de alta demanda.\n\nOBJETIVO:\nApresenta-se colaborativa, com afeto congruente e discurso perfeitamente organizado. Sem sinais de risco. Realizou com sucesso os exercícios de respiração diafragmática propostos na sessão anterior.\n\nAVALIAÇÃO:\nQuadro de transtorno de ansiedade generalizada em evolução altamente favorável. Resposta consistente à TCC com técnicas aplicadas de reestruturação cognitiva.\n\nPLANO:\nManter a frequência semanal das sessões. Introduzir o registro diário de pensamentos automáticos disfuncionais. Reavaliar o quadro geral em 4 semanas.`
  );

  // Estados de controle de sincronização com o servidor
  const [syncStatus, setSyncStatus] = useState<"saved" | "typing" | "saving">("saved");
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Efeito de Auto-salvamento Automático (Debounce) conectado direto ao servidor web
  useEffect(() => {
    if (!open) return;

    // Sinaliza que o usuário está modificando o documento
    setSyncStatus("typing");

    const delayDebounceFn = setTimeout(async () => {
      setSyncStatus("saving");
      try {
        await saveDocument({
          data: {
            id: "TR-0420",
            patientId: patient,
            documentContent: documentText,
            status: "pronto",
          },
        });
        setSyncStatus("saved");
      } catch (error) {
        setSyncStatus("typing");
        console.error("Erro na sincronização em segundo plano:", error);
      }
    }, 1500); // Aguarda 1.5 segundos sem digitar para enviar os dados

    return () => clearTimeout(delayDebounceFn);
  }, [documentText, patient, open]);

  if (!open) return null;

  // Finalização manual (Aprovação definitiva)
  async function handleFinalApprove() {
    setIsFinalizing(true);
    try {
      const response = await saveDocument({
        data: {
          id: "TR-0420",
          patientId: patient,
          documentContent: documentText,
          status: "aprovado",
        },
      });

      if (response.success) {
        toast.success("Prontuário aprovado definitivamente e arquivado no servidor!");
        onClose();
      }
    } catch (error) {
      toast.error("Falha ao finalizar o documento no servidor.");
    } finally {
      setIsFinalizing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4B4037]/40 backdrop-blur-sm p-6">
      <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Cabeçalho superior */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DCCF] bg-[#F5EFE8]">
          <div>
            <h2 className="font-serif text-2xl text-[#4B4037]">Ambiente de Revisão Integrado</h2>
            <p className="text-xs text-[#A68A72]">As alterações são salvas automaticamente no servidor enquanto você digita.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Indicador visual de status da nuvem */}
            <div className="flex items-center gap-2 text-xs font-medium">
              {syncStatus === "saved" && (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <CloudCheck className="w-3.5 h-3.5" /> Sincronizado
                </span>
              )}
              {syncStatus === "typing" && (
                <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <CloudLightning className="w-3.5 h-3.5 animate-pulse" /> Editando...
                </span>
              )}
              {syncStatus === "saving" && (
                <span className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Atualizando servidor...
                </span>
              )}
            </div>

            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#E8DCCF]/50 transition-colors">
              <X className="w-5 h-5 text-[#A68A72]" />
            </button>
          </div>
        </div>

        {/* Barra de Ferramentas estilo Processador de Texto / Word */}
        <div className="bg-[#FCFBF9] border-b border-[#E8DCCF] px-6 py-2 flex items-center gap-1 shadow-sm">
          <button title="Negrito" className="p-1.5 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] font-bold text-xs transition-colors">
            <Bold className="w-4 h-4" />
          </button>
          <button title="Itálico" className="p-1.5 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] italic text-xs transition-colors">
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-[#E8DCCF] mx-2" />
          <button title="Alinhar à Esquerda" className="p-1.5 rounded bg-[#E8DCCF]/50 text-[#4B4037] transition-colors">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button title="Centralizar" className="p-1.5 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] transition-colors">
            <AlignCenter className="w-4 h-4" />
          </button>
          <button title="Alinhar à Direita" className="p-1.5 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] transition-colors">
            <AlignRight className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-[#E8DCCF] mx-2" />
          <span className="text-[11px] text-[#A68A72] font-mono select-none">Fonte: Arial (11pt)</span>
        </div>

        {/* Área da folha de papel interativa */}
        <div className="flex-1 overflow-y-auto bg-[#E8DCCF]/20 px-8 py-8 flex justify-center">
          <div className="bg-[#FCFBF9] shadow-lg border border-[#E8DCCF] w-full max-w-2xl p-12 text-[#4B4037] min-h-[750px] flex flex-col rounded-sm">
            
            {/* Cabeçalho interno do documento */}
            <div className="border-b border-[#E8DCCF] pb-4 mb-6 text-center select-none">
              <h3 className="font-serif text-2xl text-[#A68A72] tracking-wide">Clínica Gattini</h3>
              <p className="text-[10px] tracking-widest uppercase text-[#A68A72] mt-0.5">Psicologia Clínica · Registro Regularizado</p>
            </div>

            {/* Metadados dinâmicos */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs mb-6 bg-[#F5EFE8]/40 p-3 rounded-lg border border-[#E8DCCF]/60">
              <div><span className="text-[#A68A72] font-medium">Paciente atual:</span> {patient}</div>
              <div><span className="text-[#A68A72] font-medium">Data de Emissão:</span> 28/05/2026</div>
              <div><span className="text-[#A68A72] font-medium">Profissional Responsável:</span> Dra. Ana Lima</div>
              <div><span className="text-[#A68A72] font-medium">Identificador:</span> TR-0420</div>
            </div>

            {/* Área de edição direta contínua */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Comece a digitar ou estruturar o prontuário..."
                className="w-full flex-1 bg-transparent text-[13px] leading-relaxed font-sans text-[#4B4037] outline-none border-0 placeholder-[#A68A72]/50 resize-none focus:ring-0 p-0"
                style={{ minHeight: "450px" }}
              />
            </div>
            
            <div className="border-t border-[#E8DCCF]/60 pt-4 mt-6 text-center text-[10px] text-[#A68A72] select-none">
              Documento integrado via Sistema de Estruturação Gattini
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="border-t border-[#E8DCCF] px-6 py-4 flex items-center justify-between gap-4 bg-[#F5EFE8]">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-[#A68A72] font-medium">Vincular Registro ao Paciente</label>
            <select 
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="mt-1.5 w-full max-w-xs bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg px-3 py-2 text-sm text-[#4B4037] focus:outline-none focus:border-[#A68A72] shadow-sm transition-colors"
            >
              <option value="Maria Helena S.">Maria Helena S.</option>
              <option value="João Pedro R.">João Pedro R.</option>
              <option value="Carla Mendes T.">Carla Mendes T.</option>
            </select>
          </div>
          
          <button
            onClick={handleFinalApprove}
            disabled={isFinalizing || syncStatus === "saving"}
            className="inline-flex items-center gap-2 bg-[#4B4037] text-[#FCFBF9] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4B4037]/90 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isFinalizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4" />}
            {isFinalizing ? "Concluindo no Servidor..." : "Aprovar e Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
}