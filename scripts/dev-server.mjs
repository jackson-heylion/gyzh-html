import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
const root=resolve(new URL('../',import.meta.url).pathname);
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  let path;
  try{
    path=decodeURIComponent(url.pathname)==='/'?'/index.html':decodeURIComponent(url.pathname);
    const target=resolve(root,'.'+path);
    if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403);res.end('Forbidden');return}
    const buf=await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(buf);
  }catch{res.writeHead(404);res.end('Not found')}
}).listen(port,'0.0.0.0',()=>console.log('Guan Yu II is running at http://localhost:'+port));
