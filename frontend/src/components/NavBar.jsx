import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const NavBar = ({ scrollToSection }) => {
    const hamburgerMenuRef = useRef(null);
    const closeMenuRef = useRef(null);
    const menuListRef = useRef(null);
    const navbarRef = useRef(null);
    const navItemsRef = useRef([]);

    const isTablet = useMediaQuery({
        query: "(max-width: 768px)",
    })

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
                if(isTablet){
                    navbarRef.current.classList.add("navbar-open");
                }
                navItemTween.play();
            } else {
                navItemTween.reverse();
                if(isTablet){
                    navbarRef.current.classList.remove("navbar-open");
                }
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
            x: 50,
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

        navItemTween.to(menuListRef.current.children, {
            opacity: 1,
            x: 0,
            stagger: 0.1
        })

        hamburgerMenuRef.current.addEventListener('click', flipAnimation)
        closeMenuRef.current.addEventListener('click', flipAnimation)
        navItemsRef.current.forEach((item) => {
            item.addEventListener('click', flipAnimation)
        })
    });

    return (
        <nav className="navbar" ref={ navbarRef }>
            <div className="navbar-container">
                <a ref={ hamburgerMenuRef } className="menu-button"><img className="scale-100 hover:scale-125 transition-transform duration-100" src="/images/Hamburger.png" alt="Menu"/></a>
                <ul ref={ menuListRef } className="nav-items">
                    <li ref={ closeMenuRef } className="drop-shadow border border-silver text-2xl col-center text-silver rounded-full w-10 h-10"><a>&lt;</a></li>
                    <li ref={ (el) => navItemsRef.current[0] = el } onClick={ () => { scrollToSection('hero-section'); }}><a className="drop-shadow text-silver hover:text-shadow-silver-md">Home</a></li>
                    <li ref={ (el) => navItemsRef.current[1] = el } onClick={ () => { scrollToSection('technical-skill-section'); navbarRef.current.classList.remove("navbar-open") }}><a className="drop-shadow text-silver hover:text-shadow-silver-md">Skills</a></li>
                    <Link to="/projects" className="drop-shadow text-silver hover:text-shadow-silver-md">Projects</Link>
                    <li ref={ (el) => navItemsRef.current[2] = el } onClick={ () => { scrollToSection('education-section'); navbarRef.current.classList.remove("navbar-open") }}><a className="drop-shadow text-silver hover:text-shadow-silver-md">Education</a></li>
                    <li ref={ (el) => navItemsRef.current[3] = el } onClick={ () => { scrollToSection('footer-section'); navbarRef.current.classList.remove("navbar-open") }}><a className="drop-shadow text-silver hover:text-shadow-silver-md">Contact</a></li>
                </ul>
                <button onClick={ handleClick }  className="resume-button">Want my resume?</button>
            </div>
        </nav>
    )
}
export default NavBar
