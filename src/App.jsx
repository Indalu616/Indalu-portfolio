import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import ScrollProgressBar from './components/common/ScrollProgressBar'
import SEOHead from './components/common/SEOHead'
import Loader from './components/common/Loader'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Skills from './sections/Skills/Skills'
import Experience from './sections/Experience/Experience'
import Footer from './sections/Footer/Footer'

// Below-the-fold sections are code-split so the initial bundle stays lean.
const Education = lazy(() => import('./sections/Education/Education'))
const Certifications = lazy(() => import('./sections/Certifications/Certifications'))
const Projects = lazy(() => import('./sections/Projects/Projects'))
const Research = lazy(() => import('./sections/Research/Research'))
const Achievements = lazy(() => import('./sections/Achievements/Achievements'))
const Testimonials = lazy(() => import('./sections/Testimonials/Testimonials'))
const Contact = lazy(() => import('./sections/Contact/Contact'))

function App() {
  return (
    <ThemeProvider>
      <SEOHead />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<Loader />}>
          <Education />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Research />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
