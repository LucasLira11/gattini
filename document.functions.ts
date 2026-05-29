import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const saveDocument = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string(),
      patientId: z.string(),
      documentContent: z.string(),
      status: z.string(),
    })
  )
  .handler(async ({ data }) => {
    // Lógica de persistência no servidor web (ex: Banco de dados, Webhook ou Log de auditoria)
    console.log("Sincronização recebida com sucesso no servidor:", data);
    
    // Simulação de tempo de resposta da rede
    await new Promise((resolve) => setTimeout(resolve, 600));

    return { 
      success: true, 
      message: "Documento atualizado e sincronizado no servidor web com sucesso." 
    };
  });