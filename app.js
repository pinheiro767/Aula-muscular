*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

html, body{
  width:100%;
  min-height:100%;
}

body{
  font-family:Arial, Helvetica, sans-serif;
  background:#020617;
  color:white;
  overflow:hidden;
}

/* TOPO */
.topo{
  min-height:70px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:15px;
  padding:10px 20px;
  background:#0f172a;
  border-bottom:1px solid #334155;
}

.topo h1{
  font-size:clamp(18px, 2vw, 26px);
}

.topo p{
  opacity:.8;
  font-size:14px;
}

.acoes-topo{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

button{
  border:none;
  padding:10px 14px;
  border-radius:14px;
  background:#2563eb;
  color:white;
  font-weight:bold;
  cursor:pointer;
  transition:.2s;
}

button:hover{
  background:#1d4ed8;
  transform:translateY(-1px);
}

/* LAYOUT GERAL */
.layout{
  display:grid;
  grid-template-columns:300px minmax(0, 1fr);
  height:calc(100vh - 70px);
  overflow:hidden;
}

/* MENU LATERAL */
.menu{
  overflow-y:auto;
  padding:15px;
  background:#020617;
  border-right:1px solid #334155;
}

.grade{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:8px;
  margin-top:15px;
}

.thumb{
  height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:14px;
  background:#111827;
  border:1px solid #334155;
  cursor:pointer;
  font-weight:bold;
  transition:.2s;
}

.thumb:hover{
  transform:scale(1.05);
  background:#1e293b;
}

.thumb.active{
  background:#2563eb;
  border-color:#93c5fd;
}

.painel{
  margin-top:20px;
  padding:15px;
  background:#111827;
  border-radius:20px;
  border:1px solid #334155;
}

.painel li{
  margin-top:8px;
  margin-left:18px;
}

/* CONTEÚDO */
.conteudo{
  display:flex;
  flex-direction:column;
  padding:15px;
  overflow-y:auto;
  gap:15px;
  min-width:0;
}

/* ÁREA DO SLIDE */
.viewer{
  background:#000;
  border-radius:25px;
  padding:12px;
  border:1px solid #334155;
  box-shadow:0 20px 50px rgba(0,0,0,.35);
}

.barra-slide{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  margin-bottom:10px;
  flex-wrap:wrap;
}

.controles{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

/* CORREÇÃO PRINCIPAL: NÃO CORTA A IMAGEM */
.imagem-box{
  width:100%;
  height:calc(100vh - 260px);
  min-height:420px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:auto;
  border-radius:20px;
  background:#000;
  padding:12px;
}

/* MOSTRA A FOTO INTEIRA */
.imagem-box img{
  display:block;
  max-width:100%;
  max-height:100%;
  width:auto;
  height:auto;
  object-fit:contain;
  border-radius:12px;
  transition:transform .2s ease;
  transform-origin:center center;
}

/* CASO USE ZOOM VIA JS */
.imagem-box img.zoom{
  max-width:none;
  max-height:none;
}

/* CARDS */
.cards{
  display:grid;
  grid-template-columns:repeat(3, minmax(0, 1fr));
  gap:15px;
}

.card{
  background:#111827;
  padding:15px;
  border-radius:20px;
  border:1px solid #334155;
  min-width:0;
}

.card h3{
  margin-bottom:10px;
  color:#93c5fd;
}

textarea{
  width:100%;
  min-height:170px;
  resize:vertical;
  border-radius:14px;
  background:#020617;
  color:white;
  padding:10px;
  border:1px solid #334155;
  outline:none;
}

textarea:focus{
  border-color:#60a5fa;
}

/* TABLET */
@media(max-width:1100px){
  .layout{
    grid-template-columns:240px minmax(0, 1fr);
  }

  .grade{
    grid-template-columns:repeat(3,1fr);
  }

  .cards{
    grid-template-columns:1fr 1fr;
  }

  .imagem-box{
    height:55vh;
  }
}

/* CELULAR */
@media(max-width:900px){
  body{
    overflow:auto;
  }

  .topo{
    height:auto;
    flex-direction:column;
    align-items:flex-start;
  }

  .layout{
    display:flex;
    flex-direction:column;
    height:auto;
    overflow:visible;
  }

  .menu{
    height:auto;
    max-height:280px;
    border-right:none;
    border-bottom:1px solid #334155;
  }

  .grade{
    grid-template-columns:repeat(5,1fr);
  }

  .conteudo{
    overflow:visible;
  }

  .imagem-box{
    height:auto;
    min-height:0;
    max-height:none;
  }

  .imagem-box img{
    width:100%;
    height:auto;
    max-height:none;
    object-fit:contain;
  }

  .cards{
    grid-template-columns:1fr;
  }
}

/* CELULAR PEQUENO */
@media(max-width:520px){
  .topo{
    padding:12px;
  }

  .acoes-topo,
  .controles{
    width:100%;
  }

  button{
    flex:1;
    padding:10px;
    font-size:13px;
  }

  .grade{
    grid-template-columns:repeat(4,1fr);
  }

  .thumb{
    height:52px;
    font-size:13px;
  }

  .viewer{
    border-radius:18px;
    padding:8px;
  }

  .imagem-box{
    padding:6px;
    border-radius:14px;
  }
    }
