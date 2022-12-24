
let socket = io();

const timer_container = document.querySelector('.timer_bar');
const timer_delay = document.querySelector('.timer_delay');
const stop_color_svg_red = document.getElementById('crash_line_top');

const text_element = document.querySelector('.text_element');
const div_coins_content_svg = document.querySelector('.width_rand');

const left_chart_nums = document.querySelector('.left_chart_nums');
const down_chart_nums = document.querySelector('.down_chart_nums');

const stop_game = document.getElementById('stop_game');
/* start game */

let timer_delay_nums = 0;
let timer_max_nums = 10;

let end_nums = 100;
let start_nums = 1;

let nums_fixed = null;

let stop_btn_nums_text = 0;

/* Press Number elements: Left Number and down Number start */

let left_press_number_min = 400;
let left_press_numbers = 4000;
let left_press_number_max = 4000;

let left_press_speed = 0.5;
let random_stop_nums = null;

left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;

/* Press Number elements: Left Number and down Number end */

let start_nums_speed = 0.001;
let stop_admin_game = false;

/* function javascript function */

function svg_start_game_nums() {
    // socket.emit('start_game_page', true);
    random_stop_nums = Math.random() * 50;
    socket.emit('random_start_numbers', random_stop_nums);

    stop_game.addEventListener('click', function () {
        if (stop_admin_game) {
            socket.emit('random_start_numbers', 0);
            random_stop_nums = 0;
        }
    });

    inner_svg_start_nums();
    function inner_svg_start_nums() {
        if (start_nums < random_stop_nums) {

            stop_admin_game = true;

            start_nums += start_nums_speed;
            socket.emit('start_nums', start_nums);
            socket.emit('random_start_numbers', random_stop_nums);
            nums_fixed = start_nums.toFixed(2);
            let svg_width_100 = (start_nums - 1) * 40;

            if (start_nums > 4) {
                start_nums_speed = 0.01;
            } else {
                start_nums_speed = 0.001;
            }

            if (svg_width_100 <= 100) {

                div_coins_content_svg.style.cssText = `width: ${svg_width_100}%`;

            }
            if (svg_width_100 > 80) {


                if (left_press_numbers >= left_press_number_min) {

                    left_press_numbers -= left_press_speed;

                    socket.emit('left_press_numbers', left_press_numbers);

                    left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;
                }
            }

            text_element.innerText = `${nums_fixed}x`;

            setTimeout(function () {
                inner_svg_start_nums();
            }, 1);

        } else {
            stop_admin_game = false;
            stop_btn_boolean = false;

            text_element.style.cssText = `color: red;`;
            stop_color_svg_red.setAttribute('fill', 'red');

            let random_color_istoria = Math.floor(Math.random() * 360);

            let li = document.createElement('li');
            li.classList.add("nums_line_bottom");
            li.innerText = text_element.innerText;
            let colors = `color: hsl(${random_color_istoria}, 100%, 50%); text-shadow: 0px 1px 9px hsl(${random_color_istoria}, 100%, 50%)`;
            li.style.cssText = colors

            down_chart_nums.appendChild(li);

            let array_story = [li.innerText, colors];

            socket.emit('stroy_number', array_story);

            let index_nums_line_bottom = document.querySelectorAll('.nums_line_bottom');
            if (index_nums_line_bottom.length > 9) {
                index_nums_line_bottom[0].remove();
            }

            setTimeout(function () {
                text_element.style.cssText = `color: #fff;`;

                inner_app_timer();
                timer_progress_inner_content();
                profile_index_boolean = true;

                left_press_numbers = left_press_number_max;
                left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;

                socket.emit('left_press_numbers', left_press_numbers);

            }, 2000);
        }
    }
}

inner_app_timer();
timer_progress_inner_content();
function inner_app_timer() {
    if (timer_max_nums > (timer_delay_nums + 0.1)) {
        timer_max_nums -= 0.1;

        socket.emit('timer_numbers', timer_max_nums);

        timer_delay.innerText = timer_max_nums.toFixed(1);
        timer_container.style.cssText = `display: flex; justify-content: center;`;
        text_element.style.cssText = `display: none;`;

        setTimeout(function () {
            inner_app_timer();
        }, 100);
    } else {
        setTimeout(function () {
            start_nums = 1;
            div_coins_content_svg.style.cssText = `width: ${this.start_nums}%`;

            timer_max_nums = 10;
            timer_delay.innerText = timer_max_nums;
            timer_container.style.cssText = `display: none`;
            stop_color_svg_red.setAttribute('fill', '#ff65fa85');

            text_element.style.cssText = `display: block;`;
            svg_start_game_nums();
        }, 1000);
    }
}

function timer_progress_inner_content() { }

