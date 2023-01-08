import Header from './header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* header */}
      <Header />
      {/* main contents */}
      <main>{children}</main>
    </>
  )
}