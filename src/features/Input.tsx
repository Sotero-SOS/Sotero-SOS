type InputProps = {
	label: string;
	placeholder?: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
};

function Input({
	label,
	placeholder,
	type,
	value,
	onChange,
	required,
}: InputProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">
				{label}
				<input
					className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500 text-gray-700"
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
				/>
			</label>
		</div>
	);
}

export default Input;
