
import {
    changeBackgroundColor,
    changeCountdown,
    changeTextContent,
    removeActiveClass,
    startCountdown,
    stopCountdown } from "./helpers.js";


const startClockAudio = new Audio( '../assets/hit-clock' );

const tabs = document.querySelectorAll( '.btn.tab' ); 
const start_stop_btn = document.querySelector( '#start_stop' ); 

let currentTab = 'Pomodoro';
let clockStarted = false;

// Tabs
tabs.forEach( tab => {
    tab.addEventListener( 'click', ( e ) => {

        if ( clockStarted ) {

           const isConfirmed = confirm( 'Si cambia de estado mientras el timer está ON, perderá el tiempo.' )
           
           if ( !isConfirmed ) {
               return;
           }

           clockStarted = false;
           stopCountdown();
        }

        const tabClicked = e.target;
        currentTab = tabClicked.textContent;

        // Changing countdown times
        changeCountdown( currentTab );


        // UI
        removeActiveClass( tabs );

        tabClicked.classList.add( 'active' );

        changeBackgroundColor( currentTab );
    })
});

// Countdown Timer
start_stop_btn.addEventListener( 'click', ( e ) => {
    
    startClockAudio.play();

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

