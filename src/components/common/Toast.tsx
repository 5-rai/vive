interface ToastProps {
  isVisible: boolean;
  message: string;
}

export function Toast({ isVisible, message }: ToastProps) {
    if (!isVisible) return null; // Toast가 보이지 않을 때 렌더링하지 않음
  return (
    <div className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 w-[500px] h-[104px] bg-white rounded-xl shadow flex justify-center items-center z-50">
      <div className="text-center text-[#222222] text-xl font-semibold uppercase leading-loose">
        {message}
      </div>
    </div>
  );
}
