function Input({ label, placeholder, type }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-10 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-700 placeholder:opacity-50 text-gray-700"
        />
      </div>
    </div>
  );
}

export default Input;
