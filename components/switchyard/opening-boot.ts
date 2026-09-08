// Runs before body paint. Early input and stalled hydration must always fail open.
export const openingBootScript = `(function(){
 try {
  if(!['/','/home','/home/'].includes(location.pathname)||location.hash||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var root=document.documentElement;
  root.dataset.syOpening='pending';
  var events=['wheel','touchstart','pointerdown','keydown'];
  function cleanup(){events.forEach(function(name){window.removeEventListener(name,interrupt);});}
  function interrupt(event){
   if(event.key&&!['Tab','Escape','ArrowDown','PageDown',' ','End'].includes(event.key))return;
   delete root.dataset.syOpening;
   window.dispatchEvent(new Event('switchyard:opening-timeout'));
   cleanup();
  }
  events.forEach(function(name){window.addEventListener(name,interrupt,{passive:true});});
  window.setTimeout(function(){
   if(root.dataset.syOpening==='pending'){
    delete root.dataset.syOpening;
    window.dispatchEvent(new Event('switchyard:opening-timeout'));
   }
   cleanup();
  },3200);
 }catch(e){}
})();`;
