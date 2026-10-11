import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as sleep } from "node:timers/promises";
const host="127.0.0.1",port=3210,url=`http://${host}:${port}`;
const probe=createServer();await new Promise((resolve,reject)=>{probe.once("error",reject);probe.listen(port,host,resolve)});await new Promise(resolve=>probe.close(resolve));
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname",host,"--port",String(port)],{stdio:"inherit",env:process.env});
let stopping=false;
function stopServer(){if(stopping)return;stopping=true;if(process.platform==="win32"&&server.pid){spawnSync("taskkill.exe",["/PID",String(server.pid),"/T","/F"],{stdio:"ignore"});}else server.kill("SIGTERM");}
try{
 let ready=false;for(let i=0;i<60;i++){if(server.exitCode!==null)throw new Error(`Next server exited with ${server.exitCode}`);try{const response=await fetch(url);if(response.ok){ready=true;break}}catch{}await sleep(500)}if(!ready)throw new Error("Production server did not become ready.");
 const runner=spawn(process.execPath,["node_modules/@playwright/test/cli.js","test",...process.argv.slice(2)],{stdio:"inherit",env:process.env});const [code,signal]=await new Promise(resolve=>runner.once("close",(c,s)=>resolve([c,s])));process.exitCode=code??(signal?1:0);
}catch(error){console.error(error);process.exitCode=1;}finally{stopServer();process.exit(process.exitCode??1);}

