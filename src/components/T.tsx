"use client";
import { useApp } from "./Provider";
export function T({ k }: { k: string }) { return <>{useApp().t(k)}</>; }
export function H1({ k }: { k: string }) { return <h1 className="mb-6 font-serif text-3xl font-bold"><T k={k} /></h1>; }
