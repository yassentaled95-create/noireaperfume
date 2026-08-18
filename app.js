const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const productList = document.getElementById("product-list");

async function loadProducts() {
  productList.innerHTML = "<p>جاري تحميل العطور...</p>";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=*`,
      {
        method: "GET",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.status}`);
    }

    const products = await response.json();

    if (!products.length) {
      productList.innerHTML = "<p>لا توجد منتجات حاليًا.</p>";
      return;
    }

    productList.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");

      card.className = "product";

      card.innerHTML = `
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<div style="
                height:220px;
                background:#181818;
                border-radius:15px;
                display:flex;
                align-items:center;
                justify-content:center;
                color:#666;
              ">Noireá</div>`
        }

        <h3>${escapeHTML(product.name || "عطر Noireá")}</h3>

        <p class="price">
          ${product.price ?? 0} جنيه
        </p>
      `;

      productList.appendChild(card);
    });

  } catch (error) {
    console.error(error);

    productList.innerHTML = `
      <p>
        حصلت مشكلة في تحميل المنتجات.
      </p>
    `;
  }
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

loadProducts();
