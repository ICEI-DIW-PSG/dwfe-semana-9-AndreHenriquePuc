const data = {
  "produtos": [
    {
      "id": 1,
      "categoria": "pcs",
      "nome": "PC Gamer i9",
      "descricao": "Intel Core i9, RTX 4080, 32GB RAM, SSD 1TB.",
      "imagem": "Images/pc1.webp",
      "preco": 12499.90,
      "emEstoque": true
    },
    {
      "id": 2,
      "categoria": "pcs",
      "nome": "PC Home Office",
      "descricao": "Ryzen 7, 16GB RAM, SSD 512GB. Ideal para trabalho.",
      "imagem": "Images/pc2.webp",
      "preco": 3299.90,
      "emEstoque": true
    },
    {
      "id": 3,
      "categoria": "pcs",
      "nome": "PC Creator Studio",
      "descricao": "Core i7, RTX 4070, 32GB RAM. Para criadores de conteúdo.",
      "imagem": "Images/pc3.webp",
      "preco": 8799.90,
      "emEstoque": true
    },
    {
      "id": 4,
      "categoria": "celulares",
      "nome": "Samsung Galaxy S24",
      "descricao": "Snapdragon 8 Gen 3, câmera 200MP, 5000mAh.",
      "imagem": "Images/celular1.webp",
      "preco": 6999.90,
      "emEstoque": true
    },
    {
      "id": 5,
      "categoria": "celulares",
      "nome": "iPhone 15 Pro",
      "descricao": "Chip A17 Pro, câmera 48MP, design em titânio.",
      "imagem": "Images/celular2.webp",
      "preco": 9499.90,
      "emEstoque": true
    },
    {
      "id": 6,
      "categoria": "celulares",
      "nome": "Motorola Edge 40",
      "descricao": "pOLED 144Hz, 50MP, carregamento 68W.",
      "imagem": "Images/celular3.webp",
      "preco": 1899.90,
      "emEstoque": true
    },
    {
      "id": 7,
      "categoria": "notebooks",
      "nome": "Dell XPS 15",
      "descricao": "OLED 3.5K, Core i7, RTX 4060, 16GB RAM.",
      "imagem": "Images/notebooks1.webp",
      "preco": 11299.90,
      "emEstoque": true
    },
    {
      "id": 8,
      "categoria": "notebooks",
      "nome": "MacBook Air M3",
      "descricao": "Chip M3, Retina 15\", bateria de até 18 horas.",
      "imagem": "Images/notebooks2.webp",
      "preco": 10499.90,
      "emEstoque": true
    },
    {
      "id": 9,
      "categoria": "notebooks",
      "nome": "Lenovo LOQ Gamer",
      "descricao": "Ryzen 7, RTX 4060, tela 144Hz, 16GB RAM.",
      "imagem": "Images/notebooks3.webp",
      "preco": 5299.90,
      "emEstoque": true
    }
  ]
}

const pesquisa = document.querySelector("#search");
const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");
const Renderizar = document.getElementById("btnRender");
const categoria = document.querySelector("#category");

function formatPrice(preco)
{
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto)
{
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id )

  card.classList.add("card");
  card.style.border = "1px solid #ddd";
  card.style.padding = "12px";
  card.style.borderRadius = "8px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  img.style.width = "100%";

  const titulo = document.createElement("h2");
  titulo.classList.add("titulo");
  titulo.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.textContent = formatPrice(produto.preco);

  const cat = document.createElement("p");
  cat.textContent = "Categoria: " + produto.categoria;

  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Ver detalhes";
  btnDetalhes.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const btnDestaque = document.createElement("button");
  btnDestaque.textContent = "Destacar";
  btnDestaque.addEventListener("click", () => {
    card.classList.add("highlight");
  });

  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(preco);
  card.appendChild(cat);
  card.appendChild(btnDetalhes);
  card.appendChild(btnDestaque);

  return card;
}

function renderProducts(produtos) {
 lista.innerHTML = "";
 detalhes.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row");

  produtos.forEach(produto => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");
    col.appendChild(createProductCard(produto));
    row.appendChild(col);
  });

  lista.appendChild(row);

  document.querySelectorAll(".card[data-id]").forEach(card => {
    console.log("data-id:", card.getAttribute("data-id"));
  });
}
 
function renderCategories() {
  categoria.innerHTML = "<option value='todas'>Todas</option>";
 
  const cats = [...new Set(data.produtos.map(p => p.categoria))];
  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoria.appendChild(opt);
  });
}
 
function showProductDetails(produto) {
  detalhes.innerHTML = `
    <div class="card mt-4 p-3" style="border: 2px solid #0d6efd;">
      <h4>${produto.nome}</h4>
      <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      <p><strong>Estoque:</strong> ${produto.emEstoque ? "Em estoque" : "Fora de estoque"}</p>
      <p><strong>Descrição:</strong> ${produto.descricao}</p>
    </div>
  `;
}
 
function filterProducts() {
  const texto = pesquisa.value.toLowerCase();
  const cat   = categoria.value;
 
  return data.produtos.filter(p =>
    p.nome.toLowerCase().includes(texto) &&
    (cat === "todas" || p.categoria === cat)
  );
}
 
Renderizar.addEventListener("click",  () => renderProducts(filterProducts()));
pesquisa.addEventListener("input",   () => renderProducts(filterProducts()));
categoria.addEventListener("change", () => renderProducts(filterProducts()));
 
renderCategories();
renderProducts(data.produtos);
