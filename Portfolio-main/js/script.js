$(document).ready(function () {

    // function of the back to top button

    if ($(window).scrollTop() > 500) {
        $('.back-to-top').show();
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $('.back-to-top').show();
        } else {
            $('.back-to-top').hide();
        }
    });

    $('.back-to-top').click(function () {
        $('html').animate({ scrollTop: 0 }, 'slow');
    });

    $('.back-to-top').hover(function () {
        $('.upper').animate({ "top": "-38%" }, 'fast');
        $('.lower').animate({ "top": "31%" }, 'fast');
    }, function () {
        $('.upper').animate({ "top": "31%" }, 'fast');
        $('.lower').animate({ "top": "100%" }, 'fast');
    });

    // circular progress bar

    let canvas1 = document.getElementById('canvas1');
    let context1 = canvas1.getContext('2d');

    let canvas2 = document.getElementById('canvas2');
    let context2 = canvas2.getContext('2d');

    let canvas3 = document.getElementById('canvas3');
    let context3 = canvas3.getContext('2d');

    let canvas4 = document.getElementById('canvas4');
    let context4 = canvas4.getContext('2d');

    let al1 = 0;
    let al2 = 0;
    let al3 = 0;
    let al4 = 0;
    let start = 4.72;
    var cw = context1.canvas.width / 2;
    var ch = context1.canvas.height / 2;
    let diff;

    let executed = false;

    function progressBar1() {
        if (al1 >= 51) {
            clearTimeout(bar1);
            return;
        }
        diff = (al1 / 100) * Math.PI * 2;
        context1.clearRect(0, 0, 140, 140);
        context1.beginPath();
        context1.arc(cw, ch, 85, 0, 2 * Math.PI, false);
        context1.fill();
        context1.strokeStyle = '#FFF';
        context1.stroke();
        context1.fillStyle = '#110c11';
        context1.strokeStyle = '#ff771c';
        context1.lineWidth = 7;
        context1.beginPath();
        context1.arc(cw, ch, 85, start, diff + start, false);
        context1.stroke();
        canvas1.nextElementSibling.innerText = al1;
        al1++;
    }

    function progressBar2() {
        if (al2 >= 71) {
            clearTimeout(bar2);
            return;
        }
        diff = (al2 / 100) * Math.PI * 2;
        context2.clearRect(0, 0, 140, 140);
        context2.beginPath();
        context2.arc(cw, ch, 75, 0, 2 * Math.PI, false);
        context2.fill();
        context2.strokeStyle = '#FFF';
        context2.stroke();
        context2.fillStyle = '#110c11';
        context2.strokeStyle = '#ff771c';
        context2.lineWidth = 7;
        context2.beginPath();
        context2.arc(cw, ch, 75, start, diff + start, false);
        context2.stroke();
        canvas2.nextElementSibling.innerText = al2;
        al2++;
    }

    function progressBar3() {
        if (al3 >= 51) {
            clearTimeout(bar3);
            return;
        }
        diff = (al3 / 100) * Math.PI * 2;
        context3.clearRect(0, 0, 140, 140);
        context3.beginPath();
        context3.arc(cw, ch, 85, 0, 2 * Math.PI, false);
        context3.fill();
        context3.strokeStyle = '#FFF';
        context3.stroke();
        context3.fillStyle = '#110c11';
        context3.strokeStyle = '#ff771c';
        context3.lineWidth = 7;
        context3.beginPath();
        context3.arc(cw, ch, 85, start, diff + start, false);
        context3.stroke();
        canvas3.nextElementSibling.innerText = al3;
        al3++;
    }

    function progressBar4() {
        if (al4 >= 71) {
            clearTimeout(bar4);
            return;
        }
        diff = (al4 / 100) * Math.PI * 2;
        context4.clearRect(0, 0, 140, 140);
        context4.beginPath();
        context4.arc(cw, ch, 70, 0, 2 * Math.PI, false);
        context4.fill();
        context4.strokeStyle = '#FFF';
        context4.stroke();
        context4.fillStyle = '#110c11';
        context4.strokeStyle = '#ff771c';
        context4.lineWidth = 7;
        context4.beginPath();
        context4.arc(cw, ch, 70, start, diff + start, false);
        context4.stroke();
        canvas4.nextElementSibling.innerText = al4;
        al4++;
    }



    function isInViewport(node) {
        var rect = node.getBoundingClientRect();
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    let bar1;
    let bar2;
    let bar3;
    let bar4;

    $('#canvas1').each(function () {
        var visible = isInViewport(this);
        if (visible && !executed) {
            executed = true;
            bar1 = setInterval(progressBar1, 15);
            bar2 = setInterval(progressBar2, 15);
            bar3 = setInterval(progressBar3, 15);
            bar4 = setInterval(progressBar4, 15);
        }
    });

    $(document).scroll(function () {

        $('#canvas1').each(function () {
            var visible = isInViewport(this);
            if (visible && !executed) {
                executed = true;
                bar1 = setInterval(progressBar1, 15);
                bar2 = setInterval(progressBar2, 15);
                bar3 = setInterval(progressBar3, 15);
                bar4 = setInterval(progressBar4, 15);
            }
        });
    });

    // owl carousel

    $('.owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        merge: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    let owl = $('.owl-carousel');
    // Go to the next item
    $('.owl-next').click(function () {
        owl.trigger('next.owl.carousel');
    });

    // Go to the previous item
    $('.owl-prev').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    // navbar underline

    $('.nav-link').each(function () {
        $(this).click(function () {
            let section = $(this).text();
            $('section').each(function () {
                let sId = $(this).attr('id');
                if (sId.toLowerCase() == section.toLowerCase()) {
                    window.scrollTo(0, $(this).offset().top + 1);
                }
            });
        });
    });

    let $el,
        leftPos,
        newWidth,
        $mainNav = $(".navbar-nav");

    $mainNav.append("<li id='magic-line'></li>");
    let $magicLine = $("#magic-line");

    $magicLine
        .width($(".active").width())
        .css("left", $(".active a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());



    $(document).scroll(function () {
        let st = $(this).scrollTop();

        $('section').each(function () {
            if (st >= $(this).offset().top && st <= $(this).offset().top + $(this).height()) {
                let id = $(this).attr('id');
                $('a[value="#' + id + '"]').parent().addClass('active');
            } else {
                let id = $(this).attr('id');
                $('a[value="#' + id + '"]').parent().removeClass('active');
            }
        });

        let navItem = document.querySelector('.navbar-nav .active')
        if (navItem == null) {
            let id = $('#contact').attr('id');
            $('a[value="#' + id + '"]').parent().addClass('active');
        }

    });

    $(document).scroll(function () {
        $('.nav-link').each(function () {
            if ($(this).parent().hasClass('active')) {
                $el = $(this);
                leftPos = $el.position().left;
                newWidth = $el.parent().width();
                $magicLine.stop().animate({
                    left: leftPos,
                    width: newWidth
                }, 'fast');
            }
        });
    });

    let st = $(this).scrollTop();

    $('section').each(function () {
        if (st >= $(this).offset().top && st <= $(this).offset().top + $(this).height()) {
            let id = $(this).attr('id');
            $('a[value="#' + id + '"]').parent().addClass('active');
        } else {
            let id = $(this).attr('id');
            $('a[value="#' + id + '"]').parent().removeClass('active');
        }
    });

    let navItem = document.querySelector('.navbar-nav .active')
    if (navItem == null) {
        let id = $('#contact').attr('id');
        $('a[value="#' + id + '"]').parent().addClass('active');
    }

    $('.nav-link').each(function () {
        if ($(this).parent().hasClass('active')) {
            $el = $(this);
            leftPos = $el.position().left;
            newWidth = $el.parent().width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            }, 'fast');
        }
    });


    // animations

    var tl = gsap.timeline();
    tl.from(".letter", { duration: 1, opacity: 0, y: "random(-200, 200)", stagger: 0.15 });
    tl.to(".letter", { duration: 1, rotation: 360, stagger: 0.15 }, "-=3.5");

    $(".letter").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("rubberBand");
    });

    $(".letter").hover(function () {
        $(this).addClass("rubberBand");
    });


    if (!window.matchMedia("(max-width: 1500px)").matches) {
        gsap.from(".sal", {
            scrollTrigger: {
                trigger: ".sal",
                start: "top bottom"
            },
            opacity: 0,
            x: -200,
            duration: 1,
            ease: "power3",
            stagger: 0.25
        });

        gsap.from(".sar", {
            scrollTrigger: {
                trigger: ".sar",
                start: "top bottom"
            },
            opacity: 0,
            x: 200,
            duration: 1,
            ease: "power3",
            stagger: 0.25
        });
    }

    gsap.from(".skill-box", {
        scrollTrigger: {
            trigger: ".skill-box",
            start: "top bottom"
        },
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "power3",
        stagger: 0.25
    });

    // success message
/*
    $('.send-message').on('submit', function (e) {
        e.preventDefault();
    });

    function successFadeOut(){
        $('.success-card').fadeOut();
    }

    document.querySelector("#send_message").onclick = function(){
        let name = document.querySelector("#name").value
        let surname = document.querySelector("#surname").value
		let email = document.querySelector("#email").value
		let message = document.querySelector("#message").value
        if(name == "" || surname == "" || email == "" || message == ""){
            return;
        }
		Email.send({
			Host : "smtp.elasticemail.com",
			Username : "faridaliyev31@gmail.com",
			Password : "C75617E2859FD642D7301C43F92C9695EC08",
			To : 'aliyevazer32@gmail.com',
			From : 'faridaliyev31@gmail.com',
			Subject : "New message from website by: "+name+" "+surname,
			Body : message+" My Email: "+email
		}).then(
          message => {
            $('.success-card').fadeIn()
            setTimeout(successFadeOut,3000)
            document.querySelector("#name").value=""
            document.querySelector("#surname").value=""
            document.querySelector("#email").value=""
            document.querySelector("#message").value=""
        });
	}
});*/});