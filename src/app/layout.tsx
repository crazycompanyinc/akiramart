import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AKIRAMART — La estantería de tu vecino otaku",
  description: "Figuras. Mangas. Merch. Ese thing que no sabías que existías pero que ahora necesitas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Noto+Sans+JP:wght@400;700&family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
