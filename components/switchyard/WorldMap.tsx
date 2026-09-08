'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {worldState,branchStart,branchEnd} from './world-path';
import {stations} from '@/utils/switchyard';
import type {Waypoint} from './journey-model';

export default function WorldMap({current,onNavigate,onProject}:{visited:boolean;current:Waypoint;onNavigate:(destination:Waypoint)=>void;onProject:(index:number)=>void}){
 const [open,setOpen]=useState(false);const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLButtonElement>(null),dot=useRef<SVGCircleElement>(null);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key.toLowerCase()==='m'&&!e.metaKey&&!e.ctrlKey&&!(e.target as HTMLElement).closest('input,textarea,[contenteditable=true]')){e.preventDefault();setOpen(v=>!v);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 useEffect(()=>{
  worldState.map=open?1:0;
  if(open)dialog.current?.showModal();else if(dialog.current?.open){dialog.current.close();opener.current?.focus();}
  if(!open)return;
  let frame=0;
  const draw=()=>{const x=30+worldState.distance/235*720,y=worldState.branch>=0?150-Math.sin(Math.PI*worldState.branchProgress)*70:150;dot.current?.setAttribute('cx',String(x));dot.current?.setAttribute('cy',String(y));frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);worldState.map=0;};
 },[open]);
 return <><button ref={opener} className="world-map-button mono" aria-haspopup="dialog" onClick={()=>setOpen(true)}>MAP <span>M</span></button><dialog ref={dialog} className="world-map" aria-labelledby="world-map-title" onCancel={()=>setOpen(false)}><div className="map-surface"><div className="section-line mono"><h2 id="world-map-title">THE SWITCHYARD / CHOOSE A DESTINATION</h2><button onClick={()=>setOpen(false)} aria-label="Close route map">CLOSE ×</button></div><p className="map-caption">A world to explore.<br/><em>No wrong turns.</em></p><svg className="slice-map" viewBox="0 0 800 195" role="img" aria-label="Five project routes branch from and return to the main journey."><path d="M30 150H750"/>{stations.map((s,i)=>{const x=30+branchStart(i)/235*720,end=30+branchEnd(i)/235*720;return <g key={s.id}><path d={`M${x} 150 C${x+10} 150 ${x+12} 80 ${(x+end)/2} 80 S${end-10} 150 ${end} 150`}/><text x={(x+end)/2} y="66" textAnchor="middle">0{i+1}</text></g>;})}<circle ref={dot} r="5" className="current"/><text x="30" y="183">ENTRY</text><text x="625" y="183">SKILLS → CONTACT</text></svg><div className="map-projects">{stations.map((s,i)=><button key={s.id} onClick={()=>{setOpen(false);onProject(i);}}><span className="mono">0{i+1}</span>{s.name}<span>↗</span></button>)}</div><div className="map-destinations">{([['Entry','entry'],['Origin','origin'],['Skills','district'],['Contact','next']] as const).map(([name,id])=><button key={id} aria-current={current===id?'location':undefined} onClick={()=>{setOpen(false);onNavigate(id);}}>{name}<span>↗</span></button>)}</div><nav className="map-index" aria-label="Fast portfolio index"><span className="mono">DIRECT INDEX</span><Link href="/projects">All work ↗</Link><Link href="/about">About ↗</Link><Link href="/blogs">Writing ↗</Link><Link href="/contact">Contact ↗</Link></nav></div></dialog></>;
}
