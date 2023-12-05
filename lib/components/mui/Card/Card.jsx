import { default as MuiCard } from "@mui/material/Card";

function Card(props) {
  return <MuiCard {...props} />;
}

Card.displayName = "Card";

export default Card;
