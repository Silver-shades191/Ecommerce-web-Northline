import { test,expect } from "@playwright/test";
test("home page and product catalog are navigable",async({page})=>{await page.goto("/",{waitUntil:"domcontentloaded"});await expect(page.getByRole("heading",{name:/find your way out/i})).toBeVisible();await page.getByRole("link",{name:/explore the collection/i}).click();await expect(page).toHaveURL(/shop/);await expect(page.getByRole("heading",{name:/shop all/i})).toBeVisible();await expect(page.locator(".product-card").first()).toBeVisible();});
test("login page is usable and has accessible labels",async({page})=>{await page.goto("/login",{waitUntil:"domcontentloaded"});await expect(page.getByRole("heading",{name:/good to have you back/i})).toBeVisible();await expect(page.getByPlaceholder("you@example.com")).toBeVisible();await expect(page.getByLabel("Password")).toBeVisible();});
test("mobile navigation and layout at narrow width",async({page})=>{await page.setViewportSize({width:360,height:800});await page.goto("/",{waitUntil:"domcontentloaded"});await page.waitForLoadState("networkidle",{timeout:8000}).catch(()=>{});await expect(page.getByRole("button",{name:"Open navigation"})).toBeVisible();await page.getByRole("button",{name:"Open navigation"}).click();await expect(page.locator(".mobile-drawer").getByRole("link",{name:"Shop all"})).toBeVisible();await expect(page.locator("body")).toHaveJSProperty("scrollWidth",360);});

test("responsive shell has no horizontal overflow at target widths",async({page})=>{for(const width of [360,768,1024,1440]){await page.setViewportSize({width,height:900});await page.goto("/",{waitUntil:"domcontentloaded"});const scrollWidth=await page.locator("body").evaluate(e=>e.scrollWidth);expect(scrollWidth,`horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);}});



