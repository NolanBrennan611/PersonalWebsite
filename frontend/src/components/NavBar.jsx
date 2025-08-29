import gsap from "gsap"
import { useGSAP } from "@gsap/react";

const NavBar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    });

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div>Hamburg</div>
                <a href="/resume" className="text-2xl text-silver underline">Want my resume?</a>
            </div>
        </nav>
    )
}
export default NavBar
