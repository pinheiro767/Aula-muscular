let atual = 1;
let zoom = 1;

const total = 44;

const img = document.getElementById("slideImg");

const grade = document.getElementById("grade");

const titulo = document.getElementById("tituloSlide");

const contador = document.getElementById("contadorSlides");

const curiosidades = document.getElementById("curiosidades");

const casos = document.getElementById("casos");

const notas = document.getElementById("notas");

/* =========================
CRIAR MINIATURAS
========================= */

function criarSlides(){

  grade.innerHTML = "";

  for(let i = 1; i <= total; i++){

    const div = document.createElement("div");

    div.className = "thumb";

    div.innerText = i;

    div.onclick = () => abrir(i);

    grade.appendChild(div);

  }

}

/* =========================
ABRIR SLIDE
========================= */

function abrir(n){

  if(n < 1 || n > total) return;

  atual = n;

  zoom = 1;

  img.style.transform = "scale(1)";

  img.src = `imagens/${n}.png`;

  titulo.innerText = `Slide ${n}`;

  if(contador){
    contador.innerText = `${n} / ${total}`;
  }

  atualizarThumb();

  carregarDados();

  carregarNotas();

}

/* =========================
ATUALIZAR MINIATURA
========================= */

function atualizarThumb(){

  document.querySelectorAll(".thumb")
  .forEach((e,index)=>{

    e.classList.toggle(
      "active",
      index + 1 === atual
    );

  });

}

/* =========================
DADOS
========================= */

function carregarDados(){

  curiosidades.innerHTML = "";

  casos.innerHTML = "";

  if(!dadosSlides[atual]) return;

  /* CURIOSIDADES */

  if(dadosSlides[atual].curiosidades){

    dadosSlides[atual]
    .curiosidades
    .forEach(t=>{

      const li = document.createElement("li");

      li.innerText = t;

      curiosidades.appendChild(li);

    });

  }

  /* CASOS */

  if(dadosSlides[atual].casos){

    dadosSlides[atual]
    .casos
    .forEach(t=>{

      const p = document.createElement("p");

      p.innerText = t;

      p.style.marginBottom = "10px";

      casos.appendChild(p);

    });

  }

}

/* =========================
NAVEGAÇÃO
========================= */

function proximo(){

  if(atual < total){

    abrir(atual + 1);

  }

}

function anterior(){

  if(atual > 1){

    abrir(atual - 1);

  }

}

/* =========================
ZOOM
========================= */

function atualizarZoom(){

  img.style.transform = `scale(${zoom})`;

}

function zoomMais(){

  zoom += 0.2;

  atualizarZoom();

}

function zoomMenos(){

  zoom = Math.max(0.6, zoom - 0.2);

  atualizarZoom();

}

function resetZoom(){

  zoom = 1;

  atualizarZoom();

}

/* =========================
TELA CHEIA
========================= */

function fullscreen(){

  const box = document.getElementById("imagemBox");

  if(box.requestFullscreen){

    box.requestFullscreen();

  }else if(box.webkitRequestFullscreen){

    box.webkitRequestFullscreen();

  }

}

/* =========================
NOTAS
========================= */

function salvarNotas(){

  localStorage.setItem(
    `slide_${atual}`,
    notas.value
  );

  mostrarToast("Notas salvas");

}

function carregarNotas(){

  notas.value =
  localStorage.getItem(`slide_${atual}`) || "";

}

/* =========================
PDF
========================= */

async function gerarPDF(){

  try{

    mostrarToast("Gerando PDF...");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
      orientation:"landscape",
      unit:"mm",
      format:"a4"
    });

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const imagem = new Image();

    imagem.crossOrigin = "anonymous";

    imagem.src = img.src;

    imagem.onload = ()=>{

      canvas.width = imagem.width;

      canvas.height = imagem.height;

      ctx.drawImage(imagem,0,0);

      const data = canvas.toDataURL("image/png");

      pdf.setFontSize(18);

      pdf.text(
        `Ultra Atlas Muscular - Slide ${atual}`,
        10,
        10
      );

      pdf.addImage(
        data,
        "PNG",
        10,
        20,
        277,
        160,
        "",
        "FAST"
      );

      pdf.save(`slide_${atual}.pdf`);

      mostrarToast("PDF salvo");

    };

  }catch(e){

    console.log(e);

    mostrarToast("Erro ao gerar PDF");

  }

}

/* =========================
VOZ
========================= */

let reconhecimentoAtivo = false;

function toggleVoice(){

  const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

  if(!SpeechRecognition){

    alert("Reconhecimento de voz não suportado");

    return;

  }

  const rec = new SpeechRecognition();

  rec.lang = "pt-BR";

  rec.continuous = false;

  rec.interimResults = false;

  reconhecimentoAtivo = true;

  mostrarToast("Ouvindo...");

  rec.start();

  rec.onresult = (e)=>{

    const texto =
    e.results[0][0]
    .transcript
    .toLowerCase();

    console.log(texto);

    if(texto.includes("próximo")){

      proximo();

    }

    if(texto.includes("anterior")){

      anterior();

    }

    if(texto.includes("zoom mais")){

      zoomMais();

    }

    if(texto.includes("zoom menos")){

      zoomMenos();

    }

    if(texto.includes("resetar zoom")){

      resetZoom();

    }

    if(texto.includes("tela cheia")){

      fullscreen();

    }

    if(texto.includes("modo escuro")){

      document.body.style.background = "#000";

    }

    const match =
    texto.match(/slide\s(\d+)/);

    if(match){

      abrir(parseInt(match[1]));

    }

  };

  rec.onerror = ()=>{

    mostrarToast("Erro no microfone");

  };

  rec.onend = ()=>{

    reconhecimentoAtivo = false;

  };

}

/* =========================
TOAST
========================= */

function mostrarToast(texto){

  let toast =
  document.getElementById("toast");

  if(!toast){

    toast = document.createElement("div");

    toast.id = "toast";

    toast.style.position = "fixed";

    toast.style.bottom = "20px";

    toast.style.left = "50%";

    toast.style.transform = "translateX(-50%)";

    toast.style.background = "#2563eb";

    toast.style.color = "#fff";

    toast.style.padding = "12px 20px";

    toast.style.borderRadius = "14px";

    toast.style.zIndex = "9999";

    toast.style.fontWeight = "bold";

    document.body.appendChild(toast);

  }

  toast.innerText = texto;

  toast.style.opacity = "1";

  setTimeout(()=>{

    toast.style.opacity = "0";

  },2000);

}

/* =========================
INSTALAR PWA
========================= */

let deferredPrompt;

window.addEventListener(
  "beforeinstallprompt",
  (e)=>{

    e.preventDefault();

    deferredPrompt = e;

  }
);

document
.getElementById("btnInstall")
?.addEventListener("click", async()=>{

  if(deferredPrompt){

    deferredPrompt.prompt();

  }

});

/* =========================
SERVICE WORKER
========================= */

if("serviceWorker" in navigator){

  window.addEventListener("load",()=>{

    navigator.serviceWorker
    .register("sw.js")
    .then(()=>{

      console.log("SW registrado");

    });

  });

}

/* =========================
TECLADO
========================= */

document.addEventListener("keydown",(e)=>{

  if(e.key === "ArrowRight"){

    proximo();

  }

  if(e.key === "ArrowLeft"){

    anterior();

  }

});

/* =========================
INICIAR
========================= */

window.onload = ()=>{

  criarSlides();

  abrir(1);

};
