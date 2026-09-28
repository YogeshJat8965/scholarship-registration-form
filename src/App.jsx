import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Programmes from './components/Programmes'
import Scholarship from './components/Scholarship'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import useSmoothScroll from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Programmes />
        <Scholarship />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  )
}

export default App
