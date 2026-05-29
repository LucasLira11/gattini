import { useState, useEffect, useRef } from "react";
import { X, FileCheck, Loader2, Bold, Italic, AlignLeft, AlignCenter, AlignRight, CloudCheck, CloudLightning, Edit3, Search, Check, Eye, Maximize } from "lucide-react";
import { toast } from "sonner";
import { saveDocument } from "@/lib/api/document.functions";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PACIENTES_MOCK = [
  { id: "PAC-001", nome: "Maria Helena Silva" },
  { id: "PAC-002", nome: "João Pedro Rodrigues" },
  { id: "PAC-003", nome: "Carla Mendes Teixeira" },
  { id: "PAC-004", nome: "Ana Paula Souza" },
  { id: "PAC-005", nome: "Ana Paula Martins" },
  { id: "PAC-006", nome: "Carlos Eduardo Costa" },
  { id: "PAC-007", nome: "Mariana Costa Gomes" },
  { id: "PAC-008", nome: "Felipe Almeida" },
];

const PROFISSIONAIS_MOCK = [
  "Dra. Ana Lima",
  "Dr. Marco Reis",
  "Dra. Júlia Gattini",
  "Dr. Carlos Gattini"
];

// Função auxiliar para remover acentos na hora da busca
const removerAcentos = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export function DocumentReviewModal({ open, onClose }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [documentText, setDocumentText] = useState(
    `SUBJETIVO:\nPaciente relata melhora significativa na qualidade do sono ao longo da última semana, com redução drástica dos despertares noturnos. Mantém leve queixa de ansiedade antecipatória em contextos profissionais de alta demanda.\n\nOBJETIVO:\nApresenta-se colaborativa, com afeto congruente e discurso perfeitamente organizado. Sem sinais de risco. Realizou com sucesso os exercícios de respiração diafragmática propostos na sessão anterior.\n\nAVALIAÇÃO:\nQuadro de transtorno de ansiedade generalizada em evolução altamente favorável. Resposta consistente à TCC com técnicas aplicadas de reestruturação cognitiva.\n\nPLANO:\nManter a frequência semanal das sessões. Introduzir o registro diário de pensamentos automáticos disfuncionais. Reavaliar o quadro geral em 4 semanas.`
  );

  const [patientSearch, setPatientSearch] = useState("Maria Helena Silva");
  const [selectedPatientId, setSelectedPatientId] = useState("PAC-001");
  const [selectedProfissional, setSelectedProfissional] = useState("Dra. Ana Lima");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [syncStatus, setSyncStatus] = useState<"saved" | "typing" | "saving">("saved");
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open || !isEditing) return;

    setSyncStatus("typing");
    const delayDebounceFn = setTimeout(async () => {
      setSyncStatus("saving");
      try {
        await saveDocument({
          data: {
            id: "TR-0420",
            patientId: selectedPatientId,
            documentContent: documentText,
            status: "pronto",
          },
        });
        setSyncStatus("saved");
      } catch (error) {
        setSyncStatus("typing");
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [documentText, selectedPatientId, selectedProfissional, open, isEditing]);

  // Filtro inteligente que ignora acentos e letras maiúsculas/minúsculas
  const pacientesFiltrados = PACIENTES_MOCK.filter((p) =>
    removerAcentos(p.nome).includes(removerAcentos(patientSearch))
  );

  if (!open) return null;

  async function handleFinalApprove() {
    setIsFinalizing(true);
    try {
      const response = await saveDocument({
        data: {
          id: "TR-0420",
          patientId: selectedPatientId,
          documentContent: documentText,
          status: "aprovado",
        },
      });

      if (response.success) {
        toast.success("Prontuário aprovado e arquivado no paciente!");
        
        // Limpa o estado e fecha o modal, mandando de volta para o Dashboard
        setTimeout(() => {
          setIsEditing(false);
          setIsFinalizing(false);
          onClose(); // Isso esconde o Modal e revela o Dashboard novamente
        }, 600);
      }
    } catch (error) {
      toast.error("Falha ao finalizar o documento.");
      setIsFinalizing(false);
    }
  }

  function handleSelectPatient(paciente: { id: string; nome: string }) {
    setSelectedPatientId(paciente.id);
    setPatientSearch(paciente.nome);
    setIsSearchOpen(false);
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isEditing ? "bg-[#E8DCCF]/80 p-0" : "bg-[#4B4037]/40 backdrop-blur-sm p-6"}`}>
      
      <div className={`bg-[#F5EFE8] flex flex-col overflow-hidden transition-all duration-300 shadow-2xl ${isEditing ? "w-full h-full rounded-none" : "border border-[#E8DCCF] rounded-2xl w-full max-w-4xl max-h-[95vh]"}`}>
        
        {/* CABEÇALHO */}
        <div className={`flex items-center justify-between px-6 border-b border-[#E8DCCF] bg-[#F5EFE8] shrink-0 ${isEditing ? "py-3" : "py-4"}`}>
          <div>
            <h2 className={`font-serif text-[#4B4037] ${isEditing ? "text-xl" : "text-2xl"}`}>
              {isEditing ? "Editor de Documento" : "Revisão de Prontuário"}
            </h2>
            {!isEditing && (
              <p className="text-xs text-[#A68A72] mt-1">
                Revise o conteúdo extraído da sessão. Clique em editar se necessário.
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isEditing && (
              <div className="flex items-center gap-2 text-xs font-medium mr-4">
                {syncStatus === "saved" && <span className="inline-flex items-center gap-1.5 text-emerald-700"><CloudCheck className="w-4 h-4" /> Salvo no servidor</span>}
                {syncStatus === "typing" && <span className="inline-flex items-center gap-1.5 text-amber-700"><CloudLightning className="w-4 h-4 animate-pulse" /> Editando...</span>}
                {syncStatus === "saving" && <span className="inline-flex items-center gap-1.5 text-blue-700"><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</span>}
              </div>
            )}

            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                isEditing 
                  ? "bg-[#E8DCCF] text-[#4B4037] border-[#A68A72]" 
                  : "bg-white text-[#4B4037] border-[#E8DCCF] hover:bg-[#E8DCCF]/50"
              }`}
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              {isEditing ? "Sair da Tela Cheia" : "Editar (Tela Cheia)"}
            </button>

            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#E8DCCF]/50 transition-colors">
              <X className="w-6 h-6 text-[#A68A72]" />
            </button>
          </div>
        </div>

        {/* BARRA DE FERRAMENTAS */}
        {isEditing && (
          <div className="bg-[#FCFBF9] border-b border-[#E8DCCF] px-6 py-2 flex items-center gap-1 shadow-sm shrink-0">
            <button className="p-2 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] font-bold text-sm"><Bold className="w-4 h-4" /></button>
            <button className="p-2 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037] italic text-sm"><Italic className="w-4 h-4" /></button>
            <div className="w-[1px] h-6 bg-[#E8DCCF] mx-3" />
            <button className="p-2 rounded bg-[#E8DCCF]/50 text-[#4B4037]"><AlignLeft className="w-4 h-4" /></button>
            <button className="p-2 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037]"><AlignCenter className="w-4 h-4" /></button>
            <button className="p-2 rounded hover:bg-[#E8DCCF]/50 text-[#4B4037]"><AlignRight className="w-4 h-4" /></button>
            <div className="w-[1px] h-6 bg-[#E8DCCF] mx-3" />
            <select className="bg-transparent border border-transparent hover:border-[#E8DCCF] rounded px-2 py-1 text-sm text-[#4B4037] outline-none">
              <option>Arial</option>
              <option>Times New Roman</option>
              <option>Calibri</option>
            </select>
            <select className="bg-transparent border border-transparent hover:border-[#E8DCCF] rounded px-2 py-1 text-sm text-[#4B4037] outline-none">
              <option>11</option>
              <option>12</option>
              <option>14</option>
            </select>
          </div>
        )}

        {/* ÁREA DA FOLHA */}
        <div className={`flex-1 overflow-y-auto flex justify-center ${isEditing ? "bg-[#DFD4C8] py-12" : "bg-[#E8DCCF]/20 py-8"} px-8`}>
          <div className={`bg-[#FCFBF9] shadow-xl border border-[#E8DCCF] w-full p-12 text-[#4B4037] flex flex-col transition-all duration-300 ${isEditing ? "max-w-4xl min-h-[1050px]" : "max-w-2xl min-h-[750px] rounded-sm"}`}>
            
            <div className="border-b border-[#E8DCCF] pb-4 mb-8 text-center select-none">
              <h3 className="font-serif text-3xl text-[#A68A72] tracking-wide">Clínica Gattini</h3>
              <p className="text-xs tracking-widest uppercase text-[#A68A72] mt-1">Psicologia Clínica</p>
            </div>

            {/* METADADOS (Paciente, Data, Profissional) */}
            <div className={`grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8 bg-[#F5EFE8]/40 p-4 rounded-lg border border-[#E8DCCF]/60 ${isEditing ? "max-w-2xl mx-auto w-full" : ""}`}>
              <div><span className="text-[#A68A72] font-medium">Paciente atual:</span> {patientSearch || "Não vinculado"}</div>
              <div><span className="text-[#A68A72] font-medium">Data de Emissão:</span> 28/05/2026</div>
              
              {/* Seleção do Profissional */}
              <div className="flex items-center">
                <span className="text-[#A68A72] font-medium mr-1.5">Profissional:</span> 
                {isEditing ? (
                  <select 
                    value={selectedProfissional}
                    onChange={(e) => setSelectedProfissional(e.target.value)}
                    className="bg-[#FCFBF9] border border-[#E8DCCF] rounded px-2 py-0.5 text-sm text-[#4B4037] outline-none focus:border-[#A68A72] transition-colors"
                  >
                    {PROFISSIONAIS_MOCK.map((prof) => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                ) : (
                  selectedProfissional
                )}
              </div>
              
              <div><span className="text-[#A68A72] font-medium">ID do Registro:</span> TR-0420</div>
            </div>

            <div className="flex-1 flex flex-col relative mt-4">
              {isEditing ? (
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Comece a digitar o prontuário..."
                  className="w-full flex-1 bg-transparent text-sm leading-loose font-sans text-[#4B4037] outline-none border-0 resize-none focus:ring-0 p-0"
                />
              ) : (
                <div className="w-full flex-1 text-[13px] leading-relaxed font-sans text-[#4B4037] whitespace-pre-wrap">
                  {documentText}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RODAPÉ: BUSCA E BOTÃO FINALIZAR */}
        <div className="border-t border-[#E8DCCF] px-8 py-5 flex items-center justify-between gap-4 bg-[#F5EFE8] shrink-0 overflow-visible z-10">
          
          <div className="flex-1 max-w-sm relative" ref={searchRef}>
            <label className="text-xs uppercase tracking-wider text-[#A68A72] font-medium mb-1.5 block">
              Vincular Paciente (Busca Dinâmica)
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A68A72]" />
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Busque sem se preocupar com acentos..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DCCF] rounded-lg text-sm text-[#4B4037] focus:outline-none focus:border-[#A68A72] shadow-sm transition-colors"
              />
              
              {isSearchOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-[#E8DCCF] rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="max-h-48 overflow-y-auto py-1">
                    {pacientesFiltrados.length > 0 ? (
                      pacientesFiltrados.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPatient(p)}
                          className="w-full text-left px-4 py-2 text-sm text-[#4B4037] hover:bg-[#E8DCCF]/50 flex items-center justify-between transition-colors"
                        >
                          <span>{p.nome}</span>
                          {selectedPatientId === p.id && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-[#A68A72] text-center">
                        Nenhum paciente encontrado.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleFinalApprove}
            disabled={isFinalizing || syncStatus === "saving" || !selectedPatientId}
            className="inline-flex items-center gap-2 bg-[#4B4037] text-[#FCFBF9] px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#4B4037]/90 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-5"
          >
            {isFinalizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileCheck className="w-5 h-5" />}
            {isFinalizing ? "Aprovando..." : "Aprovar e Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
}