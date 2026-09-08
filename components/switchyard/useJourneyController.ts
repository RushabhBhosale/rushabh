'use client';
import {useCallback,useEffect,useRef,useState,type RefObject} from 'react';
import {gsap} from 'gsap';
import {worldState,SKILL_DISTRICTS} from './world-path';
import {MAIN_UNITS,UNIT_VIEWPORTS,createDetour,unitAtDistance,sampleJourney,totalUnits,waypointOpacity,type DetourPlan,type Waypoint} from './journey-model';

export default function useJourneyController(root:RefObject<HTMLDivElement|null>){
 const [plan,setPlan]=useState<DetourPlan|null>(null);
 const [waypoint,setWaypoint]=useState<Waypoint>('entry');
 const [step,setStep]=useState(0),[district,setDistrict]=useState(0);
 const [enhanced,setEnhanced]=useState(false);
 const [selected,setSelected]=useState(-1);
 const planRef=useRef<DetourPlan|null>(null);
 const clock=useRef({value:0,target:0});
 const remapping=useRef(false);
 const previous=useRef({waypoint:'entry' as Waypoint,step:0,district:0});
 const move=useCallback((unit:number)=>{
  window.scrollTo({top:unit*innerHeight*UNIT_VIEWPORTS,behavior:'instant'});
  clock.current.target=unit;
 },[]);
 // Reparameterize the scroll track at the same physical distance before changing an itinerary.
 const replacePlan=useCallback((next:DetourPlan|null)=>{
  const distance=sampleJourney(clock.current.value,planRef.current).distance;
  const unit=unitAtDistance(distance,next);
  remapping.current=true;planRef.current=next;setPlan(next);
  clock.current.value=unit;clock.current.target=unit;
  requestAnimationFrame(()=>{move(unit);remapping.current=false;});
 },[move]);
 const enter=useCallback((index=0)=>{
  const next=createDetour(index);
  worldState.transitionBranch=index;worldState.preview=index;worldState.selection=index;
  setSelected(index);
  if(planRef.current?.index!==index)replacePlan(next);
  // One click takes the turn; there is no narrow input window or second confirmation.
  requestAnimationFrame(()=>move(next.enter+next.duration*.16));
 },[move,replacePlan]);
 const leave=useCallback(()=>{
  setSelected(-1);worldState.preview=-1;worldState.selection=-1;
  const p=planRef.current;
  const sample=sampleJourney(clock.current.value,p);
  if(p&&sample.branch>=0)move(p.enter+p.duration+1);
  else replacePlan(null);
 },[replacePlan,move]);
 const choose=useCallback((side:'left'|'right')=>{if(side==='left')leave();else enter(Math.max(0,selected));},[enter,leave,selected]);
 const inspect=useCallback((value:number)=>{const p=planRef.current;if(p)move(p.enter+p.duration*(value+.5)/4);},[move]);
 const jump=useCallback((destination:Waypoint)=>{
  if(destination==='project'){enter(Math.max(0,selected));return;}
  const unit=destination==='entry'?0:destination==='origin'?25:destination==='stackport'?51:destination==='district'?112:181;
  if(planRef.current)replacePlan(null);
  setSelected(-1);worldState.preview=-1;worldState.selection=-1;
  requestAnimationFrame(()=>move(unit));
 },[enter,move,replacePlan,selected]);
 const visitDistrict=useCallback((index:number)=>{
  if(planRef.current)replacePlan(null);
  setSelected(-1);worldState.preview=-1;worldState.selection=-1;
  requestAnimationFrame(()=>move(unitAtDistance(SKILL_DISTRICTS[index].distance-7,null)));
 },[move,replacePlan]);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{
   const target=e.target as HTMLElement|null;
   if(target?.closest('input,textarea,select,button,a,dialog,[contenteditable=true]')||e.metaKey||e.ctrlKey||e.altKey)return;
   const k=e.key.toLowerCase();
   if(k==='arrowdown'||k==='w'){e.preventDefault();move(clock.current.target+3);}
   else if(k==='arrowup'||k==='s'){e.preventDefault();move(clock.current.target-3);}
   else if(k==='arrowleft'||k==='a'){e.preventDefault();leave();}
   else if(k==='arrowright'||k==='d'){e.preventDefault();enter(Math.max(0,selected));}
  };
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[enter,leave,move,selected]);
 useEffect(()=>{
  const el=root.current!,media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,visible=!document.hidden;
  const layers=Array.from(el.querySelectorAll<HTMLElement>('[data-waypoint]'));
  const first=el.querySelector('.hero-first'),surname=el.querySelector('.hero-last'),copy=el.querySelector('.hero-description');
  const settings=()=>setEnhanced(!media.matches&&el.querySelector('canvas')?.getAttribute('data-ready')==='true');
  const scroll=()=>{if(!remapping.current)clock.current.target=scrollY/(innerHeight*UNIT_VIEWPORTS);};
  const draw=(now:number)=>{
   frame=0;if(!visible)return;
   const dt=last?Math.min(50,now-last):16;last=now;
   const max=totalUnits(planRef.current),target=Math.max(0,Math.min(max,clock.current.target));
   // A single frame-rate independent easing owns travel; cap bursts from wheel/trackpad input.
   const delta=(target-clock.current.value)*(1-Math.exp(-dt/240));
   clock.current.value+=Math.max(-dt*.075,Math.min(dt*.075,delta));
   if(Math.abs(target-clock.current.value)<.001)clock.current.value=target;
   const sample=sampleJourney(clock.current.value,planRef.current);
   worldState.progress=sample.unit/max;worldState.distance=sample.distance;worldState.branch=sample.branch;worldState.branchProgress=sample.branchProgress;
   if(sample.branch>=0)worldState.transitionBranch=sample.branch;
   const nextStep=Math.min(3,Math.floor(sample.branchProgress*4));
   let nextDistrict=0,best=Infinity;
   SKILL_DISTRICTS.forEach((d,i)=>{const gap=Math.abs(d.distance-7-sample.distance);if(gap<best){best=gap;nextDistrict=i;}});
   if(sample.waypoint!==previous.current.waypoint){previous.current.waypoint=sample.waypoint;setWaypoint(sample.waypoint);}
   if(nextStep!==previous.current.step){previous.current.step=nextStep;setStep(nextStep);}
   if(nextDistrict!==previous.current.district){previous.current.district=nextDistrict;setDistrict(nextDistrict);}
   el.dataset.progress=worldState.progress.toFixed(4);el.dataset.worldDistance=sample.distance.toFixed(2);el.dataset.route=sample.branch>=0?String(sample.branch):'main';
   el.dataset.junction=String(sample.waypoint==='stackport');
   const main=sample.mainUnit;
   for(const layer of layers){
    const id=layer.dataset.waypoint;let opacity=0,z=0,x=0;
    if(id==='entry'&&sample.branch<0)opacity=Math.max(0,1-Math.max(0,main-9)/7);
    if(id==='origin'&&sample.branch<0){opacity=waypointOpacity(main,14,39,5);z=(main-25)*10;x=(main-25)*-2;}
    if(id==='stackport'&&sample.branch<0){opacity=waypointOpacity(main,35,80,5);z=-Math.max(0,48-main)*7;}
    if(id==='project'&&sample.branch>=0){opacity=Math.min(1,sample.branchProgress/.04,(1-sample.branchProgress)/.04);z=-35*(1-Math.min(1,sample.branchProgress/.1));}
    if(id==='district'&&sample.branch<0)opacity=waypointOpacity(main,76,162,4);
    if(id==='next'&&sample.branch<0)opacity=Math.min(1,Math.max(0,(main-158)/5));
    gsap.set(layer,{opacity,visibility:opacity>.005?'visible':'hidden',x,z,rotateY:0,force3D:true});
   }
   const travel=Math.min(1,Math.max(0,main/16));
   gsap.set(first,{xPercent:-travel*60,z:travel*400,rotateY:-travel*4});
   gsap.set(surname,{xPercent:travel*70,z:travel*300,rotateY:travel*4});
   gsap.set(copy,{opacity:1-Math.min(1,main/8)});
   frame=requestAnimationFrame(draw);
  };
  const resume=()=>{if(!frame&&visible){last=0;frame=requestAnimationFrame(draw);}};
  const visibility=()=>{visible=!document.hidden;if(visible)resume();else{cancelAnimationFrame(frame);frame=0;}};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);window.addEventListener('switchyard:world-ready',settings);media.addEventListener('change',settings);document.addEventListener('visibilitychange',visibility);
  settings();scroll();clock.current.value=clock.current.target;resume();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);window.removeEventListener('switchyard:world-ready',settings);media.removeEventListener('change',settings);document.removeEventListener('visibilitychange',visibility);Object.assign(worldState,{branch:-1,distance:0,progress:0,map:0,preview:-1,selection:-1,zone:0,speed:0,bank:0,switchThrow:0});};
 },[root]);
 const travelBy=useCallback((direction:number)=>move(clock.current.target+direction*6),[move]);
 return {plan,waypoint,step,district,selected,enhanced,enter,leave,jump,choose,inspect,visitDistrict,travelBy,virtualHeight:(1+totalUnits(plan)*UNIT_VIEWPORTS)*100,mainUnits:MAIN_UNITS};
}
