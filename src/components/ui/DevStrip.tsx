const DevStrip = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-2 px-5 text-xs text-gray-500 text-center z-[1000] backdrop-blur-md"
      style={{ fontSize: 13 }}
    >
      <div className="flex items-center justify-center gap-2">
        <span
          className="inline-block w-2 h-2 bg-green-500 rounded-full opacity-80 animate-blink-glow"
        />
        <span className="font-normal">Site under development — Some features may be updated frequently</span>
      </div>
    </div>
  );
};

export default DevStrip; 