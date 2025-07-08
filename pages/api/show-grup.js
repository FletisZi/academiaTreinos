import pool from "/lib/db";

export default async function showDieta(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { segredo } = req.body;

  if (!segredo) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    if (segredo !== process.env.SEGREDOTOKEN) {
      return res.status(403).json({ error: "Token não autorizado" });
    }

    const query = `SELECT * FROM grupomuscular`;

    const result = await pool.query(`SELECT * FROM grupomuscular`);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro na API showDieta:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
