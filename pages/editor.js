import { Grid, Input, TextField } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// das ist Quatsch, packe später das in Backend, so ist es einfacher zu debuggen:
const parseHTML = (rawHTML) => {
    //DOM Parser gbts nicht im Node
    var Parser = new DOMParser();
    const htmlDoc = Parser.parseFromString(rawHTML, 'text/html')
    
    // get title
    const title = htmlDoc.querySelector('title').text
    
    //get first image // TODO - 403 abfangen.
    //'https://curious-stories.com/wp-content/uploads/2020/04/Logo_ohne-kreis.png'
    
    const firstImage = htmlDoc.getElementsByTagName('img')[0].getAttribute('src')?? "none"
    const resultObject = {title, firstImage}
    console.log(resultObject)
    return resultObject
  }

export default function Home() {
    const [Html, setHtml] = useState({title:"loading"})

    useEffect((()=> fetch("/api/debug").then(e => e.json()).then(resp => setHtml(parseHTML(resp.page)))),[])

      

    return (
        <div>
            <br></br>
            <Grid direction="column" container spacing={2} justifyContent="center" alignItems="center">

                <Grid item>

                    <TextField
                        multiline
                        id="test"
                        value={Html.title}
                    />
                </Grid>
                <Grid item>
                    {Html.firstImage ? <img src={Html.firstImage} style={{height:'500px'}}></img> : <div>loading..</div>} 
                    <img scr="https://cdn.businessinsider.de/wp-content/uploads/2022/01/GettyImages-1312216622-scaled.jpg?ver=1642510021" height="500px"></img>
                </Grid>
            </Grid>
        
        </div>
    )
}