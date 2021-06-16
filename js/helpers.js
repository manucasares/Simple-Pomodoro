const root = document.documentElement;
let clockInterval;

const countdown = document.querySelector( '#countdown' );
const finishTimerAudio = new Audio( '../assets/finish-time.wav' );


export function removeActiveClass ( arrayNodes ) {
    arrayNodes.forEach( node => node.classList.remove( 'active' ) );
    
}

export function changeBackgroundColor ( state ) {
    switch ( state.trim() ) {
        case 'Pomodoro':
            root.style.setProperty( '--current-clr', 'hsl(2, 66%, 58%)' )
            break;

        case 'Short Break':
            root.style.setProperty( '--current-clr', 'hsl(182, 35%, 42%)' )
            break;

        case 'Long Break':
            root.style.setProperty( '--current-clr', 'hsl(205, 43%, 46%)' )
            break;
    
        default:
            break;
    } 
}

export function changeTextContent ( element, text ) {
    element.textContent = text;  
}


export function startCountdown ( startingMinutes, startingSeconds ) {

    let time = startingMinutes * 60 + Number( startingSeconds );

    clockInterval = setInterval( () => tick( --time ), 1000 );
}

export const stopCountdown = () => {
    clearInterval( clockInterval );
}

function tick ( time ) {
  
    if ( !time ) {
        finishTimerAudio.play();
        stopCountdown();
    }

    let minutes = Math.floor( time / 60 );
    let seconds = time % 60;

    minutes = ( minutes < 10 ) ? `0${ minutes }` : minutes;
    seconds = ( seconds < 10 ) ? `0${ seconds }` : seconds;

    countdown.innerHTML = `${ minutes }:${ seconds }`;
}
