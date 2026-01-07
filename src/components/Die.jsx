export default function Die(props) {
    return (
        <button
            className='die' id={props.isHeld ? "isHeld" : "notHeld"} onClick={() => props.hold(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
        ${props.isHeld ? "held" : "not held"}`}

        >{props.value}</button>
    )
}