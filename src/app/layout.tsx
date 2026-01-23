import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FamilyTalks - Calculadoras Interativas para Famílias',
    template: '%s | FamilyTalks',
  },
  description: 'Ferramentas baseadas em ciência para fortalecer vínculos familiares. Calcule o impacto do tempo de tela, descubra seu estilo parental e muito mais.',
  keywords: ['família', 'parentalidade', 'tempo de tela', 'calculadoras', 'bem-estar familiar'],
  authors: [{ name: 'FamilyTalks' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://familytalks.org',
    siteName: 'FamilyTalks',
    title: 'FamilyTalks - Calculadoras Interativas para Famílias',
    description: 'Ferramentas baseadas em ciência para fortalecer vínculos familiares.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FamilyTalks - Calculadoras Interativas para Famílias',
    description: 'Ferramentas baseadas em ciência para fortalecer vínculos familiares.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
