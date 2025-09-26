document.addEventListener("DOMContentLoaded", function () {
  const constructionForm = document.getElementById("constructionForm");
  const constructionTableBody = document.querySelector(".construction-scroll tbody");
  const unitSelect = document.getElementById("unitSelect");
  const contentSelect = document.getElementById("contentSelect");

  const lightUse = constructionForm.querySelector('input[name="lightUse"]');
  const quantity = constructionForm.querySelector('input[name="quantity"]');
  const count = constructionForm.querySelector('input[name="count"]');
  const basePrice = constructionForm.querySelector('input[name="basePrice"]');
  const fixedPrice = constructionForm.querySelector('input[name="fixedPrice"]');

  const koujiTypeElectric = document.getElementById("koujiType1");
  const koujiTypeAir = document.getElementById("koujiType2");
  const modal = document.getElementById("constructionModal");

  const itemNameInput = constructionForm.querySelector('select[name="itemName"]'); // 項目名(select)
  const basePriceInput = constructionForm.querySelector('input[name="basePrice"]'); // 基本単価(input)

  let rowCount = 1;
  let editingRow = null;

  // 自動で「本数」を計算
  modal.addEventListener("shown.bs.modal", function () {
    const lightUseInput = modal.querySelector('input[name="lightUse"]');
    const quantityInput = modal.querySelector('input[name="quantity"]');
    const countInput = modal.querySelector('input[name="count"]');

    function updateCount() {
      const lightUseVal = parseFloat(lightUseInput.value);
      const quantityVal = parseFloat(quantityInput.value);
      const isElectric = koujiTypeElectric && koujiTypeElectric.checked;

      if (!isElectric || isNaN(lightUseVal) || lightUseInput.value.trim() === "") {
        countInput.value = "";
        return;
      }

      if (!isNaN(lightUseVal) && !isNaN(quantityVal)) {
        countInput.value = lightUseVal * quantityVal;
      } else {
        countInput.value = "";
      }
    }

    lightUseInput.addEventListener("input", updateCount);
    quantityInput.addEventListener("input", updateCount);
    koujiTypeElectric.addEventListener("change", updateCount);
    koujiTypeAir.addEventListener("change", updateCount);
  });

  // 登録処理
  constructionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const unit = unitSelect.value;
    const content = contentSelect.value;

    if (editingRow) {
      const cells = editingRow.children;
      cells[2].textContent = itemNameInput.value;
      cells[3].textContent = lightUse.value;
      cells[4].textContent = quantity.value;
      cells[5].textContent = unit;
      cells[6].textContent = content;
      cells[7].textContent = count.value;
      cells[8].textContent = basePrice.value;
      cells[15].textContent = fixedPrice.value;
      cells[16].textContent = ""; // 小計は削除

      editingRow.classList.remove("table-success");
      editingRow = null;
    } else {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>
          <button class="btn btn-sm btn-success edit-row">編集</button>
          <button class="btn btn-sm btn-danger delete-row ms-1">削除</button>
        </td>
        <td>${rowCount++}</td>
        <td>${itemNameInput.value}</td>
        <td>${lightUse.value}</td>
        <td>${quantity.value}</td>
        <td>${unit}</td>
        <td>${content}</td>
        <td>${count.value}</td>
        <td>${basePrice.value}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>${fixedPrice.value}</td> <!-- 確定単価 -->
        <td></td> <!-- 小計 -->
        <td>
          <input type="checkbox" class="row-coeff" />
        </td> <!-- 係数 -->
      `;

      const emptyRow = constructionTableBody.querySelector("tr td[colspan]");
      if (emptyRow) emptyRow.parentElement.remove();

      constructionTableBody.appendChild(tr);
    }

    constructionForm.reset();
    unitSelect.value = "";
    contentSelect.value = "";

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById("constructionModal"));
    modalInstance.hide();
  });

  // 行番号の再計算と空行挿入
  function updateRowNumbers() {
    const rows = constructionTableBody.querySelectorAll("tr");
    rowCount = 1;

    rows.forEach(row => {
      const noCell = row.querySelector("td:nth-child(2)");
      if (noCell) noCell.textContent = rowCount++;
    });

    if (rows.length === 0) {
      constructionTableBody.innerHTML = `
        <tr>
          <td colspan="19">データ未入力</td>
        </tr>
      `;
    }
  }

  // 自動セット用の関数
  function updateBasePrice() {
    const itemName = itemNameInput.value.trim();
    const content = contentSelect.value;

    if ((itemName === "照明40W" || itemName === "照明20W")) {
      if (content === "交換工事") {
        basePriceInput.value = "3500";
      } else {
        basePriceInput.value = "1500";
      }
    } else {
      basePriceInput.value = "";
    }
  }

  itemNameInput.addEventListener("input", updateBasePrice);
  contentSelect.addEventListener("change", updateBasePrice);
});

document.addEventListener("DOMContentLoaded", () => {
  const profitInputs = {
    day: document.querySelector('input[name="profit_day"]'),
    night: document.querySelector('input[name="profit_night"]'),
    high: document.querySelector('input[name="profit_high"]'),
    special: document.querySelector('input[name="profit_special"]'),
    waste: document.querySelector('input[name="profit_waste"]'),
    adjust: document.querySelector('input[name="profit_adjust"]'),
  };

  const tbody = document.querySelector(".construction-scroll tbody");

  // 係数のチェックボックス（ヘッダーに1個ずつ）
  const coeffChecks = document.querySelectorAll(".coeffCheck"); // 係数のチェックボックス

  function toNumber(value) {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  }

  function roundUp10yen(num) {
    return Math.ceil(num / 10) * 10;
  }

  // 計算を実行
  function updateAllRows() {
    const coeffChecked = {};
    coeffChecks.forEach(chk => {
      const type = chk.dataset.type;
      coeffChecked[type] = chk.checked;
    });

    const types = ["day", "night", "high", "special", "waste", "adjust"];
    const columnIndexMap = {
      day: 9,
      night: 10,
      high: 11,
      special: 12,
      waste: 13,
      adjust: 14,
    };

  document.addEventListener("DOMContentLoaded", () => {
  const profitInputs = {
    day: document.querySelector('input[name="profit_day"]'),
    night: document.querySelector('input[name="profit_night"]'),
    high: document.querySelector('input[name="profit_high"]'),
    special: document.querySelector('input[name="profit_special"]'),
    waste: document.querySelector('input[name="profit_waste"]'),
    adjust: document.querySelector('input[name="profit_adjust"]'),
  };

  const tbody = document.querySelector(".construction-scroll tbody");
  const coeffChecks = document.querySelectorAll(".coeffCheck"); // 係数のチェックボックス

  function toNumber(value) {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  }

  function roundUp10yen(num) {
    return Math.ceil(num / 10) * 10;
  }

  // 計算を実行
  function updateAllRows() {
    const coeffChecked = {};
    coeffChecks.forEach(chk => {
      const type = chk.dataset.type;
      coeffChecked[type] = chk.checked;
    });

    const types = ["day", "night", "high", "special", "waste", "adjust"];
    const columnIndexMap = {
      day: 9,
      night: 10,
      high: 11,
      special: 12,
      waste: 13,
      adjust: 14,
    };

    // 施工内容の行を一つ一つ処理
    document.querySelectorAll(".construction-scroll tbody tr").forEach(row => {
      const basePrice = parseFloat(row.children[8]?.textContent) || 0;
      if (basePrice <= 0) {
        row.children[15].textContent = "0"; // 確定単価
        types.forEach(type => {
          const idx = columnIndexMap[type];
          if (row.children[idx]) row.children[idx].textContent = "0"; // 利益項目（昼間、夜間、など）の列
        });
        return;
      }

      let total = 0;

      types.forEach(type => {
        const idx = columnIndexMap[type];
        const profitVal = parseFloat(profitInputs[type]?.value) || 0;
        const rowCheck = row.querySelector(`input.row-check[data-type="${type}"]`);
        const rowChecked = rowCheck?.checked ?? false;

        if (profitVal > 0 && (rowChecked || coeffChecked[type])) {
          const calc = roundUp10yen(basePrice * profitVal);
          total += calc;
          if (row.children[idx]) {
            row.children[idx].textContent = calc;
          }
        } else {
          if (row.children[idx]) {
            row.children[idx].textContent = "0";
          }
        }
      });

      // 確定単価に合計を設定
      row.children[15].textContent = total > 0 ? total : "0"; // 確定単価
    });
  }

  // イベント設定（利益入力、施工内容チェック、係数チェック）
  Object.values(profitInputs).forEach(input => input.addEventListener("input", updateAllRows));
  tbody.addEventListener("change", (e) => {
    if (e.target.classList.contains("row-check")) updateAllRows();
  });
  coeffChecks.forEach(chk => chk.addEventListener("change", updateAllRows));

  // 最初に一回計算
  updateAllRows();
});

  }})