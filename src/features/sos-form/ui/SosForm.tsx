export function SosForm() {
	return (
		<form onSubmit={onSubmit} className="card">
			<h2>Abrir Atendimento (SOS)</h2>
			<label>
				Motorista
				<select
					value={matricula}
					onChange={(e) =>
						setMatricula(
							e.target.value === "" ? "" : Number(e.target.value)
						)
					}
					required
				>
					<option value="">Selecione um motorista</option>
					{motoristasComVeiculo.map((m) => (
						<option key={m.matricula} value={m.matricula}>
							{m.nome}{" "}
							{m.veiculo
								? `- Veículo ${m.veiculo.cod_veiculo}`
								: ""}
						</option>
					))}
				</select>
			</label>
			<label>
				Motivo do SOS
				<select
					value={codMotivo}
					onChange={(e) =>
						setCodMotivo(
							e.target.value === "" ? "" : Number(e.target.value)
						)
					}
					required
				>
					<option value="">Selecione um motivo</option>
					{motivos.map((mo) => (
						<option key={mo.cod_motivo} value={mo.cod_motivo}>
							{mo.descricao}
						</option>
					))}
				</select>
			</label>
			<label>
				Local do SOS
				<input
					type="text"
					value={local}
					onChange={(e) => setLocal(e.target.value)}
					placeholder="Ex.: Av. Central, 123"
					required
				/>
			</label>
			<button disabled={carregando} type="submit">
				{carregando ? "Criando..." : "Abrir atendimento"}
			</button>
			{statusMsg && <p className="status">{statusMsg}</p>}
		</form>
	);
}
