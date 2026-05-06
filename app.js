
let atual=1;
let zoom=1;

const total=44;

const img=document.getElementById("slideImg");

function criarSlides(){

const grade=document.getElementById("grade");

for(let i=1;i<=total;i++){

const div=document.createElement("div");

div.className="thumb";

div.innerText=i;

div.onclick=()=>abrir(i);

grade.appendChild(div);

}

}

function abrir(n){

atual=n;

img.src=`imagens/${n}.png`;

document.getElementById("tituloSlide").innerText=`Slide ${n}`;

document.querySelectorAll(".thumb").forEach((e,index)=>{

e.classList.toggle("active",index+1===n);

});

carregarDados();

carregarNotas();

}

function carregarDados(){

const c=document.getElementById("curiosidades");

const casos=document.getElementById("casos");

c.innerHTML="";
casos.innerHTML="";

dadosSlides[atual].curiosidades.forEach(t=>{

const li=document.createElement("li");

li.innerText=t;

c.appendChild(li);

});

dadosSlides[atual].casos.forEach(t=>{

const p=document.createElement("p");

p.innerText=t;

casos.appendChild(p);

});

}

function proximo(){

if(atual<total) abrir(atual+1);

}

function anterior(){

if(atual>1) abrir(atual-1);

}

function zoomMais(){

zoom+=0.2;

img.style.transform=`scale(${zoom})`;

}

function zoomMenos(){

zoom=Math.max(0.5,zoom-0.2);

img.style.transform=`scale(${zoom})`;

}

function fullscreen(){

if(img.requestFullscreen){

img.requestFullscreen();

}

}

function salvarNotas(){

localStorage.setItem("slide_"+atual,document.getElementById("notas").value);

alert("Notas salvas");

}

function carregarNotas(){

document.getElementById("notas").value=localStorage.getItem("slide_"+atual)||"";

}

async function gerarPDF(){

const { jsPDF } = window.jspdf;

const pdf=new jsPDF("landscape");

pdf.text("Ultra Atlas Muscular",10,10);

pdf.addImage(img.src,"PNG",10,20,260,140);

pdf.save(`slide_${atual}.pdf`);

}

function toggleVoice(){

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert("Navegador sem reconhecimento de voz");

return;

}

const rec=new SpeechRecognition();

rec.lang="pt-BR";

rec.start();

rec.onresult=(e)=>{

const texto=e.results[0][0].transcript.toLowerCase();

if(texto.includes("próximo")) proximo();

if(texto.includes("anterior")) anterior();

if(texto.includes("zoom mais")) zoomMais();

if(texto.includes("zoom menos")) zoomMenos();

if(texto.includes("modo escuro")){

document.body.style.background="#000";

}

const match=texto.match(/slide\s(\d+)/);

if(match){

abrir(parseInt(match[1]));

}

};

}

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

});

document.getElementById("btnInstall").onclick=async()=>{

if(deferredPrompt){

deferredPrompt.prompt();

}

};

if("serviceWorker" in navigator){

navigator.serviceWorker.register("sw.js");

}

criarSlides();

abrir(1);
