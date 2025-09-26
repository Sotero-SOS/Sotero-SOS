function ForgotPasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Recuperar Senha</h2>
        <p className="mb-4">
          Digite seu e-mail para receber o link de recuperação.
        </p>
        <input
          type="email"
          placeholder="seu.email@exemplo.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
