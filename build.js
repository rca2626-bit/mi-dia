const fs=require("fs");const {chromium}=require("playwright");
(async()=>{
 const app=fs.readFileSync("src/app.html","utf8");
 const head='<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#0a6b78">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Mi Día">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icon-192.png">\n<link rel="apple-touch-icon" href="icon-192.png">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}</style>\n';
 const i=app.indexOf("</style>")+8;
 fs.writeFileSync("dist/index.html",head+app.slice(0,i)+"\n</head>\n<body>\n"+app.slice(i)+"\n</body>\n</html>\n");
 for(const f of ["sw.js","manifest.webmanifest"])fs.copyFileSync("src/"+f,"dist/"+f);
 const b=await chromium.launch();const p=await b.newPage();const svg=fs.readFileSync("src/icon.svg","utf8");
 for(const s of [192,512]){await p.setViewportSize({width:s,height:s});await p.setContent(`<style>*{margin:0}</style>${svg.replace("<svg ",`<svg width="${s}" height="${s}" `)}`);await p.screenshot({path:`dist/icon-${s}.png`});}
 await b.close();
})();
