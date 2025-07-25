import pool from "/lib/db";

export default async function showDieta(req, res) {
  // Habilita CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // OU use um domínio específico no lugar de "*"
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responde à requisição preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id_exercicio, segredo } = req.body;

  console.log(id_exercicio, segredo);

  if (!id_exercicio || !segredo) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    if (segredo !== process.env.SEGREDOTOKEN) {
      return res.status(403).json({ error: "Token não autorizado" });
    }

    const query = `SELECT * FROM treinos WHERE id = $1`;

    const result = await pool.query({
      text: query,
      values: [id_exercicio],
    });

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro na API showDieta:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
