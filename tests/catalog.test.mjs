import test from "node:test";
import assert from "node:assert/strict";
import { money } from "../src/lib/format.ts";
import { demoProducts } from "../src/lib/catalog.ts";
test("formats cents as whole-dollar USD prices",()=>{assert.equal(money(24800),"$248");assert.equal(money(2800),"$28")});
test("seed catalog has at least six stocked products",()=>{assert.ok(demoProducts.length>=6);assert.ok(demoProducts.every(p=>p.price>0&&p.inventory>=0))});
test("seed product slugs are unique",()=>{assert.equal(new Set(demoProducts.map(p=>p.slug)).size,demoProducts.length)});
