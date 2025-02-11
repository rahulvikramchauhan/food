import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_MENU_ITEM } from "./Constants";
import { RESTAURANT_IMAGE } from "./Constants";
import { OneMore } from "./Constants";
import FoodItem from "./FoodItem";
import RestaurantDetails from "./RestaurantDetails";
import Shimmer from "./Shimmer";
import Shimmer2 from "./Shimmer2";
import { restaurantFoodItem } from "../utils/function";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantDetails,setRestaurantDetails]=useState([])

  const isDarkMode=useSelector(store=>store.darkMod.isDarkMod)
  

  const darkModeClass = isDarkMode ? 'bg-black text-white' : '';
  const darkModeForDiv=isDarkMode?'bg-slate-900 text-shite':'';
  

  console.log("Hello", restaurantMenu);

  const { resId } = useParams(); //To read , what id this component receiving from the routing configuration, We use useParams.
  //useParams is a hook, which return an object containing {id: someting}. We just destructured it.

  const getRestaurantMenu = async () => {
    const data = await fetch(OneMore + resId);
    const json = await data.json();
    console.log("JSON Value",json)
    console.log("Inside Function",json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card
        .card.itemCards)
        const temp=json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
        // const total=temp.cards[1].card.card.itemCards ? temp.cards[1].card.card.itemCards : temp.cards[2].card.card.itemCards 

        const result=restaurantFoodItem(temp)
    setRestaurantMenu(
      result
    );
    setRestaurantDetails(json?.data?.cards[2]?.card?.card?.info)
  };

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  if (restaurantMenu.length===0) {
    return <Shimmer2/>
  }

 
    return (
      <div className={"h-full w-full flex justify-center my-[2rem] "+darkModeClass}>
        <div className={"w-[60vw] pl-[2rem] "+darkModeForDiv}>
          <RestaurantDetails restaurant={restaurantDetails}/>
          <h1 className="font-extrabold">Recommended ({restaurantMenu.length})</h1>
          {restaurantMenu.map((menu,index) => (
            <FoodItem menu={menu} key={index} />
          ))}
        </div>
        
      </div>
    );

};

export default RestaurantMenu;
