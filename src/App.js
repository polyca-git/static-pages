import {useState, useEffect} from 'react';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [site, setSite] = useState([]);

  useEffect(()=>{
    fetch('./data/content.json')
    .then(res => res.json())
    .then(
      (result)=>{
        setIsLoaded(true);
        console.log(result.posts);
        setItems(result.posts);
      },
      (error)=> {
        setIsLoaded(true);
        setError(error);
      }
    )
  },[]);

  useEffect(()=>{
    fetch('./data/config.json')
    .then(res => res.json())
    .then(
      (result)=>{
        setSite(result.website);
        document.title = result.website.title;
      }
    )
  },[]);

  
  if(error){
    return <div>Error: {error.message}</div>;
  } else if(!isLoaded){
    return <div><div className="header"></div><div className="loading">Loading...</div></div>;
  }else{
    console.log(items)
    return (
      <div className="App">
        <Header />
        <div className="contentContainer">
          {items.map(item=>(
            <Content data={item} />
          ))}
          
        </div>
      </div>
    );
  }
}

export default App;
