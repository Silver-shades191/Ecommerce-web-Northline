import { defineConfig,devices } from "@playwright/test";
const matrix=process.env.PLAYWRIGHT_FULL_BROWSER_MATRIX==="1";
const projects=matrix?[{name:"chromium",use:{...devices["Desktop Chrome"]}},{name:"firefox",use:{...devices["Desktop Firefox"]}},{name:"webkit",use:{...devices["Desktop Safari"]}}]:[{name:"chromium",use:{...devices["Desktop Chrome"]}}];
export default defineConfig({testDir:"./tests/e2e",fullyParallel:false,retries:0,workers:1,reporter:"list",use:{baseURL:"http://127.0.0.1:3210",trace:"on-first-retry"},projects});
