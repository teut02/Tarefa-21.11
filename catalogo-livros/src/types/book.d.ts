export interface Book {
  _id?: string; // Opcional (novos livros não têm ID)
  title: string;
  author: string;
  status: "Lido" | "Não lido"; // Valores exatos do enunciado
}