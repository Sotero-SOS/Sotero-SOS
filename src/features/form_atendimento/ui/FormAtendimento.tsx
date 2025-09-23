import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/shared/api/supabaseClient";
import type { Driver, Motivo, Veiculo } from "@/entities";

function dataHoje(): string {
	const d = new Date();
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

function horaAgora(): string {
	const d = new Date();
	const hh = String(d.getHours()).padStart(2, "0");
	const mm = String(d.getMinutes()).padStart(2, "0");
	const ss = String(d.getSeconds()).padStart(2, "0");
	return `${hh}:${mm}:${ss}`;
}

type DriverExpandido = Driver & { veiculo?: Veiculo | null };

export default function FormAtendimento() {
	const [Drivers, setDrivers] = useState<Driver[]>([]);
	const [motivos, setMotivos] = useState<Motivo[]>([]);
	const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
	const [matricula, setMatricula] = useState<number | "">("");
	const [codMotivo, setCodMotivo] = useState<number | "">("");
	const [local, setLocal] = useState("");
	const [statusMsg, setStatusMsg] = useState<string | null>(null);
	const [carregando, setCarregando] = useState(false);

	useEffect(() => {
		const carregar = async () => {
			const [mRes, moRes, vRes] = await Promise.all([
				supabase
					.from("Driver")
					.select("*")
					.order("nome", { ascending: true }),
				supabase
					.from("motivo")
					.select("*")
					.order("descricao", { ascending: true }),
				supabase.from("veiculo").select("*"),
			]);
			if (mRes.error) console.error(mRes.error);
			if (moRes.error) console.error(moRes.error);
			if (vRes.error) console.error(vRes.error);
			setDrivers(mRes.data ?? []);
			setMotivos(moRes.data ?? []);
			setVeiculos(vRes.data ?? []);
		};
		carregar();
	}, []);

	const DriversComVeiculo: DriverExpandido[] = useMemo(() => {
		const mapV = new Map(veiculos.map((v) => [v.cod_veiculo, v]));
		return Drivers.map((m) => ({
			...m,
			veiculo: mapV.get(m.cod_veiculo ?? -1) ?? null,
		}));
	}, [Drivers, veiculos]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatusMsg(null);

		if (matricula === "" || codMotivo === "" || !local.trim()) {
			setStatusMsg("Informe Driver, motivo e local do SOS.");
			return;
		}

		// Determinar veículo do Driver selecionado
		const m = Drivers.find((mm) => mm.matricula === Number(matricula));
		const veic = m?.cod_veiculo;
		if (!veic) {
			setStatusMsg("O Driver selecionado não possui veículo associado.");
			return;
		}

		const payload = {
			auxiliar_de_trafego: null,
			fiscal: null,
			data: dataHoje(),
			inicio_sos: horaAgora(),
			chegada_na_garagem: null,
			final_sos: null,
			status: "Aberto",
			local: local.trim(),
			matricula_Driver: Number(matricula),
			cod_motivo: Number(codMotivo),
			cod_veiculo: veic,
		};

		setCarregando(true);
		const { error } = await supabase.from("atendimento").insert(payload);
		setCarregando(false);

		if (error) {
			setStatusMsg(`Erro ao salvar: ${error.message}`);
		} else {
			setStatusMsg("Atendimento criado com sucesso!");
			setMatricula("");
			setCodMotivo("");
			setLocal("");
		}
	};

	return (
		<form onSubmit={onSubmit} className="card">
			<h2>Abrir Atendimento (SOS)</h2>
			<label>
				Driver
				<select
					value={matricula}
					onChange={(e) =>
						setMatricula(
							e.target.value === "" ? "" : Number(e.target.value)
						)
					}
					required
				>
					<option value="">Selecione um Driver</option>
					{DriversComVeiculo.map((m) => (
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
