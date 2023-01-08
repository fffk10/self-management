import Header from './header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* header */}
      <div className='h-full'>
        <Header />
        {/* main contents */}
        <main className='h-5/6'>{children}</main>
      </div>
    </>
  )
}