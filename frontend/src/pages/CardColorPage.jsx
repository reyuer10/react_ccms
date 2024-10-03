import React, { useEffect, useState } from "react";
import CardColorHeader from "./CardColorHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardColorData } from "../features/cardColorSlice";
import CardColorTable from "./CardColorTable";
import CardColorFooter from "./CardColorFooter";
// import { handleFetchCardColor } from "../services/cardColorApi";

function CardColorPage() {
  const dispatch = useDispatch();
  const { cardColor } = useSelector((state) => state.cardColor);

  const [cardColorData, setCardColorData] = useState(cardColor);
  const [cardColorPage, setCardColorPage] = useState(1);
  const [cardColorPerItems, setCardColorPerItems] = useState(3);

  const cardColorLastIndex = cardColorPage * cardColorPerItems;
  const cardColorFirstIndex = cardColorLastIndex - cardColorPerItems;
  const cardColorCurrentItems = cardColorData.slice(
    cardColorFirstIndex,
    cardColorLastIndex
  );

  const cardColorLastPage = Math.ceil(cardColor.length / cardColorPerItems);

  useEffect(() => {
    dispatch(fetchCardColorData());
  }, [dispatch]);

  return (
    <div className="p-4">
      <CardColorHeader
        setCardColorData={setCardColorData}
        cardColorCurrentItems={cardColorCurrentItems}
      />
      <div className=" overflow-x-auto shadow-lg my-4 border-2 border-main-background rounded-lg">
        <CardColorTable
          cardColorData={cardColorData}
          cardColorCurrentItems={cardColorCurrentItems}
        />
      </div>

      <CardColorFooter
        cardColorPerItems={cardColorPerItems}
        setCardColorPerItems={setCardColorPerItems}
        cardColorCurrentItems={cardColorCurrentItems}
        cardColorLastPage={cardColorLastPage}
        cardColorPage={cardColorPage}
        setCardColorPage={setCardColorPage}
      />
    </div>
  );
}

export default CardColorPage;
