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

  const parser = new DOMParser();
  const regex = /<img.*src\="(.*)"\salt.*\>/;
  let posts = [];


  //Wordpress export 
  let headImg =[];
  let post_id;
  let post_creator;
  let post_created_at;
  let post_title;
  let post_content;
  const wp_prefix='wp';




  
  // WORPRESS EXTENDED RSS EXPORT PARSER
  useEffect(()=>{
    fetch('./data/example.xml')
    .then(res => res.text())
    .then(
      (result)=>{
        console.log("I am able to fetch the XML data");
        let xml = parser.parseFromString(result, 'text/xml');
        console.log(xml);
        let items = xml.getElementsByTagName('channel')[0].getElementsByTagName('item');
        console.log(items);
  
        [].slice.call(items).forEach((e) => {
          try{
            headImg = e.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue.match(regex);
            post_id =e.getElementsByTagName(wp_prefix+':post_id')[0].childNodes[0].nodeValue;
            post_creator= e.getElementsByTagName('dc:creator')[0].childNodes[0].nodeValue;
            console.log(e.getElementsByTagName(wp_prefix+':post_date')[0]);
            post_created_at=e.getElementsByTagName(wp_prefix+':post_date')[0].childNodes[0].nodeValue;
            post_title= e.getElementsByTagName('title')[0].childNodes[0].nodeValue;
            post_content=e.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue;
  
          }catch(error){
            
          }

          if(headImg && headImg.length>1 && post_id && post_creator && post_created_at && post_title && post_content){
          posts.push({
            id: post_id,
            creator: post_creator,
            created_at: post_created_at,
            titleImg: headImg[1],
            tags: [
              "first",
            ],
            title: post_title,
            content: post_content
          });
        }
        });
        console.log(posts);
        setIsLoaded(true);
        setItems(posts);
        setSelected(null);
        setFilteredData(posts);
      },
      (error)=>{
        console.log("Unable to fetch XML data");
      }
    )
  },[]);








 /* RSS FEED PARSER (WORDPRESS)
useEffect(()=>{
  fetch('./data/site.xml')
  .then(res => res.text())
  .then(
    (result)=>{
      console.log("I am able to fetch the XML data");
      let xml = parser.parseFromString(result, 'text/xml');
      console.log(xml);
      let items = xml.getElementsByTagName('channel')[0].getElementsByTagName('item');
      console.log(items);

      [].slice.call(items).forEach((e) => {
        headImg = e.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue.match(regex);
        if(headImg && headImg.length>1){
		  	posts.push({
          id: e.getElementsByTagName('post-id')[0].childNodes[0].nodeValue,
          creator: e.getElementsByTagName('dc:creator')[0].childNodes[0].nodeValue,
          created_at: e.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue,
          titleImg: headImg[1],
          tags: [
            "first",
          ],
		    	title: e.getElementsByTagName('title')[0].childNodes[0].nodeValue,
		      content: e.getElementsByTagName('content:encoded')[0].childNodes[0].nodeValue
		    });
      }
		  });
      console.log(posts);
      setIsLoaded(true);
      setItems(posts);
      setSelected(null);
      setFilteredData(posts);
    },
    (error)=>{
      console.log("Unable to fetch XML data");
    }
  )
},[]);
*/


  useEffect(()=>{
    fetch('./data/content.json')
    .then(res => res.json())
    .then(
      (result)=>{
      /*
        setIsLoaded(true);
        console.log(result.posts);
        setItems(result.posts);
        setSelected(null);
        setFilteredData(result.posts);
        */
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
