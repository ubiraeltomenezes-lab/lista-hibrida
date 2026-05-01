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
    { n: "Tempero Completo", p: 20 }, { n: "Canela", p: 0 }, { n: "Molho Inglês", p: 7 },
    { n: "Óleo", p: 7 }, { n: "Óleo de Algodão", p: 180 }, { n: "Caldo de Galinha", p: 17 },
    { n: "Caldo de Legumes", p: 15 }, { n: "Colorau", p: 15 }, { n: "Café", p: 30 },
    { n: "Farinha de Mandi", p: 30 }, { n: "Arroz", p: 21 }, { n: "Manteiga", p: 33 },
    { n: "Batata Palha", p: 20 }, { n: "Bobina Impressora", p: 5 }, { n: "Azeite", p: 20 },
    { n: "Copo Descartável", p: 8 }, { n: "Óleo Composto", p: 10 }, { n: "Papel Alumínio", p: 5 },
    { n: "Papel Toalha", p: 0 }, { n: "Bobina", p: 20 }, { n: "Sacola Plástica", p: 20 },
    { n: "Sachê Maionese", p: 25 }, { n: "Guardanapo", p: 0 }, { n: "Cloro", p: 9 },
    { n: "Sabão em Pó", p: 20 }, { n: "Desinfetante", p: 10 }, { n: "Bombril", p: 3 },
    { n: "Esponja", p: 0 }, { n: "Álcool", p: 10 }, { n: "Papel Higiênico", p: 0 },
    { n: "Detergente", p: 10 }, { n: "Vassoura", p: 0 }, { n: "Rodo", p: 0 },
    { n: "Pano de Chão", p: 0 }, { n: "Pá de Lixo", p: 20 }, { n: "Pano de Prato", p: 0 },
    { n: "SBP", p: 17 }, { n: "Saco de Lixo", p: 15 }, { n: "Desengordurante", p: 20 },
    { n: "Pasta de Brilho", p: 8 }
],
            BEBIDAS: [
                { n: "Guaraviton", p: 5.50 }, { n: "Coca 600", p: 7.00 }, { n: "Coca Lata", p: 5.00 }, { n: "Heineken", p: 18.00 },
                { n: "Skol", p: 10.00 }, { n: "Original", p: 12.00 }
            ],
            CASA: [
                { n: "Arroz", p: 30.00, c: "Mercearia" }, { n: "Feijão", p: 9.00, c: "Mercearia" }, { n: "sal", p: 10.00, c: "Mercearia" }, { n: "Café", p: 18.00, c: "Mercearia" }, { n: "Banana", p: 5.00, c: "Hortifruti" },
                { n: "Sabonete", p: 3.00, c: "Higiene" }, { n: "Amaciante", p: 15.00, c: "Limpeza" }
            ]
        };

        let appAtivo = 'PIZZARIA';
        let diaAtual = 'SEG';
        let db = {};

        function carregarApp() {
            const salvo = localStorage.getItem('db_pro_v8_' + appAtivo);
            db = salvo ? JSON.parse(salvo) : {};
            document.getElementById('app-header').innerText = (appAtivo === 'PIZZARIA' ? 'MONDIALLE PIZZARIA' : appAtivo === 'BEBIDAS' ? 'LISTA BEBIDAS' : 'COMPRAS CASA');

            // Reset de interface e seleção da Segunda
            mudarDia('SEG', document.getElementById('btn-seg'));
        }

        function inicializarDia() {
            if (!db[diaAtual]) {
                db[diaAtual] = BASES[appAtivo].map(p => ({ ...p, qtd: 1, estado: 0 }));
            }
        }

        function atualizarSomaPendentes() {
            let pendentes = db[diaAtual].filter(it => it.estado === 1);
            let soma = pendentes.reduce((acc, it) => acc + (it.p * it.qtd), 0);

            document.getElementById('num-pendentes').innerText = pendentes.length;
            document.getElementById('valor-pendentes').innerText = soma.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }

        function renderizar() {
            const corpo = document.getElementById('lista-corpo');
            const painel = document.getElementById('painel-total');
            const busca = document.getElementById('box-busca');

            painel.style.display = 'none';
            corpo.style.display = 'block';
            busca.style.display = 'block';
            corpo.innerHTML = '';

            inicializarDia();
            atualizarSomaPendentes();

            let lastCat = "";
            db[diaAtual].forEach((item, i) => {
                if (item.c && item.c !== lastCat) {
                    corpo.innerHTML += `<div class="categoria-label">${item.c}</div>`;
                    lastCat = item.c;
                }
                const div = document.createElement('div');
                div.className = `item-compra ${item.estado === 1 ? 'planejado' : (item.estado === 2 ? 'comprado' : '')}`;
                div.setAttribute('data-estado', item.estado);
                div.innerHTML = `
                <div class="linha">
                    <button class="btn-status" style="background: ${item.estado === 1 ? 'var(--secondary)' : (item.estado === 2 ? 'var(--green)' : '#eee')}" onclick="mudarEstado(${i})"></button>
                    <input type="text" class="nome-edit" value="${item.n}" onchange="editarNome(${i}, this.value)">
                    <input type="number" step="0.01" class="preco-edit" value="${item.p}" onchange="editarPreco(${i}, this.value)">
                    <div class="controles">
                        <button class="btn-qtd" onclick="alterarQtd(${i}, -1)">-</button>
                        <span style="min-width:20px; text-align:center">${item.qtd}</span>
                        <button class="btn-qtd" onclick="alterarQtd(${i}, 1)">+</button>
                    </div>
                </div>`;
                corpo.appendChild(div);
            });
        }

        function mudarDia(dia, btn) {
            diaAtual = dia;
            document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('ativo'));
            if (btn) btn.classList.add('ativo');
            renderizar();
            window.scrollTo(0, 0);
        }

        function mudarEstado(i) {
            db[diaAtual][i].estado = (db[diaAtual][i].estado + 1) % 3;
            salvar();
            renderizar();
        }

        function editarPreco(i, v) {
            db[diaAtual][i].p = parseFloat(v) || 0;
            salvar();
            atualizarSomaPendentes();
        }

        function editarNome(i, v) {
            db[diaAtual][i].n = v.toUpperCase();
            salvar();
        }

        function alterarQtd(i, v) {
            db[diaAtual][i].qtd = Math.max(1, db[diaAtual][i].qtd + v);
            salvar();
            renderizar();
        }

        function salvar() {
            localStorage.setItem('db_pro_v8_' + appAtivo, JSON.stringify(db));
        }

        function mostrarRelatorio(btn) {
            document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            document.getElementById('lista-corpo').style.display = 'none';
            document.getElementById('box-busca').style.display = 'none';
            document.getElementById('painel-total').style.display = 'block';

            let somaTotal = 0;
            let resumoFin = '<div class="titulo-secao">📅 Gasto Diário (Apenas Comprados)</div>';
            let resumoItens = '<div class="titulo-secao">✅ Resumo da Semana</div>';
            let itensComprados = {};

            ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].forEach(d => {
                let totalDia = 0;
                if (db[d]) {
                    db[d].forEach(it => {
                        if (it.estado === 2) {
                            let sub = it.p * it.qtd;
                            totalDia += sub;
                            if (!itensComprados[it.n]) itensComprados[it.n] = { q: 0, v: 0 };
                            itensComprados[it.n].q += it.qtd;
                            itensComprados[it.n].v += sub;
                        }
                    });
                }
                somaTotal += totalDia;
                resumoFin += `<div class="linha-rel"><span>${d}</span> <strong>R$ ${totalDia.toFixed(2)}</strong></div>`;
            });

            for (let nome in itensComprados) {
                resumoItens += `<div class="linha-rel"><span>${nome} (${itensComprados[nome].q}x)</span> <span>R$ ${itensComprados[nome].v.toFixed(2)}</span></div>`;
            }

            document.getElementById('relatorio-financeiro').innerHTML = resumoFin;
            document.getElementById('relatorio-itens').innerHTML = resumoItens;
            document.getElementById('soma-semana').innerText = somaTotal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }

        function trocarApp(novo) {
            appAtivo = novo;
            document.getElementById('fabMenu').classList.remove('show');
            carregarApp();
        }

        function filtrarStatus(tipo, btn) {
            document.querySelectorAll('.btn-f').forEach(b => b.classList.remove('ativo-filtro'));
            btn.classList.add('ativo-filtro');
            document.querySelectorAll('.item-compra').forEach(item => {
                let est = item.getAttribute('data-estado');
                item.style.display = (tipo === 'todos' || (tipo === 'falta' && est === '1') || (tipo === 'ok' && est === '2')) ? 'flex' : 'none';
            });
        }

        function filtrarItens() {
            let t = document.getElementById('campo-busca').value.toLowerCase();
            document.querySelectorAll('.item-compra').forEach(item => {
                item.style.display = item.querySelector('.nome-edit').value.toLowerCase().includes(t) ? 'flex' : 'none';
            });
        }

        function finalizarSemana() {
            if (confirm("Deseja LIMPAR esta lista?")) {
                localStorage.removeItem('db_pro_v8_' + appAtivo);
                location.reload();
            }
        }
        function adicionarNovoItem() {
    const nome = prompt("Nome do novo item:");
    if (!nome) return; // Cancela se não digitar nada

    const preco = parseFloat(prompt("Preço (ex: 25.50):")) || 0;

    // Cria o objeto do novo item
    const novoItem = {
        n: nome.charAt(0).toUpperCase() + nome.slice(1), // Primeira letra maiúscula
        p: preco,
        qtd: 1,
        estado: 0
    };

    // Adiciona na lista do dia atual
    db[diaAtual].push(novoItem);

    // Salva no LocalStorage e atualiza a tela
    salvar();
    renderizar();
}

        window.onload = carregarApp;