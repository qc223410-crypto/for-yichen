var lastFireworkTime = 0;
var activeFireworks = [];

window.addEventListener("DOMContentLoaded", function() {
    initFireworks();

    var introEl = document.getElementById("intro");
    var introText = document.getElementById("intro-text");
    var text = "我想对你说...";
    var index = 0;

    function typeChar() {
        if (index < text.length) {
            introText.textContent += text[index];
            index++;
            setTimeout(typeChar, 90);
        } else {
            setTimeout(function() {
                introEl.style.opacity = "0";
                introEl.style.transition = "opacity 0.8s ease";
                setTimeout(function() {
                    introEl.style.display = "none";
                    showMain();
                }, 800);
            }, 450);
        }
    }

    typeChar();
});

function showMain() {
    var main = document.getElementById("main");
    main.style.display = "block";
    startParticles();

    var greeting = document.querySelector(".greeting");
    setTimeout(function() { greeting.style.opacity = "1"; }, 120);
    setTimeout(startTypewriter, 520);
}

function startTypewriter() {
    var contentEl = document.getElementById("letter-content");
    var paragraphs = [
        "今天是我们在一起的第512天，算一算也快到520了呢。感觉这一年多经历了很多，我们都从高中生变成大学生了，也感觉一切照旧，啥都没变，我依旧深爱着你，你也依旧深爱着我，连架都没吵过，也是很幸福的啦。",
        "最近我们两个人也确实是都很忙，所以感觉少了一点交流，但是不打紧，毕竟真爱又怎么可能因为少说几句话就没了呢。毕竟我真的真的真的真的真的真的真的真的非常爱你！你给了我生活的勇气，给了我努力的动力，给了我每天的朝气，我非常想以后和你有一个幸福的家好吧。",
        "最后呢，我稀缺的时间和弱鸡的技术力相结合，构成了这个看着很廉价的网页，但我对你的爱可不廉价哦。",
        "我爱你，我的宝，永远。"
    ];
    var paraIndex = 0;
    var charIndex = 0;

    var cursor = document.createElement("span");
    cursor.className = "cursor-typing";
    contentEl.appendChild(cursor);

    function typeNext() {
        if (paraIndex >= paragraphs.length) {
            cursor.remove();
            showEnding();
            return;
        }

        var currentPara = paragraphs[paraIndex];

        if (charIndex < currentPara.length) {
            var char = currentPara[charIndex];
            var span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            span.style.opacity = "0";
            contentEl.insertBefore(span, cursor);

            setTimeout(function() {
                span.style.opacity = "1";
                span.style.transition = "opacity 0.18s ease";
            }, 10);

            charIndex++;

            var isPunctuation = "，。！？、；：".indexOf(char) !== -1;
            var delay = isPunctuation ? 160 : 45;
            setTimeout(typeNext, delay);
        } else {
            paraIndex++;
            charIndex = 0;
            if (paraIndex < paragraphs.length) {
                contentEl.insertBefore(document.createElement("br"), cursor);
                contentEl.insertBefore(document.createElement("br"), cursor);
            }
            setTimeout(typeNext, 140);
        }
    }

    typeNext();
}

function showEnding() {
    var endEl = document.getElementById("letter-end");
    endEl.style.display = "block";
    setTimeout(function() {
        endEl.style.opacity = "1";
        endEl.style.transform = "translateY(0)";
    }, 100);
}

function startParticles() {
    var canvas = document.getElementById("particles");
    var ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    var particles = [];

    function createParticle() {
        var size = Math.random() * 15 + 20;
        return {
            x: Math.random() * canvas.width,
            y: -size,
            size: size,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.3 + 0.7,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.005
        };
    }

    function drawHeart(x, y, size, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;

        var gradient = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.5);
        gradient.addColorStop(0, "#ffcce0");
        gradient.addColorStop(0.5, "#ff66a0");
        gradient.addColorStop(1, "#ff1493");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.35);
        ctx.bezierCurveTo(
            -size * 0.05, -size * 0.55,
            -size * 0.5, -size * 0.55,
            -size * 0.5, -size * 0.2
        );
        ctx.bezierCurveTo(
            -size * 0.5, size * 0.1,
            0, size * 0.35,
            0, size * 0.5
        );
        ctx.bezierCurveTo(
            0, size * 0.35,
            size * 0.5, size * 0.1,
            size * 0.5, -size * 0.2
        );
        ctx.bezierCurveTo(
            size * 0.5, -size * 0.55,
            size * 0.05, -size * 0.55,
            0, -size * 0.35
        );
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = "#ff6baf";
        ctx.shadowBlur = size * 0.3;
        ctx.fill();

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particles.length < 20) {
            particles.push(createParticle());
        }

        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            drawHeart(p.x, p.y, p.size, p.rotation, p.opacity);

            if (p.y > canvas.height + p.size) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

function initFireworks() {
    var fireworkCanvas = document.getElementById("fireworks");
    var fwCtx = fireworkCanvas.getContext("2d");

    function resize() {
        fireworkCanvas.width = window.innerWidth;
        fireworkCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    document.addEventListener("click", function(e) {
        var now = Date.now();
        if (now - lastFireworkTime < 500) return;
        lastFireworkTime = now;
        createFirework(e.clientX, e.clientY);
    });

    document.addEventListener("touchstart", function(e) {
        var now = Date.now();
        if (now - lastFireworkTime < 500) return;
        lastFireworkTime = now;
        var touch = e.touches[0];
        createFirework(touch.clientX, touch.clientY);
    });

    function createFirework(x, y) {
        var particleCount = 25;
        var particles = [];

        for (var i = 0; i < particleCount; i++) {
            var angle = (Math.PI * 2 / particleCount) * i;
            var speed = Math.random() * 4 + 2;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 4 + 2,
                hue: Math.random() * 40 + 320,
                life: 1
            });
        }

        activeFireworks.push({
            particles: particles,
            startTime: Date.now()
        });
    }

    function animateFireworks() {
        fwCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);

        for (var i = activeFireworks.length - 1; i >= 0; i--) {
            var fw = activeFireworks[i];
            var elapsed = Date.now() - fw.startTime;
            var progress = elapsed / 2000;

            if (progress >= 1) {
                activeFireworks.splice(i, 1);
                continue;
            }

            for (var j = 0; j < fw.particles.length; j++) {
                var p = fw.particles[j];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.life = 1 - progress;

                fwCtx.save();
                fwCtx.globalAlpha = p.life;
                fwCtx.fillStyle = "hsl(" + p.hue + ", 100%, 70%)";
                fwCtx.shadowColor = "hsl(" + p.hue + ", 100%, 60%)";
                fwCtx.shadowBlur = p.size * 2;
                fwCtx.beginPath();
                fwCtx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
                fwCtx.fill();
                fwCtx.restore();
            }
        }

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}
