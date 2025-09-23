export type Veiculo = {
	cod_veiculo: number;
	categoria: number | null;
	situacao: string | null;
};

export type Categoria = {
	id: number;
	nome: string;
};
