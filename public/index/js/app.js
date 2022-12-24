
let socket = io();

const timer_container = document.querySelector('.timer_bar');
const timer_progress_inner = document.querySelector('.time_progress');

const avto_stop_input = document.querySelector('.avto_stop');
const timer_delay = document.querySelector('.timer_delay');

const stop_color_svg_red = document.querySelector('#crash_line_top');

const site_coins_summ = document.querySelector('.usd_text_element');
const profile_coins_summ = document.querySelector('.profile_number_usd');
const input_coins_summ = document.querySelector('.inp_nums_usd');

const start_button = document.querySelector('.start_btn');
const stop_button = document.querySelector('.stop_btn');

const text_element = document.querySelector('.text_element');
const div_coins_content_svg = document.querySelector('.width_rand');

const numbers_buttons_element = document.querySelectorAll('.numbers_buttons_element');

/*  */
const left_chart_nums = document.querySelector('.left_chart_nums');
const down_chart_nums = document.querySelector('.down_chart_nums');
/* start game */

let GAME = false;

let auto_stop_numbs_objs = 0;
let min_auto_stop_numbs = 1;
let max_auto_stop_numbs = 8;

let timer_delay_nums = 0;
let timer_max_nums = 0;

let end_nums = 100;
let start_nums = 1;

let disable_btn = true;
let nums_fixed = null;

let stop_btn_boolean = false;
let stop_btn_nums_text = 0;

let site_coins_number = 3000;
let max_profile_coins_number = 100;
let profile_coins_number = max_profile_coins_number;

site_coins_summ.innerText = site_coins_number;
profile_coins_summ.innerText = profile_coins_number;

let stop_end_numbers = 0;
let input_coins_value = 0;
let text_element_top_nums = 0;
let result_timer_num = 0;

let profile_index_boolean = true;

/* Press Number elements: Left Number and down Number start */

let left_press_number_min = 400;
let left_press_numbers = 4000;
let left_press_number_max = 4000;

let left_press_speed = 0.5;
let random_stop_nums = null;

left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;

/* Press Number elements: Left Number and down Number end */

let start_nums_speed = 0.001;

/* function javascript function */

socket.emit('timer_numbers', 0);

start_button.onclick = function () {
    let stop_USD_input = Number(input_coins_summ.value);
    if (disable_btn) {
        if (input_coins_summ.value !== "") {
            start_button.classList.add('active_btn_click_disabled');
            if (stop_USD_input <= profile_coins_number) {

                disable_btn = false;
                input_coins_value = Number(input_coins_summ.value);
                GAME = true;

            } else {
                profile_coins_summ.style.cssText = `color: red;`;
                setTimeout(() => {
                    profile_coins_summ.style.cssText = `color: #fff;`;
                    setTimeout(() => {
                        profile_coins_summ.style.cssText = `color: red;`;
                        setTimeout(() => {
                            profile_coins_summ.style.cssText = `color: #fff;`;
                        }, 100);
                    }, 100);
                }, 100);
                // alert('У вас недостаточно денег, пожалуйста, заплатите ! ! !');
                start_button.classList.remove('active_btn_click_disabled');
            }
        } else {
            input_coins_summ.value = 10;
            disable_btn = false;
            input_coins_value = Number(input_coins_summ.value);
            GAME = true;
            start_button.classList.add('active_btn_click_disabled');
        }
        numbers_buttons_element.forEach(objs => {
            objs.disabled = true;
        });
        input_coins_summ.disabled = true;
        avto_stop_input.disabled = true;
        profile_index_boolean = true;
    }
}

socket.on('random_start_numbers', function (data) {
    random_stop_nums = data;
    if (data === 0) {
        text_element.style.cssText = `color: red;`;
        stop_color_svg_red.setAttribute('fill', 'red');

        stop_btn_boolean = false;
        stop_button.innerText = 'Stop';
        profile_index_boolean = true;

        GAME = false;

        stop_button.disabled = true;
        disable_btn = true;

        input_coins_summ.disabled = false;
        avto_stop_input.disabled = false;

        numbers_buttons_element.forEach(objs => {
            objs.disabled = false;
        });
        /*


        GAME = false;

        stop_button.disabled = true;
        disable_btn = true;

        input_coins_summ.disabled = false;
        avto_stop_input.disabled = false;

        numbers_buttons_element.forEach(objs => {
            objs.disabled = false;
        });*/
    }
});

socket.on('left_press_numbers', function (data) {
    left_press_numbers = data;
});

socket.on('stroy_number', function (data) {

    let li = document.createElement('li');
    li.classList.add("nums_line_bottom");
    li.style.cssText = data[1];
    li.innerText = data[0];
    down_chart_nums.appendChild(li);
});

function svg_start_game_nums() {
    stop_btn_boolean = true;

    socket.on('start_nums', function (data) {
        start_nums = data;
        inner_svg_start_nums();
    });


    function inner_svg_start_nums() {
        if (start_nums < random_stop_nums) {

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

                    left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;
                }
            }

            text_element.innerText = `${nums_fixed}x`;
            start_button.classList.add('disabled_active');

            if (GAME) {

                let number_input_coins_summ = Number(input_coins_summ.value);
                stop_btn_nums_text = number_input_coins_summ;
                /* Profile usd 200 > K.O  start */

                /* Profile usd 100 < ok end */
                if (profile_index_boolean) {

                    profile_index_boolean = false;
                    profile_coins_number -= Number(input_coins_value);
                    profile_coins_summ.innerText = profile_coins_number.toFixed(2);
                }

                stop_btn_nums_text = (number_input_coins_summ * nums_fixed);
                stop_button.innerText = '+' + stop_btn_nums_text.toFixed(2) + '💎';
                stop_end_numbers = stop_btn_nums_text.toFixed(2);

                if (avto_stop_input.value !== "") {
                    if (
                        (Number(avto_stop_input.value) >= min_auto_stop_numbs) &&
                        (Number(avto_stop_input.value) <= max_auto_stop_numbs)
                    ) {
                        if (nums_fixed >= Number(avto_stop_input.value)) {
                            stop_button.click();
                        }
                    } else {
                        avto_stop_input.value = 8;
                        stop_button.click();
                    }
                } else {
                    /*  */
                }
            } else {
                stop_btn_boolean = false;
            }

        } else {
            stop_btn_boolean = false;
            /*  */
            text_element.style.cssText = `color: red;`;
            stop_color_svg_red.setAttribute('fill', 'red');

            let index_nums_line_bottom = document.querySelectorAll('.nums_line_bottom');
            if (index_nums_line_bottom.length > 9) {
                index_nums_line_bottom[0].remove();
            }
            /*  */
            setTimeout(function () {
                text_element.style.cssText = `color: #fff;`;
                disable_btn = true;
                start_button.classList.remove('disabled_active');
                GAME = false;
                stop_button.innerText = 'Stop';
                input_coins_value = 0;

                profile_index_boolean = true;

                left_press_numbers = left_press_number_max;
                left_chart_nums.style.cssText = `height: ${left_press_numbers}px;`;

                numbers_buttons_element.forEach(objs => {
                    objs.disabled = false;
                });
            }, 2000);
        }
    }
}

socket.on('timer_numbers', function (data) {
    timer_max_nums = data;
    inner_app_timer();
});

/*  */
/*  */ let index_pages_start_number = 0;
/*  */


function inner_app_timer() {
    if (timer_max_nums > (timer_delay_nums + 0.1)) {

        timer_delay.style.cssText = `color: #00ff00;`;
        timer_delay.innerText = timer_max_nums.toFixed(1);
        timer_container.style.cssText = `display: flex; justify-content: center;`;
        text_element.style.cssText = `display: none;`;

        start_button.classList.remove('disabled_active');
        input_coins_summ.disabled = false;
        avto_stop_input.disabled = false;
        stop_button.disabled = false;

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
            disable_btn = false;
        }, 1000);
    }
}

/*
timer_container.style.cssText = `display: none`;
timer_container.style.cssText = `display: flex; justify-content: center;`;
text_element.style.cssText = `display: block;`;
*/

stop_button.onclick = function () {
    if (stop_btn_boolean) {

        stop_btn_boolean = false;
        stop_button.innerText = 'Stop';

        site_coins_number -= stop_end_numbers;
        site_coins_summ.innerText = site_coins_number.toFixed(2);

        let profile_end_numbers = Number(profile_coins_number) + Number(stop_end_numbers);
        profile_coins_number = profile_end_numbers;
        GAME = false;
        profile_coins_summ.innerText = profile_end_numbers.toFixed(2);

        stop_button.disabled = true;
        disable_btn = true;

        input_coins_summ.disabled = false;
        avto_stop_input.disabled = false;

        numbers_buttons_element.forEach(objs => {
            objs.disabled = false;
        });
    }
}

function number_maxsimal(direction, nums) {
    if (direction === "plus") {
        if (input_coins_summ.value !== "") {
            let plus_number = Number(input_coins_summ.value) + nums;
            input_coins_summ.value = plus_number.toFixed(2);
        } else {
            input_coins_summ.value = nums;
        }
    } else if (direction === "kub") {
        if (input_coins_summ.value !== "") {
            let plus_number = Number(input_coins_summ.value) * nums;
            input_coins_summ.value = plus_number.toFixed(2);
        } else {
            input_coins_summ.value = nums;
        }
    } else if (direction === "max_numb") {
        input_coins_summ.value = profile_coins_number;
    } else {
        /*  */
    }
}

