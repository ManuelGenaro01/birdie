import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import TweetContainer from "./components/tweetContainer/tweetContainer";

const App = () => {
  const date = new Date();
  const dateOrder = Date.now();
  const [tweet, setTweet] = useState([]);

  const getTweets = () => {
    const querydb = getFirestore();
    const queryCollection = collection(querydb, "tweets");
    getDocs(query(queryCollection, orderBy("order", "desc"))).then((res) =>
      setTweet(
        res.docs.map((content) => ({ id: content.id, ...content.data() }))
      )
    );
  };

  useEffect(() => {
    getTweets();
  }, []);

  const [name, setName] = useState("");

  const newItem = (item) => {
    const newTweet = {
      order: dateOrder,
      user: `user${Math.round(Math.random() * (0 + 1000000))}`,
      tweet: item,
      fecha: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      hora: `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`,
    };
    const db = getFirestore();
    const tweetsCollection = collection(db, "tweets");
    addDoc(tweetsCollection, newTweet);
  };
  const handleClick = (e) => {
    if(!name){
      
      e.preventDefault();
      alert("No puedes insertar un tweet vacio!")
    }
    else{

      getTweets();
      e.preventDefault();
      newItem(name);
      setName("");
    }
    
  };

  return (
    <>
      <div className="w-full  items-center">
        <form>
          <input
            type="text"
            value={name}
            maxLength={255}
            placeholder="Escribe lo que estás pensando!"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <button onClick={handleClick}>Tweet!</button>
        </form>
      </div>
      <TweetContainer data={tweet} />
    </>
  );
};

export default App;
