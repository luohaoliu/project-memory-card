import React, { useState, useEffect } from "react";
import './App.css'

const App =() => {

  let Array = [{image: "https://upload.wikimedia.org/wikipedia/commons/6/69/IceCreamSandwich.jpg", name: "Ice Cream Sandwich", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/RaspberrySherbet.jpg", name: "Raspberry Sherbet", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Mochi_Ice_Cream.jpg", name: "Mochi Ice Cream", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dippin%27_Dots_Rainbow_Flavored_Ice.jpg", name: "Rainbow Ice Cream", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Magnum_ice_cream.jpg", name: "Ice Cream Bar", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/StrawberrySundae.jpg", name: "Strawberry Sundae", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Strawberry_milk_shake_%28cropped%29.jpg", name: "Milk Shake", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Soft_Ice_cream.jpg", name: "Soft Ice Cream", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Akbar_Mashti.JPG", name: "Bastani sonnati", count: 0},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Semifreddo_dessert.jpg", name: "Semifreddo", count: 0}

  ];

  const [cardarray, setCardarray] = useState(Array); 
  const [count, setCount] = useState(0);
  const [highestscore, setHighestscore] = useState(0);
  const [previousarray, setPreviousarray] = useState([]);
  const [noduplicate, setNoduplicate] = useState([]);
  
  const addCountToCorrespondingImage = (i) => {


    if(previousarray.length - 1 === 0) {

    cardarray.filter((item) => {if(item.name === Array[i].name) {
      const itemCopy = JSON.parse(JSON.stringify(item.name));
      setNoduplicate([...noduplicate, itemCopy]);
      return itemCopy;
    }});


    } else {
      cardarray.filter(item => {if(item.name === previousarray[previousarray.length - 2][i].name) {
        const itemCopy2 = JSON.parse(JSON.stringify(item.name));
        setNoduplicate([...noduplicate, itemCopy2]);
        return itemCopy2;
      }});
    }
  }

  const checkDuplicates = (arr)=> {
    console.log("hey");
    arr.some((val, i) => {if(arr.indexOf(val) !== i){
      if(highestscore === count) {
        setHighestscore(highestscore - 1);
      }
      setCount(0);
      setNoduplicate([]);
      const reducedStorage = JSON.parse(JSON.stringify(previousarray));
      reducedStorage.splice(0, reducedStorage.length - 3);

      setPreviousarray(reducedStorage);
      
    }});
  }

  useEffect(() => {
    console.log('the duplicate has changed', noduplicate);
    console.log(previousarray);
    

    checkDuplicates(noduplicate);

    
    
 }, [noduplicate])
  
   

  useEffect(()=> {

    const shuffle = () => { 
      
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;       
      }
      return array;
      }

      const arrayCopy = JSON.parse(JSON.stringify(Array));
      const arrayCopyResult = shuffleArray(arrayCopy);
      setPreviousarray([...previousarray,arrayCopyResult]);
      setCardarray(arrayCopyResult);

      setCount(count + 1); 

      if (count + 1 > highestscore) {
        setHighestscore(count + 1);
      }   
    } 

    const myImages = document.getElementsByClassName("small-image");

    for (let i = 0; i < myImages.length; i++) {
      myImages[i].addEventListener("click",shuffle); 
      
    }   

    return () => {
      for (let i = 0; i < myImages.length; i++) {
        myImages[i].removeEventListener("click",shuffle);
        
      }   
    }

  });


  return (   
    <div>
      <h1>Ice Cream Memory Card </h1>
      <h2>Count: {count} {`     `} Highest Score: {highestscore}  </h2>
      

    {cardarray.map((card, index) => {
      return (
      <ul key={index}> 
      <div className="individual-image">
      <img className="small-image" src={card.image} style={{width:"180px", height:"180px", borderRadius: "60px", border: "10px solid violet"}} alt={card.name} onClick={()=> addCountToCorrespondingImage(index)}></img>
      <p style={{position: "relative",  left: "22px", fontFamily:"fantasy"}}>{card.name}</p>
      </div>
      </ul>
    )})}
    </div>
    
  )
}


export default App;
