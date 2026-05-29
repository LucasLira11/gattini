import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMockAuth } from "@/lib/prototype-state";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center p-4">
      <div className="bg-[#FCFBF9] p-8 rounded-2xl shadow-xl max-w-md w-full border border-[#E8DCCF]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-[#4B4037]">Gattini</h1>
          <p className="text-[#A68A72] text-sm mt-2">Acesse sua conta para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#4B4037]">Usuário</label>
            <input 
              type="text" 
              className="w-full mt-1 px-4 py-2 border border-[#E8DCCF] rounded-lg focus:outline-none focus:border-[#A68A72]"
              placeholder="Ex: carlosgattini"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#4B4037]">Senha</label>
            <input 
              type="password" 
              className="w-full mt-1 px-4 py-2 border border-[#E8DCCF] rounded-lg focus:outline-none focus:border-[#A68A72]"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-[#4B4037] text-white py-2.5 rounded-lg hover:bg-[#4B4037]/90 transition">
            Entrar
          </button>
        </form>
        
        <div className="mt-6 text-xs text-[#A68A72] text-center bg-[#F5EFE8] p-3 rounded">
          <p><strong>Dica para teste:</strong></p>
          <p>juliagattini / 1234 (Usuário comum)</p>
          <p>carlosgattini / 1234 (Admin)</p>
        </div>
      </div>
    </div>
  );
}