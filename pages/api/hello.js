// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import JSSoup from "jssoup";

const getPage = async (validURL) => {
	const response = await fetch(validURL);
	const body = await response.text();



  const strippedHTML  = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
  console.log('>> deleted <script> tags: ' + Math.round(strippedHTML.length/body.length*100) + "% removed")

  const parsedPageObj = collectHTMLObj(strippedHTML)
  
	return parsedPageObj;
};


const collectHTMLObj = (rawHTML) => {
  //DOM Parser gbts nicht im Node
  const timeStamp = new Date().getTime();
  const parsedPageObj = {
    timeStamp
  }

  var Soup = new JSSoup(rawHTML);
  const Title = Soup.find('title').text
  const Content = Soup.find('main').getText()
  //console.log(Body)
  
  parsedPageObj.title = Title
  parsedPageObj.content = Content

  return parsedPageObj
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const body = JSON.parse(req.body)
    const results = await getPage(body);

    res.status(200).json({ resp: results, abc: true })
  } else {
    res.status(200).json({ resp: '💩' })
  }
}
