import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bg-main text-text-secondary py-24 px-[5%] border-t border-glass-border relative overflow-hidden">
      
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-screen h-screen bg-[radial-gradient(circle,rgba(212,20,121,0.05)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto max-w-[1300px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="flex flex-col gap-6">
          <Image src="/assets/LogoNoBgTextBlack.png" alt="Tidy Mimo Logo" width={130} height={35} className="logo-light object-contain" priority />
          <Image src="/assets/LogoNoBgTextWhite.png" alt="Tidy Mimo Logo" width={130} height={35} className="logo-dark object-contain" priority />
          <p className="text-sm leading-relaxed max-w-xs">
            Your Active Cleaning Partner. Delivering powerful solutions for households, industries, and commercial spaces.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-text-primary text-lg font-bold tracking-tight">Quick Links</h4>
          <nav className="flex flex-col gap-3">
            {['Home', 'About Us', 'Products', 'Contact'].map((link) => (
              <Link 
                key={link} 
                href={link === 'Home' ? '/' : link === 'About Us' ? '/about' : `/${link.toLowerCase()}`} 
                className="w-fit transition-colors hover:text-primary-pink text-sm font-medium"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-text-primary text-lg font-bold tracking-tight">Our Solutions</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>Household Care</li>
            <li>Industrial Laundry</li>
            <li>Car Care</li>
            <li>Hospitality</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-text-primary text-lg font-bold tracking-tight">Contact</h4>
          <p className="text-sm border-l-2 border-primary-pink/20 pl-4 leading-relaxed">
            Verdindies Biotech Industries<br />
            Kerala, India – PIN 676126
          </p>
          <a href="mailto:info@tidymimo.com" className="w-fit text-primary-pink font-bold hover:underline transition-all">
            info@tidymimo.com
          </a>
        </div>
      </div>

      <div className="container mx-auto max-w-[1300px] border-t border-glass-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-xs font-medium">
          &copy; {new Date().getFullYear()} Tidy Mimo. All rights reserved.
        </p>
        <p className="text-sm text-text-primary font-black tracking-tight italic">
          "Cleanliness is not just a routine."
        </p>
      </div>
    </footer>
  );
}
