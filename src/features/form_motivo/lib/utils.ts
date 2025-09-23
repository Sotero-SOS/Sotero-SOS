export function normalizarHora(hhmm: string): string {
	if (!hhmm) return "";
	return /^\d{2}:\d{2}$/.test(hhmm) ? `${hhmm}:00` : hhmm;
}
