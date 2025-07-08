import pool from "/lib/db";

export default async function showDieta(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id_exercicio, segredo } = req.body;

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
