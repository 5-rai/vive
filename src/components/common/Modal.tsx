import { createPortal } from "react-dom";
import { useModalStore } from "../../store/modalStore";

export default function Modal() {
  const { isOpen, confirmText, cancelText, children, onClose, onConfirm } =
    useModalStore();
  if (!isOpen) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="min-w-[500px] min-h-[261px] px-[100px] pt-20 pb-[60px] bg-white rounded-xl shadow-xl flex flex-col items-center gap-12">
        <div className="text-center font-semibold text-gray-22 text-xl leading-loose">
          {children}
        </div>
        <div className="self-stretch flex items-center gap-5">
          <button
            onClick={onConfirm}
            className="grow shrink basis-0 h-10 bg-primary rounded-full justify-center items-center flex text-gray-22 text-base font-medium"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="grow shrink basis-0 h-10 bg-gray-c8 rounded-full justify-center items-center flex text-gray-22 text-base font-medium"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
