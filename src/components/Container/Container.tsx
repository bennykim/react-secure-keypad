export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black/80">
      <div className="w-[500px] h-[500px] p-6">{children}</div>
    </div>
  );
};
