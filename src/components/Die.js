export default function Die(props){
  let dieFace = "";
  switch (props.value) {
    case 1:
      dieFace = "/img/dice1.png";
      break;
    case 2:
      dieFace = "/img/dice2.png";
      break;
    case 3:
      dieFace = "/img/dice3.png";
      break;
    case 4:
      dieFace = "/img/dice4.png";
      break;
    case 5:
      dieFace = "/img/dice5.png";
      break;
    case 6:
      dieFace = "/img/dice6.png";
      break;
    default:
      break;
  }

  const styles ={
    backgroundColor: props.isHeld ? '#E55807' : 'white',
    backgroundImage: `url(${dieFace})`,
    backgroundSize: "cover"
  }

    return(
        <div className="die-face" style={styles} onClick={props.holdDice}>
        </div>
    )
} 