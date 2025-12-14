import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import FAB from './components/FAB';
import FloatingLines from './components/FloatingLines';

function App() {
  return (
    <div className="App relative">
      <LoadingScreen />
      
      {/* Single FloatingLines Background for All Sections */}
      <div className="fixed inset-0 w-full h-full z-0">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      
      <Navbar />
      
      <main className="relative z-10">
        <Welcome />
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      
      <Footer />
      <FAB />
    </div>
  );
}

export default App;
