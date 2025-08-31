import gsap from "gsap"
import { useGSAP } from "@gsap/react";

const NavBar = () => {
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
                <button onClick={ handleClick } className="text-2xl text-silver underline cursor-pointer p-2">Want my resume?</button>
            </div>
        </nav>
    )
}
export default NavBar
