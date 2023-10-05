import '../globals.css'

export const metadata = {
  title: 'App Isobus IoT',
  description: 'Conectando o Campo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-green-800">{children}</body>
    </html>
  )
}
