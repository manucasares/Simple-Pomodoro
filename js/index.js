
import {
    changeBackgroundColor,
    changeTextContent,
    removeActiveClass,
    startCountdown,
    stopCountdown } from "./helpers.js";


const clock_audio = document.querySelector( '#clock_audio' ); 


const tabs = document.querySelectorAll( '.btn.tab' ); 
const start_stop_btn = document.querySelector( '#start_stop' ); 


let currentTab = 'Pomodoro';
let clockStarted = false;

// Tabs
tabs.forEach( tab => {
    tab.addEventListener( 'click', ( e ) => {

        const tabClicked = e.target;

        removeActiveClass( tabs );
    
        tabClicked.classList.add( 'active' );

        currentTab = tabClicked.textContent;

        changeBackgroundColor( currentTab );
    })
});

// Countdown Timer
start_stop_btn.addEventListener( 'click', ( e ) => {
    
    clock_audio.play();

    let clock_text;

    if ( !clockStarted ) {

        const countdown = document.querySelector( '#countdown' ).innerHTML;

        const startingMinutes = countdown.split( ':' )[0];
        const startingSeconds = countdown.split( ':' )[1];

        startCountdown( startingMinutes, startingSeconds );

        
        clock_text = 'stop';
    } else {
        
        clock_text = 'start';

        stopCountdown();
    }

    clockStarted = !clockStarted;
    changeTextContent( start_stop_btn, clock_text );
    start_stop_btn.classList.toggle( 'pressed' );
})
