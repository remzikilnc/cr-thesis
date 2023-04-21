import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

function ParticlesEffect ({color = '#fc3404'}){
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#1a1a1a",
                    },
                },
                fpsLimit: 30,
                particles: {
                    number: {value: 20, density: {enable: !0, value_area: 800}},
                    color: {value: [
                            "#fff",
                            color,
                        ]},
                    shape: {
                        type: "circle",
                        polygon: {nb_sides: 5},
                        image: {src: "", width: 40, height: 40}
                    },
                    opacity: {value: 0.6, random: !1, anim: {enable: !1, speed: 2, opacity_min: 0, sync: !1}},
                    size: {value: 10, random: !0, anim: {enable: !1, speed: 20, size_min: 0, sync: !1}},
                    line_linked: {enable: !0, distance: 100, color: "#fff", opacity: 1, width: 1},
                    move: {
                        enable: !0,
                        speed: 1,
                        direction: "none",
                        random: !1,
                        straight: !1,
                        out_mode: "out",
                        bounce: !1,
                        attract: {enable: !1, rotateX: 3e3, rotateY: 3e3}
                    },
                    array: []
                },
                tmp: {}
            }}
        />
    );
}
export default ParticlesEffect
