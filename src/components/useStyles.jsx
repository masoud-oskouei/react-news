 
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
 pallet:{
    text:"#000000",
    dark:"#0C1821",
    med:"#1B2A41",
    light:"#324A5F",
    paper:"#E6E8E6",
    paper2:"#CCC9DC"
  } ,
  root:{
 padding: "1em",
},
  typography: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  appBar: { 
    background: 'linear-gradient(45deg, #1B2A41 30%, #0C1821 90%)',
  },
  navLink:{
    textDecoration:"none"

  },
 
  bigLink:{
    textDecoration:"none"

  },
  messageTextField:{
    
    //background:"green",
    color:"green",
    fontSize:"2em",
    width:"500px"
  },
  navIcon: {
    marginRight :"1em"
  },
  datePicker:{
    display: "inline-block",
    height: "2.2em",
    fontSize: "1em",
  },
  dateLabel:{
    marginLeft:"2em",
  },
 
  sortLabel:{
    marginLeft:"2em",
    border:"solid rgb(196,196,196) .06em",
    borderRadius:".25em",
    height:" 2.4em",
    display:"inline-block"
  },
  
  
});
export default useStyles