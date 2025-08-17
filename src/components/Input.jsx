function Input({ label, placeholder, type, value, onChange, onKeyDown }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500 text-gray-700"
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}

export default Input;
