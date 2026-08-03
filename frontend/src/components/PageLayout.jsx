import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageTransition } from './PageTransition'

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <PageTransition>
        <main id="main-content">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  )
}
