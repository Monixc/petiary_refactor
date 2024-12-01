export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-md min-h-screen bg-background shadow-[0_0_15px_rgba(0,0,0,0.1)] relative">
      <main>{children}</main>
    </div>
  );
}
