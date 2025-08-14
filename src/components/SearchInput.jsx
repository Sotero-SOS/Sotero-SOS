import { FiSearch } from "react-icons/fi";

function SearchInput({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <FiSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

export default SearchInput;
