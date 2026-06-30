import toast from "react-hot-toast";

const ShareModal = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link Copied to Clipboard!!");
      onClose();
    } catch (error) {
      toast.error("Failed to copy link.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-md p-6">
        <h2 className="text-xl font-semibold mb-5">Share Flashcard</h2>

        <div className="border rounded-lg p-3 bg-gray-50 break-all">{link}</div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Copy
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
