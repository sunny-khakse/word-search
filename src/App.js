import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [wordsList, setWordsList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'highlight' : '' }>
            { part }
        </span>)
    } </span>;
}

  useEffect(()=>{
    if(searchKeyword.length > 2){
      const temp = [...wordsList];
      const result = temp.filter((word) => word.includes(searchKeyword));
      setSearchResult(result);
    }
  },[searchKeyword])

  useEffect(()=>{
    Axios.get("https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words")
      .then( (result) => {
          setWordsList(result.data.split("\n"))
        },
        (error) => {
          console.log('error',error)
          }
      );       
  },[])

  return (
    <div className="App">
      <h1>Snehal Khakse</h1>
      <input type='text' className='search-input' placeholder='Search...' onChange={handleSearch} />
      {searchKeyword.length > 2 ? 
        <ul className='search-result'>
          {searchResult.map(word => <li>{getHighlightedText(word,searchKeyword)}</li>)}
        </ul>
        :
        <p>{!searchKeyword.length  ? 'Please enter search keyword' : 'Please enter at least 3 characters'}</p>
      }
    </div>
  );
}

export default App;
