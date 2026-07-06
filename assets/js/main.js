new SplitType(".title", {
    types: "chars",
});

const chars = document.querySelectorAll(".title .char");
const bg = document.querySelector(".bg");

////////////////////////////////////////////////////

gsap.from(chars, {
    y: 200,
    opacity: 0,
    rotationX: 90,
    duration: 1.8,
    ease: "power4.out",

    stagger: {
        each: 0.03,
        from: "center",
    },
});

////////////////////////////////////////////////////

chars.forEach((char, i) => {
    gsap.to(char, {
        y: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-4, 4),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,

        ease: "sine.inOut",
    });
});

////////////////////////////////////////////////////

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
});

////////////////////////////////////////////////////

gsap.ticker.add(() => {
    gsap.set(bg, {
        x: mouseX * -80,
        y: mouseY * -80,
        scale: 1.15,
    });

    chars.forEach((char, index) => {
        const depth = index % 12;

        gsap.set(char, {
            x: mouseX * (depth * 6),
            y: mouseY * (depth * 6),
            rotationY: mouseX * 40,
            rotationX: -mouseY * 40,

            z: depth * 20,
            filter: `blur(${Math.abs(mouseX) * depth * 0.08}px)`,
        });
    });
});

//label
const split = new SplitType(".label", {
    types: "chars",
});

const allChars = gsap.utils.toArray(".char");

const label = document.querySelector(".label");

label.addEventListener("click", () => {
    allChars.forEach((char) => {
        gsap.killTweensOf(char);

        gsap.timeline({
            delay: Math.random() * 0.35,
        })

            .to(char, {
                y: -gsap.utils.random(25, 70),
                rotation: gsap.utils.random(-15, 15),
                scale: gsap.utils.random(1.07, 1.35),

                duration: gsap.utils.random(0.15, 0.3),
                ease: "power2.out",
            })

            .to(char, {
                y: 0,
                rotation: 0,
                scale: 1,

                duration: gsap.utils.random(0.45, 0.8),
                ease: "bounce.out",
            });
    });
});
