import { branchEnd, branchStart } from './world-path';

export const MAIN_UNITS = 190;
export const UNIT_VIEWPORTS = 0.065;
export const COMMIT_UNIT = 62;
export const JUNCTION_WINDOW = [37, 78] as const;
export type DetourPlan = { enter:number; duration:number; rejoin:number; index:number };
export type Waypoint = 'entry'|'origin'|'stackport'|'project'|'district'|'next';

// Continuous velocity at the junction: no near-station plateau or sudden acceleration.
const knots = [[0,0],[37,36],[62,54],[190,235]];
export function mainDistance(unit:number):number {
 const u=Math.max(0,Math.min(MAIN_UNITS,unit));
 const slopes=knots.slice(1).map((p,i)=>(p[1]-knots[i][1])/(p[0]-knots[i][0]));
 for(let i=1;i<knots.length;i++)if(u<=knots[i][0]){
  const a=knots[i-1],b=knots[i],h=b[0]-a[0],t=(u-a[0])/h;
  const m0=i===1?slopes[0]:2*slopes[i-2]*slopes[i-1]/(slopes[i-2]+slopes[i-1]);
  const m1=i===knots.length-1?slopes[i-1]:2*slopes[i-1]*slopes[i]/(slopes[i-1]+slopes[i]);
  return (2*t*t*t-3*t*t+1)*a[1]+(t*t*t-2*t*t+t)*h*m0+(-2*t*t*t+3*t*t)*b[1]+(t*t*t-t*t)*h*m1;
 }
 return 235;
}
export function mainUnitAt(distance:number){let lo=0,hi=MAIN_UNITS;for(let i=0;i<32;i++){const mid=(lo+hi)/2;if(mainDistance(mid)<distance)lo=mid;else hi=mid;}return (lo+hi)/2;}
export const REJOIN_UNIT=mainUnitAt(branchEnd(0));
export function createDetour(index:number):DetourPlan{return {index,enter:mainUnitAt(branchStart(index)),rejoin:mainUnitAt(branchEnd(index)),duration:42};}
export function totalUnits(plan:DetourPlan|null){return MAIN_UNITS+(plan?plan.duration-(plan.rejoin-plan.enter):0);}
export function unitAtDistance(distance:number,plan:DetourPlan|null){
 if(!plan)return mainUnitAt(distance);
 const start=branchStart(plan.index),end=branchEnd(plan.index);
 if(distance>=start&&distance<=end)return plan.enter+plan.duration*(distance-start)/(end-start);
 const main=mainUnitAt(distance);return distance>end?main+plan.duration-(plan.rejoin-plan.enter):main;
}
export function sampleJourney(unit:number,plan:DetourPlan|null){
 const inBranch=!!plan&&unit>=plan.enter&&unit<plan.enter+plan.duration;
 const branchProgress=inBranch?(unit-plan!.enter)/plan!.duration:0;
 const mainUnit=plan&&unit>=plan.enter+plan.duration?unit-plan.duration+(plan.rejoin-plan.enter):unit;
 const distance=inBranch?branchStart(plan!.index)+(branchEnd(plan!.index)-branchStart(plan!.index))*branchProgress:mainDistance(mainUnit);
 const waypoint:Waypoint=inBranch?'project':mainUnit<16?'entry':mainUnit<37?'origin':mainUnit<78?'stackport':mainUnit<160?'district':'next';
 return {unit,mainUnit,distance,waypoint,branch:inBranch?plan!.index:-1,branchProgress};
}
export function waypointOpacity(unit:number,start:number,end:number,fade=5){return Math.max(0,Math.min(1,(unit-start)/fade,(end-unit)/fade));}
