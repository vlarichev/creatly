
import bi from "./../../temp/debug_bi"; 

export default async function handler(req, res) {
    console.log(bi().length)//page as html
    const page = bi()
    res.status(200).json({ resp: '💩', page })
  }
  