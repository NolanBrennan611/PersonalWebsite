import Wisp from "./components/Wisp.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger, ScrollSmoother, MotionPathPlugin } from "gsap/all";
import Hero from "./sections/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import TechnicalSkills from "./sections/TechnicalSkills.jsx";
import Footer from "./sections/Footer.jsx";

gsap.registerPlugin(SplitText, ScrollSmoother, ScrollTrigger, MotionPathPlugin);

const App = () => {
    useGSAP(() => {
        document.fonts.ready.then(() => {
            const openingSplit = new SplitText(".opening-title", {
                type: "chars"
            })

            const tl = gsap.timeline()

            tl
                .from(openingSplit.chars, {
                    yPercent: 100,
                    stagger: 0.02,
                    ease: "power1.inOut",
                    opacity: 0,
                    duration: 1,
                })
                .to(".wisp", {
                    duration: 1,
                    scale: 4,
                })
                .to(".opening-title", {
                    duration: 0.5,
                    opacity: 0,
                    clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
                }, "+=1.5")
                .to(".wisp", {
                    duration: 1,
                    scale: 0.25,
                }, "-=0.5")
                .to(".wisp", {
                    duration: 2,
                    scale: 3,
                    motionPath: {
                        path: [{x: 0, y: 0}, {x: -250, y: -50}, {x: -500, y: -200}],
                        fromCurrent: true,
                        autoRotate: false,
                    },
                    ease: "power1.inOut"
                })
                .to(".navbar", {
                    opacity: 1,
                    duration: 1,
                })
                .to(".hero-container", {
                    opacity: 1,
                    background: "linear-gradient(#000000, #242424)",
                    duration: 1,
                }, "-=1")
        })
    })

    return (
        <main>
            <div
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                className="abs-center opening-title"
            >
                Hello there!
            </div>
            <NavBar />
            <Wisp />
            <Hero />
            <TechnicalSkills />
            <Footer />
        </main>
    )
}
export default App
