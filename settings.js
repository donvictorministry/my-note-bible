window.dvSettings=(function(){var dvK='dvNbCfg',dvC={theme:'light',wrap:true};try{Object.assign(dvC,JSON.parse(localStorage.getItem(dvK)||'{}'))}catch(dvE){}
document.documentElement.dataset.dvtheme=dvC.theme;
return{get:function(){return dvC},set:function(dvN,dvV){dvC[dvN]=dvV;try{localStorage.setItem(dvK,JSON.stringify(dvC))}catch(dvE){}if(window.dvApplyCfg)window.dvApplyCfg()},
render:function(dvEl){var dvRows=[ ['theme','Dark mode',dvC.theme==='dark'],['wrap','Word wrap in editor',dvC.wrap] ];
dvEl.innerHTML=dvRows.map(function(r){return '<label class="dvRowSw"><span>'+r[1]+'</span><input class="dvSw" type="checkbox" data-dvk="'+r[0]+'" '+(r[2]?'checked':'')+'></label>'}).join('');
dvEl.onchange=function(e){var k=e.target.dataset.dvk;if(k)dvSettings.set(k,k==='theme'?(e.target.checked?'dark':'light'):e.target.checked)}}}})();
