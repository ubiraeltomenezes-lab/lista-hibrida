const BASES = {
        PIZZARIA: [
            { n: "Calabresa", p: 120 }, { n: "Muçarela", p: 150 }, { n: "Presunto", p: 55 },
            { n: "Catupiry", p: 40 }, { n: "Frango", p: 110 }, { n: "Farinha", p: 17 },
            { n: "Brócolis", p: 20 }, { n: "Palmito", p: 50 }, { n: "Frango Porção", p: 100 },
            { n: "Bacon", p: 70 }, { n: "Batata", p: 25 }, { n: "Cheddar", p: 12 },
            { n: "Peperoni", p: 65 }, { n: "Lombo", p: 36 }, { n: "Parmesão", p: 37 },
            { n: "Gorgonzola", p: 14 }, { n: "Carne Seca", p: 140 }, { n: "Provolone", p: 35 },
            { n: "Contra Filé", p: 100 }, { n: "Banana", p: 15 }, { n: "Cebola", p: 20 },
            { n: "Tomate", p: 20 }, { n: "Uva", p: 12 }, { n: "Limão", p: 5 },
            { n: "Manjericão", p: 2 }, { n: "Milho", p: 3 }, { n: "Ervilha", p: 22 },
            { n: "Cenoura", p: 5 }, { n: "Pimentão", p: 5 }, { n: "Morango", p: 12 },
            { n: "Creme de Leite", p: 3 }, { n: "Goiabada", p: 7 }, { n: "Chocolate", p: 25 },
            { n: "Chocolate Branco", p: 30 }, { n: "Brigadeiro", p: 15 }, { n: "Mesinha", p: 15 },
            { n: "Tomate Seco", p: 20 }, { n: "Molho", p: 13 }, { n: "Ketchup", p: 24 },
            { n: "Molho de Pimenta", p: 7 }, { n: "Atum", p: 7 }, { n: "Ovo", p: 15 },
            { n: "Maionese", p: 20 }, { n: "Fermento", p: 16 }, { n: "Confete", p: 20 },
            { n: "Sal", p: 3 }, { n: "Açúcar", p: 3 }, { n: "Alho", p: 25 },
            { n: "Tempero Completo", p: 20 }, { n: "Molho Inglês", p: 7 },
            { n: "Óleo", p: 7 }, { n: "Óleo de Algodão", p: 180 }, { n: "Caldo de Galinha", p: 17 },
            { n: "Colorau", p: 15 }, { n: "Café", p: 30 }, { n: "Arroz", p: 21 }, 
            { n: "Manteiga", p: 33 }, { n: "Batata Palha", p: 20 }, { n: "Azeite", p: 20 },
            { n: "Copo Descartável", p: 8 }, { n: "Sacola Plástica", p: 20 },
            { n: "Sachê Maionese", p: 25 }, { n: "Guardanapo", p: 10 }, { n: "Cloro", p: 9 },
            { n: "Sabão em Pó", p: 20 }, { n: "Desinfetante", p: 10 }, { n: "Detergente", p: 10 },
            { n: "Saco de Lixo", p: 15 }, { n: "Desengordurante", p: 20 }
        ],
        BEBIDAS: [
            { n: "Guaraviton", p: 5.50 }, { n: "Coca 600", p: 7.00 }, { n: "Coca Lata", p: 5.00 }, 
            { n: "Heineken", p: 18.00 }, { n: "Skol", p: 10.00 }, { n: "Original", p: 12.00 },
            { n: "Água s/ Gás", p: 3.00 }, { n: "Água c/ Gás", p: 4.00 }, { n: "Suco Lata", p: 6.00 }
        ]
    };

    let appAtivo = 'PIZZARIA';
    let diaAtual = 'SEG';
    let db = {};

    function carregarApp() {
        const salvo = localStorage.getItem('db_mondialle_v11_' + appAtivo);
        db = salvo ? JSON.parse(salvo) : {};
        document.getElementById('app-header').innerText = appAtivo === 'PIZZARIA' ? 'MONDIALLE PIZZARIA' : 'LISTA BEBIDAS';
        mudarDia(diaAtual, document.getElementById('btn-seg'));
    }

    function renderizar() {
        const corpo = document.getElementById('lista-corpo');
        const painel = document.getElementById('painel-total');
        corpo.style.display = 'block';
        painel.style.display = 'none';
        corpo.innerHTML = '';

        if (!db[diaAtual]) {
            db[diaAtual] = JSON.parse(JSON.stringify(BASES[appAtivo])).map(p => ({ ...p, qtd: 1, estado: 0 }));
        }

        db[diaAtual].forEach((item, i) => {
            const div = document.createElement('div');
            div.className = `item-compra ${item.estado === 1 ? 'planejado' : (item.estado === 2 ? 'comprado' : '')}`;
            
            // Adicionado o atributo data-estado para o filtro funcionar de forma segura
            div.setAttribute('data-estado', item.estado);
            
            div.innerHTML = `
                <div class="linha">
                    <button class="btn-status" style="background: ${item.estado === 1 ? 'var(--secondary)' : (item.estado === 2 ? 'var(--green)' : '#eee')}" onclick="mudarEstado(${i})"></button>
                    <input type="text" class="nome-edit" value="${item.n}" onchange="editarNome(${i}, this.value)">
                    <input type="number" class="preco-edit" value="${item.p}" onchange="editarPreco(${i}, this.value)">
                    <div style="display:flex; align-items:center; gap:8px">
                        <button onclick="alterarQtd(${i}, -1)" style="padding:2px 8px">-</button>
                        <b style="min-width:15px; text-align:center">${item.qtd}</b>
                        <button onclick="alterarQtd(${i}, 1)" style="padding:2px 8px">+</button>
                    </div>
                    <button class="btn-del" onclick="removerItem(${i})">✕</button>
                </div>`;
            corpo.appendChild(div);
        });
        atualizarSomaPendentes();
    }

    function mudarEstado(i) {
        db[diaAtual][i].estado = (db[diaAtual][i].estado + 1) % 3;
        salvar(); renderizar();
    }

    function editarPreco(i, v) { db[diaAtual][i].p = parseFloat(v) || 0; salvar(); atualizarSomaPendentes(); }
    function editarNome(i, v) { db[diaAtual][i].n = v.toUpperCase(); salvar(); }
    function alterarQtd(i, v) { db[diaAtual][i].qtd = Math.max(1, db[diaAtual][i].qtd + v); salvar(); renderizar(); }
    
    function removerItem(i) {
        if(confirm("Remover item?")) {
            db[diaAtual].splice(i, 1);
            salvar(); renderizar();
        }
    }

    function adicionarNovoItem() {
        const nome = prompt("Nome da Mercadoria:");
        if (!nome) return;
        const preco = parseFloat(prompt("Preço Unitário:", "0")) || 0;
        db[diaAtual].push({ n: nome.toUpperCase(), p: preco, qtd: 1, estado: 1 });
        salvar(); renderizar();
    }

    function mudarDia(dia, btn) {
        diaAtual = dia;
        if(btn) {
            document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
        }
        renderizar();
        window.scrollTo(0,0);
    }

    function atualizarSomaPendentes() {
        let pendentes = (db[diaAtual] || []).filter(it => it.estado === 1);
        let soma = pendentes.reduce((acc, it) => acc + (it.p * it.qtd), 0);
        document.getElementById('num-pendentes').innerText = pendentes.length;
        document.getElementById('valor-pendentes').innerText = soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    function mostrarRelatorio(btn) {
        document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        document.getElementById('lista-corpo').style.display = 'none';
        document.getElementById('painel-total').style.display = 'block';
        let somaGeral = 0;
        let html = "<h4 style='color:var(--primary); border-bottom:2px solid var(--primary); padding-bottom:5px'>RESUMO DE COMPRAS (OK)</h4>";
        ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].forEach(d => {
            let totalDia = (db[d] || []).filter(it => it.estado === 2).reduce((acc, it) => acc + (it.p * it.qtd), 0);
            somaGeral += totalDia;
            if(totalDia > 0) html += `<div class="linha-rel"><span>${d}</span> <b>R$ ${totalDia.toFixed(2)}</b></div>`;
        });
        document.getElementById('relatorio-financeiro').innerHTML = html;
        document.getElementById('soma-semana').innerText = somaGeral.toLocaleString('pt-br', {minimumFractionDigits: 2});
    }

    function filtrarStatus(tipo, btn) {
        document.querySelectorAll('.btn-f').forEach(b => b.classList.remove('ativo-filtro'));
        btn.classList.add('ativo-filtro');
        
        document.querySelectorAll('.item-compra').forEach(item => {
            let estadoItem = item.getAttribute('data-estado');
            
            if (tipo === 'todos') {
                item.style.display = 'flex';
            } else if (tipo === 'falta') {
                // Estado 1 significa Planejado / Faltando (Vermelho)
                item.style.display = estadoItem === '1' ? 'flex' : 'none'; 
            } else if (tipo === 'ok') {
                // Estado 2 significa Comprado / OK (Verde)
                item.style.display = estadoItem === '2' ? 'flex' : 'none'; 
            }
        });
    }

    function filtrarItens() {
        let t = document.getElementById('campo-busca').value.toLowerCase();
        document.querySelectorAll('.item-compra').forEach(item => {
            item.style.display = item.querySelector('.nome-edit').value.toLowerCase().includes(t) ? 'flex' : 'none';
        });
    }

    function salvar() { localStorage.setItem('db_mondialle_v11_' + appAtivo, JSON.stringify(db)); }
    function trocarApp(novo) { appAtivo = novo; document.getElementById('fabMenu').classList.remove('show'); carregarApp(); }
    function finalizarSemana() { if(confirm("Isso apagará todas as marcações da semana. Continuar?")) { localStorage.removeItem('db_mondialle_v11_' + appAtivo); location.reload(); } }

    window.onload = carregarApp;