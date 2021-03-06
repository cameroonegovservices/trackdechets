import axios from "axios";
import { prisma } from "../generated/prisma-client";

export const pdfHandler = async (req, res) => {
  const { id } = req.query;
  const form = await prisma.form({ id });

  if (form.status === "DRAFT") {
    return res
      .status(500)
      .send("Impossible de générer un PDF pour un brouillon.");
  }

  const appendix2Forms = await prisma.form({ id }).appendix2Forms();
  return axios
    .post(
      "http://td-pdf:3201/pdf",
      { ...form, appendix2Forms },
      { responseType: "stream" }
    )
    .then(response => response.data.pipe(res))
    .catch(err => {
      console.error(err);
      res.status(500).send("Erreur lors de la génération du PDF");
    });
};
