import React, { useState, useEffect } from "react";
import { FiSearch, FiAlertTriangle } from "react-icons/fi"; // Ícones da lupa e da sirene
import SearchInput from "../components/SearchInput";

function NovoAtendimento() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [codigoVeiculo, setCodigoVeiculo] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  useEffect(() => {
    // Define a data e hora uma vez quando o componente é montado
    const now = new Date();
    setCurrentDateTime(now.toLocaleString("pt-BR"));
  }, []);

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Título e Descrição */}
        <div className="flex items-center gap-4 mb-8">
          <FiAlertTriangle className="text-red-500" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Informações do Chamado
            </h1>
            <p className="text-gray-500">
              Registre os detalhes iniciais para criar uma nova ordem de
              serviço.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data e Hora
            </label>
            <input
              type="text"
              value={currentDateTime}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Placeholder para manter o layout de 2 colunas */}
          <div></div>

          <SearchInput
            label="Código do Veículo"
            placeholder="Digite o código"
            value={codigoVeiculo}
            onChange={(e) => setCodigoVeiculo(e.target.value)}
          />

          <SearchInput
            label="Localização"
            placeholder="Endereço ou ponto de referência"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default NovoAtendimento;
