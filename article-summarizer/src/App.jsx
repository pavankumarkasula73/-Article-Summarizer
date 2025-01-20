import React from "react";
import {useState} from "react"
import axios from "axios"
function App(){
  const [text,setText] =useState("");
   const handleinput=(e)=>{
       setText(e.target.value)

   }
   const [summary,setSummary]=useState("");
   const summarize=async()=>{
    try{
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: text,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
   const response=await axios.request(options);
   setSummary(response.data.summary);
   } catch(error){
    console.log("Error fetching summary:", error);
    setSummary("An error occured. please check the url and try again.");
   }
  }
  return(
    <div className="text-gray-800 text-lg">
         <div className="h-screen w-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-col gap-y-8">
          <h1 className="text-x3l font-extrabold text-white"> Article Summarizer</h1>
          <div className="flex items-center justity-center gap-x-4">
            <input type="text" className="outline-none border-2 border-white rounded-lg px-4 py-2 text-gray-800 shadow-md"  placeholder="Enter URL" onChange={handleinput}/>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-100" onClick={summarize}>Click</button>
          </div>
          <div className="w-96 h-64 bg-white rounded-lg shadow-lg overflow-y-auto p-4 flex items-center justify-center">
           {summary ? (
              <p className="text-gray-800 text-center">{summary}</p>
                   ) : (
                          <p className="text-gray-500 text-center">Summary will appear here</p>
                    )}
            </div>

         </div>
    </div>
      )
}
export default App;