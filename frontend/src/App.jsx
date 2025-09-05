import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger, MotionPathPlugin } from "gsap/all";
import Hero from "./sections/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import TechnicalSkills from "./sections/TechnicalSkills.jsx";
import Footer from "./sections/Footer.jsx";
import Education from "./sections/Education.jsx";
import Lenis from "@studio-freight/lenis";
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Projects from './sections/Projects';
import ProjectSpecifics from './components/ProjectSpecifics';
import ScrollToTop from "./components/ScrollToTop.jsx";

gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

const App = () => {
    const [ ws, setWs ] = useState(null);

    useEffect(() => {
        if (ws?.readyState === WebSocket.OPEN) return;

        const serverUrl = import.meta.env.VITE_APP_BACKEND_WEBSOCKET_URL;
        const websocket = new WebSocket(serverUrl);
        websocket.onopen = () => console.log("WebSocket connection opened");
        websocket.onclose = () => console.log("WebSocket connection closed");
        websocket.onerror = (error) => console.error("WebSocket error:", error);

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Global WebSocket message: ", data);
        };

        setWs(websocket);

        // if unmounted, close the socket
        return () => {
            console.log("WebSocket connection cleaned up");
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 100);
            });
        };
    }, []);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            gsap.set(".long-arrow", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
            });

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
                    background: "linear-gradient(#000000, #202020)",
                    duration: 1,
                }, "-=1")
                .to(".long-arrow", {
                    duration: 1,
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                })
        })
    })

    const scrollToSection = (className) => {
        const section = document.querySelector(`.${className}`);
        const elementPosition = section.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.scrollY;
        const viewportHeight = window.innerHeight;
        if(className === 'hero-section') {
            offsetPosition = elementPosition + window.scrollY - viewportHeight;
        }

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    const Home = ({ ws }) => (
        <main>
            <div
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                className="abs-center opening-title"
            >
                Hello there!
            </div>
            <NavBar scrollToSection={ scrollToSection } />
            <Hero ws={ws} />
            <TechnicalSkills />
            <Education />
            <Footer scrollToSection={ scrollToSection } />
        </main>
    );

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home ws={ws} />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectSpecifics />} />
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
