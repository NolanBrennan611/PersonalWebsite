import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useState } from "react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/download/resume").then(response => {
            if (response.ok) {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'NolanBrennanResume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                });
            } else {
                console.error("Failed to download resume");
            }
        });
    }

    const flipMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const scrollToSection = (className) => {
        const section = document.querySelector(`.${className}`);
        const elementPosition = section.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.pageYOffset;
        const viewportHeight = window.innerHeight;
        if(className === 'hero-section') {
            offsetPosition = elementPosition + window.pageYOffset - viewportHeight;
        }
    
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    });

    return (
        <nav className="navbar">
            <div className="navbar-container">
                { 
                    isMenuOpen ? 
                        <ul className="flex flex-row items-center text-xl gap-15 mx-10 cursor-pointer">
                            <li onClick={ flipMenu } className="drop-shadow border border-silver text-2xl col-center text-silver rounded-full w-10 h-10 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-black hover:from-40% hover:to-silver"><a>&lt;</a></li>
                            <li onClick={ () => scrollToSection('hero-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Home</a></li>
                            <li onClick={ () => scrollToSection('technical-skill-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Skills</a></li>
                            <li onClick={ () => scrollToSection('education-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Education</a></li>
                            <li onClick={ () => scrollToSection('footer-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Contact</a></li>
                        </ul>
                    :
                        <a className="w-12 h-12 drop-shadow cursor-pointer" onClick={ flipMenu }><img src="/images/Hamburger.png" alt="Menu"/></a>
                }
                <button onClick={ handleClick } className="text-2xl text-silver underline cursor-pointer p-2">Want my resume?</button>
            </div>
        </nav>
    )
}
export default NavBar
