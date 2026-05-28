import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Gattini" },
      { name: "description", content: "Acesso ao sistema clínico Gattini." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Acesso autorizado");
      navigate({ to: "/dashboard" });
    }, 900);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FCFBF9] px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8DCCF]/40 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#F5EFE8] border border-[#E8DCCF] rounded-2xl p-10 shadow-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-6xl text-[#A68A72] tracking-wide">Gattini</h1>
          <p className="mt-2 text-sm text-[#A68A72] font-light tracking-widest uppercase">Clínica de Psicologia</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#A68A72]">E-mail Profissional</label>
            <div className="mt-2 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A68A72]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="profissional@gattini.com"
                className="w-full pl-10 pr-3 py-3 bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg text-[#4B4037] placeholder:text-[#A68A72]/60 focus:outline-none focus:border-[#A68A72] transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#A68A72]">Senha</label>
            <div className="mt-2 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A68A72]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 bg-[#FCFBF9] border border-[#E8DCCF] rounded-lg text-[#4B4037] placeholder:text-[#A68A72]/60 focus:outline-none focus:border-[#A68A72] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-[#4B4037] text-[#FCFBF9] rounded-lg font-medium tracking-wide hover:bg-[#4B4037]/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Acessando...</> : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#A68A72]">© 2026 Gattini · Ambiente seguro LGPD</p>
      </div>
    </div>
  );
}
