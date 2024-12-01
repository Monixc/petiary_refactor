export function LoadingText() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>AI가 일기를 작성중입니다</span>
      <span className="inline-flex gap-1">
        <span className="animate-bounce delay-100">.</span>
        <span className="animate-bounce delay-200">.</span>
        <span className="animate-bounce delay-300">.</span>
      </span>
    </div>
  );
}
