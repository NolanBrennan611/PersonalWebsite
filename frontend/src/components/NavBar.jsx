import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import {useRef, useState} from "react";

const NavBar = () => {
    const hamburgerMenuRef = useRef(null);
    const closeMenuRef = useRef(null);
    const menuListRef = useRef(null);

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
        const navBlurTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navBlurTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });

        const navItemTween = gsap.timeline({
            paused: true,
            reversed: true,
        })

        const flipAnimation = () => {
            if(navItemTween.reversed()) {
                navItemTween.play();
            } else {
                navItemTween.reverse();
            }
        }

        gsap.set(hamburgerMenuRef.current, {
            opacity: 1,
            scale: 1,
            visibility: "visible",
        })

        gsap.set(menuListRef.current, {
            opacity: 0,
            visibility: "hidden"
        });

        gsap.set(menuListRef.current.children, {
            opacity: 0,
            x: 50
        });

        navItemTween
            .to(hamburgerMenuRef.current, {
                opacity: 0,
                scale: 0.8,
                visibility: "none"
            })
            .to(menuListRef.current, {
                opacity: 1,
                visibility: "visible",
            })
            .to(menuListRef.current.children, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
            })

        hamburgerMenuRef.current.addEventListener('click', flipAnimation)
        closeMenuRef.current.addEventListener('click', flipAnimation)
    });

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a ref={ hamburgerMenuRef } className="ml-8 menu-button w-12 h-12 drop-shadow cursor-pointer"><img className="scale-100 hover:scale-125 transition-transform duration-100" src="/images/Hamburger.png" alt="Menu"/></a>
                <ul ref={ menuListRef } className="absolute flex flex-row items-center text-xl gap-15 mx-10 cursor-pointer">
                    <li ref={ closeMenuRef } className="drop-shadow border border-silver text-2xl col-center text-silver rounded-full w-10 h-10 transition-colors duration-300 ease-in-out hover:bg-gradient-to-br hover:from-black hover:from-40% hover:to-silver"><a>&lt;</a></li>
                    <li onClick={ () => scrollToSection('hero-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Home</a></li>
                    <li onClick={ () => scrollToSection('technical-skill-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Skills</a></li>
                    <li onClick={ () => scrollToSection('education-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Education</a></li>
                    <li onClick={ () => scrollToSection('footer-section') }><a className="drop-shadow text-silver hover:text-shadow-silver-md">Contact</a></li>
                </ul>
                <button onClick={ handleClick }  className="text-2xl text-silver underline cursor-pointer p-2 hover:text-shadow-silver-lg">Want my resume?</button>
            </div>
        </nav>
    )
}
export default NavBar
