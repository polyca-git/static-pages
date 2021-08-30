import {useState, useEffect} from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Details from './components/Details';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [site, setSite] = useState([]);
  const [selected, setSelected]= useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(()=>{
    fetch('./data/content.json')
    .then(res => res.json())
    .then(
      (result)=>{
        setIsLoaded(true);
        console.log(result.posts);
        setItems(result.posts);
        setSelected(null);
        setFilteredData(result.posts);
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

  let selectedId = (num) => {
      setSelected(num);
  }
  let removeSelected = () => {
      setSelected(null);
  }
  const searchFilter =(val)=> {
    console.log("we have reached "+val)
    if(val.length>0){
      
      setFilteredData(items.filter(item=>item.title.toUpperCase().includes(val.toUpperCase())));
    }
    else{
      setFilteredData(items);
      removeSelected();
    }
    
  }
  if(error){
    return <div>Error: {error.message}</div>;
  } else if(!isLoaded){
    return <div><div className="header"></div><div className="loading">Loading...</div></div>;
  }else{
    if(selected !== null){
     return (
      <div className="App">
      <Header searchFilter={searchFilter} data="veli"/>
      <div className="contentContainer">
      <Details removeSelected={removeSelected} data={items.filter(items=>items.id==selected)[0]} />
      </div>
      </div>
     );
    }else{
      return (
        <div className="App">
          <Header searchFilter={searchFilter} />
          <div className="contentContainer">
            {filteredData.map(item=>(
              <Content key={item.id} data={item} selectedId={selectedId}/>
            ))}
          </div>
        </div>
      );
    }   
  }
}

export default App;
