import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
// import Menu from "./menuApi";
import Card from "./Card";

let Menu=[{}];

const Home = () => {

    const [menuItems, setMenuItems] = useState(Menu);
    const [loading,setLoading] = useState(false);
  // console.log(menuItems);
  useEffect(() => {
   
    setLoading(true);
    fetch("https://cafe-webapp1.onrender.com/productItems").then((res)=>res.json()).then((data)=>{Menu=data; setMenuItems(Menu); setLoading(false); }).catch((err)=>{console.log("Some error")});
  
 
  },[]);

//   console.log(Menu);

  const uniqueList = [
    ...new Set(Menu.map((element) => element.category)),
    "All",
  ];
  // console.log(uniqueList);

  // const [menuList, setMenuList] = useState(uniqueList);

  const filterItem = function (currCategory) {
    
    if (currCategory === "All") {
      setMenuItems(Menu);
      return;
    }

    const updatedMenu = Menu.filter(
      (element) => element.category === currCategory
    );
    // console.log(updatedMenu);
    setMenuItems(updatedMenu);
  };

  return (
    <>
    
      <HomeHeader filterItem={filterItem} menuList={uniqueList} />
      {loading && <h1>Loading...</h1>}
      <section className="main-card--cointainer">
        {menuItems.map((element) => (
          <Card key={element.pid} card={element}/>
        ))}
      </section>
    </>
  );
};

export default Home;
