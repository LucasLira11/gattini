import { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onOrganized: () => void;
}

export function NewRecordModal({ open, onClose, onOrganized }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function handleOrganize() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOrganized();
    }, 1400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4B4037]/40 backdrop-blur-sm p-6">
      <div className="bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DCCF]">
          <div>
            <h2 className="font-serif text-2xl text-[#4B4037]">Novo Prontuário</h2>
            <p className="text-xs text-[#A68A72]">Insira o texto bruto da sessão para organização automática.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#E8DCCF]/50">
            <X className="w-5 h-5 text-[#A68A72]" />
          </button>
        </div>

        <div className="p-6">
          <label className="text-xs uppercase tracking-wider text-[#A68A72]">Inserção Manual</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Cole ou digite as anotações livres da sessão. A IA estruturará no formato SOAP."
            className="mt-2 w-full bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg p-4 text-sm text-[#4B4037] placeholder:text-[#A68A72]/60 focus:outline-none focus:border-[#A68A72] resize-none"
          />
        </div>

        <div className="px-6 pb-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-[#4B4037] hover:bg-[#E8DCCF]/50 rounded-lg transition">
            Cancelar
          </button>
          <button
            onClick={handleOrganize}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#4B4037] text-[#FCFBF9] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4B4037]/90 transition disabled:opacity-60"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Organizando...</> : <><Sparkles className="w-4 h-4" /> Organizar com IA (SOAP)</>}
          </button>
        </div>
      </div>
    </div>
  );
}
