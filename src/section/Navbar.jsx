import React, { useState, useEffect } from 'react'
import { navLinks } from '../constants'

const NavItems = ({ activeSection, onNavClick }) =>
{
    return (
        <ul className="nav-ul">
            {navLinks.map((item) => (
                <li
                    className={`nav-li sm:hover:bg-black/50 transition-all duration-300 ${activeSection === item.href.slice(1) ? 'text-white bg-black/30' : ''
                        }`}
                    key={item.id}
                >
                    <a
                        href={item.href}
                        onClick={() => onNavClick && onNavClick()}
                        className="nav-li_a"
                    >
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    // Track active section on scroll
    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const sections = navLinks.map(link => link.href.slice(1))
            const scrollPos = window.scrollY + 100

            for (const section of sections)
            {
                const element = document.getElementById(section)
                if (element)
                {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight)
                    {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = () =>
    {
        setIsOpen(false)
    }

    return (
        <header className='sticky top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm'>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-3 mx-auto c-space">
                    <a href="/" className='text-neutral-400 font-bold text-xl hover:text-white transition-colors'>
                        Manish Kushwaha
                    </a>
                    <button
                        onClick={() => setIsOpen(prev => !prev)}
                        className='text-neutral-400 hover:text-white sm:hidden flex transition-transform duration-300'
                        aria-label='toggle menu'
                    >
                        <img
                            src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'}
                            alt="toggle"
                            className={`w-5 h-5 lg:hidden transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                        />
                    </button>
                    <nav className='sm:flex hidden'>
                        <NavItems activeSection={activeSection} />
                    </nav>
                </div>
            </div>
            <div className={`nav-sidebar bg-black/95 backdrop-blur-sm transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className='p-4'>
                    <NavItems activeSection={activeSection} onNavClick={handleNavClick} />
                </nav>
            </div>
        </header>
    )
}
