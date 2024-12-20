import { createPortal } from "react-dom";
import { useModalStore } from "../../store/modalStore";

export default function Modal() {
  const { isOpen, confirmText, cancelText, children, onClose, onConfirm } =
    useModalStore();
  if (!isOpen) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[500px] h-[261px] px-[100px] pt-20 pb-[60px] bg-white rounded-xl shadow flex-col justify-start items-center gap-[49px] inline-flex">
        <div className="self-stretch text-center font-semibold text-[#222222] text-xl uppercase leading-loose">
          {children}
        </div>
        <div className="self-stretch justify-start items-center gap-5 inline-flex">
          <button
            onClick={onConfirm}
            className="grow shrink basis-0 h-10 px-[25px] py-[5px] bg-[#fcc404] rounded-[46px] justify-center items-center gap-2.5 flex cursor-pointer text-center text-[#242424] text-base font-medium uppercase leading-relaxed"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="grow shrink basis-0 h-10 px-[25px] py-[5px] bg-[#c8c8c8] rounded-[26px] justify-center items-center gap-2.5 flex cursor-pointer text-center text-[#242424] text-base font-medium uppercase leading-relaxed"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
