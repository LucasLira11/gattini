import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMockAuth } from "@/lib/prototype-state";
import { toast } from "sonner";
import { User, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useMockAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username.toLowerCase(), password)) {
      toast.success("Login efetuado com sucesso!");
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Usuário ou senha incorretos.");
    }
  };

  return (
    // Fundo com um leve gradiente radial para dar profundidade
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5EFE8] via-[#F5EFE8] to-[#E8DCCF]/50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos de fundo (Círculos desfocados para dar elegância) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#E8DCCF] rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#A68A72] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      {/* Cartão de Login */}
      <div className="bg-[#FCFBF9]/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_20px_50px_rgba(75,64,55,0.05)] max-w-md w-full border border-white/50 relative z-10">
        
        {/* Cabeçalho com a Logo Tratada */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="px-6">
          <img 
            src="/logo-gattini.png" 
            alt="Logo Clínica Gattini" 
            className="w-full h-full object-cover scale-125 drop-shadow-sm" 
          />
        </div>
          <h1 className="font-serif text-3xl text-[#4B4037] tracking-tight mb-1">
            Portal de Prontuários
          </h1>
        </div>
        
        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#A68A72] uppercase tracking-wider mb-2 ml-1">
              Nome de Usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#A68A72]/70" />
              </div>
              <input 
                type="text" 
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-[#E8DCCF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A68A72]/20 focus:border-[#A68A72] focus:bg-white transition-all text-[#4B4037] placeholder:text-[#A68A72]/50"
                placeholder="Ex: carlosgattini"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-[#A68A72] uppercase tracking-wider mb-2 ml-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#A68A72]/70" />
              </div>
              <input 
                type="password" 
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-[#E8DCCF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A68A72]/20 focus:border-[#A68A72] focus:bg-white transition-all text-[#4B4037] placeholder:text-[#A68A72]/50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full group bg-[#4B4037] text-white py-3.5 rounded-xl hover:bg-[#3A312A] hover:shadow-lg hover:shadow-[#4B4037]/20 transition-all flex items-center justify-center gap-2 font-medium">
              Acessar Sistema
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
        
        {/* Área de Dicas */}
        <div className="mt-8 pt-6 border-t border-[#E8DCCF]/50">
          <div className="text-[11px] text-[#A68A72] text-center bg-[#F5EFE8]/50 p-4 rounded-xl border border-[#E8DCCF]/30">
            <p className="font-semibold uppercase tracking-wider mb-1.5 text-[#4B4037]">Ambiente de Demonstração</p>
            <div className="space-y-1">
              <p>Usuário: <span className="font-mono bg-white px-1.5 py-0.5 rounded">juliagattini</span> | Senha: <span className="font-mono bg-white px-1.5 py-0.5 rounded">1234</span></p>
              <p>Admin: <span className="font-mono bg-white px-1.5 py-0.5 rounded">carlosgattini</span> | Senha: <span className="font-mono bg-white px-1.5 py-0.5 rounded">1234</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}