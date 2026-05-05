document.querySelector(".handle").onclick = () => {
	document.querySelector("body").classList.toggle("open");
}
if(document.querySelector("body>h3")){
	document.querySelector("body>h3").onclick = () => {
		document.querySelector("body>h3").classList.toggle("show");
	}
}

document.querySelectorAll("nav a").forEach(element => {
	element.onclick = () => {
		document.querySelector("body").classList.remove("open");
	};
});

document.querySelectorAll("section").forEach(section => {
	const indi = document.createElement("indi");
	const cator = document.createElement("cator");
	indi.prepend(cator);
	section.prepend(indi);
});

const olli4 = document.querySelectorAll("ol>li>h4");
olli4.forEach(element => {
	element.id = element.textContent.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").join("-").toLowerCase()
	const li = element.parentElement;
	li.style.cursor = 'pointer';
	li.onclick = () => {
		history.pushState('click',null,'#'+element.id);
		li.classList.toggle("open");
	}
});

const initOlli4 = () => {
	olli4.forEach(element => {
		const li = element.parentElement;
		const next = li.querySelector("h4+*");
		next.setAttribute('style','transition: none');
	});
	clearTimeout(toOlli4);
	toOlli4 = setTimeout(doOlli4,1);
};
const doOlli4 = () => {
	olli4.forEach(element => {
		const li = element.parentElement;
		li.classList.add("open");
	});
	clearTimeout(toOlli4);
	toOlli4 = setTimeout(finOlli4,1);
};

const finOlli4 = () => {
	olli4.forEach(element => {
		const li = element.parentElement;
		const next = li.querySelector("h4+*");
		next.setAttribute('style',`height: ${next.clientHeight+20}px`);
		li.classList.remove("open");
	});
};
let toOlli4;
initOlli4();

const fullwidths = document.querySelectorAll('img.fullwidth');

window.onresize = () => {
	clearTimeout(toOlli4);
	toOlli4 = setTimeout(initOlli4,100);
	fullwidths.forEach(fw => {
		let parsec = fw.parentNode;
		while(parsec.tagName != 'DIV')
			parsec = parsec.parentNode;
		parsec = parsec.nextSibling;
		while(parsec.tagName != 'DIV')
			parsec = parsec.nextSibling;
		let diff = parsec.getBoundingClientRect().top - fw.getBoundingClientRect().top;
		parsec.setAttribute("style",`--puff:${fw.height - diff}px`)
	})
}

if(document.querySelectorAll(".current-menu-item a").length==1){
	document.querySelector(".current-menu-item a").className = 'active'
}

let currHash = window.location.hash;
let lastPos = 200;
if(currHash!='') {
	if(nav = document.querySelector(`nav a[href$="${currHash}"]`))
		nav.className='active';
	setTimeout(()=>{
		document.querySelector(`h4${currHash}`).click();	
	},1000)
}

const cators = document.querySelectorAll("cator");
const sects = document.querySelectorAll("h3[id],section[id]");

let cator = null;
window.onscroll = () => {
	const poss = [];
	sects.forEach(sect => {
		let top = sect.getBoundingClientRect().top;
		if(top < 200 && sect.id!=''){
			if(sect.tagName == 'H3') top -= 3;
			top += 5000;
			poss[Math.round(top)] = sect.id;
		}
	})
	
	let worked = false;
	let next = null;
	while(!worked && poss.length > 0){
		pop = poss.pop();
		if(document.querySelector(`nav a[href$="#${pop}"]`)){
			next = document.querySelector(`nav a[href$="#${pop}"]`);
			worked = true;
		}
	}
	if(next){
		let prev = document.querySelector(`nav a.active`);
		if(prev) prev.className='';
		next.className = 'active';
	}
	
	cator = null;
	cators.forEach(cat => {
		if(cat.getBoundingClientRect().top < 80){
			cator = cat;
		}
	})
	if(cator?.parentElement.parentElement.classList.contains("auto")){
		const col = getComputedStyle(cator?.parentElement.parentElement).getPropertyValue('--bg');
	   	if(col=='#fff'){
	   		document.body.setAttribute("menu","blue");
	   	}else{
	   		document.body.setAttribute("menu","white");
	   	}
	}else if(cator?.parentElement.parentElement.classList.contains("blue")){
	   document.body.setAttribute("menu","white");
	}else{
		document.body.setAttribute("menu","blue");
	}
}
	   
window.onload = () => {
	window.onresize()
}
