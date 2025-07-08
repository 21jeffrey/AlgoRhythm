const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-violet-700 rounded-lg shadow-lg w-full max-w-2xl relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl font-bold cursor-pointer hover:text-red-300"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
