document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#inputModal form");
  const tableBody = document.getElementById("itemTableBody");
  let itemCount = 1;
  let editRow = null;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 入力値を取得
    const name = document.getElementById("name").value;
    const spec = document.getElementById("spec").value;
    const quantity = Number(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;
    const unitPrice = Number(document.getElementById("unitPrice").value);
    const amount = quantity * unitPrice;
    const remark = document.getElementById("remark").value;
    const listPrice = Number(document.getElementById("listPrice").value);
    const listTotal = quantity * listPrice;
    const costPrice = Number(document.getElementById("costPrice").value);
    const costTotal = quantity * costPrice;
    const costRate = listPrice ? ((costPrice / listPrice) * 100).toFixed(2) + "%" : "";
    const sellRate = listPrice ? ((unitPrice / listPrice) * 100).toFixed(2) + "%" : "";
    const itemName = document.getElementById("itemName").value;
    const actual = document.getElementById("actual").value;
    const company = document.getElementById("company").value;

    // 最初の「データ未入力」行を削除
    if (tableBody.children.length === 1 &&
        tableBody.children[0].children[1].colSpan === 16) {
      tableBody.innerHTML = '';
    }

    if (editRow) {
      editRow.innerHTML = `
        <td>
          <button class="editBtn" style="background-color: green; color: white;">編集</button>
          <button class="deleteBtn" style="background-color: red; color: white;">削除</button>
        </td>
        <td>${editRow.children[1].textContent}</td>
        <td>${name}</td>
        <td>${spec}</td>
        <td>${quantity}</td>
        <td>${unit}</td>
        <td>${unitPrice}</td>
        <td>${amount}</td>
        <td>${remark}</td>
        <td>${listPrice}</td>
        <td>${listTotal}</td>
        <td>${costPrice}</td>
        <td>${costTotal}</td>
        <td>${costRate}</td>
        <td>${sellRate}</td>
        <td>${itemName}</td>
        <td>${actual}</td>
        <td>${company}</td>
      `;
      attachRowEvents(editRow);
      editRow = null;
    } else {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>
          <button class="editBtn" style="background-color: green; color: white;">編集</button>
          <button class="deleteBtn" style="background-color: red; color: white;">削除</button>
        </td>
        <td>${itemCount++}</td>
        <td>${name}</td>
        <td>${spec}</td>
        <td>${quantity}</td>
        <td>${unit}</td>
        <td>${unitPrice}</td>
        <td>${amount}</td>
        <td>${remark}</td>
        <td>${listPrice}</td>
        <td>${listTotal}</td>
        <td>${costPrice}</td>
        <td>${costTotal}</td>
        <td>${costRate}</td>
        <td>${sellRate}</td>
        <td>${itemName}</td>
        <td>${actual}</td>
        <td>${company}</td>
      `;
      tableBody.appendChild(newRow);
      attachRowEvents(newRow);
    }

    calculateTotals();

    const modal = bootstrap.Modal.getInstance(document.getElementById("inputModal"));
    modal.hide();

    form.reset();
  });

  function attachRowEvents(row) {
  const editBtn = row.querySelector(".editBtn");
  const deleteBtn = row.querySelector(".deleteBtn");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      editRow = row;
      const cells = row.children;
      document.getElementById("name").value = cells[2].textContent;
      document.getElementById("spec").value = cells[3].textContent;
      document.getElementById("quantity").value = cells[4].textContent;
      document.getElementById("unit").value = cells[5].textContent;
      document.getElementById("unitPrice").value = cells[6].textContent;
      document.getElementById("remark").value = cells[8].textContent;
      document.getElementById("listPrice").value = cells[9].textContent;
      document.getElementById("costPrice").value = cells[11].textContent;
      document.getElementById("itemName").value = cells[15].textContent;
      document.getElementById("actual").value = cells[16].textContent;
      document.getElementById("company").value = cells[17].textContent;

      const modalElement = document.getElementById("inputModal");
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (confirm("本当に削除しますか？")) {
        row.remove();
        calculateTotals();
      }
    });
  }
}


  function calculateTotals() {
    const rows = document.querySelectorAll("#itemTableBody tr");
    let totalAmount = 0;
    let totalListPrice = 0;
    let totalCost = 0;

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 18) return; // データ未入力行をスキップ

      const amount = parseFloat(cells[7].textContent) || 0;
      const listTotal = parseFloat(cells[10].textContent) || 0;
      const costTotal = parseFloat(cells[12].textContent) || 0;

      totalAmount += amount;
      totalListPrice += listTotal;
      totalCost += costTotal;
    });

    // 入値率合計 = 入値合計 ÷ 定価合計 × 100
      const costRateTotal = totalListPrice ? (totalCost / totalListPrice * 100).toFixed(2) + "%" : "0%";

      // 売値率合計 = 金額合計 ÷ 定価合計 × 100
      const sellRateTotal = totalListPrice ? (totalAmount / totalListPrice * 100).toFixed(2) + "%" : "0%";

      // 利益 = 金額合計 - 入値合計
      const profit = totalAmount - totalCost;

      // 利益率 = 利益 ÷ 金額合計 × 100
      const profitRate = totalAmount ? (profit / totalAmount * 100).toFixed(2) + "%" : "0%";

      // 各要素が存在しているかチェックしてから代入！
      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };

      // 表示
      document.getElementById("totalAmount").textContent = `¥${totalAmount.toLocaleString()}`;
      document.getElementById("totalListPrice").textContent = `¥${totalListPrice.toLocaleString()}`;
      document.getElementById("totalCostPrice").textContent = `¥${totalCost.toLocaleString()}`;
      document.getElementById("totalCostRate").textContent = costRateTotal;
      document.getElementById("totalSellRate").textContent = sellRateTotal;
      document.getElementById("totalProfit").textContent = `¥${profit.toLocaleString()}`;
      document.getElementById("totalProfitRate").textContent = profitRate;

    }

  function updateAutoFields() {
    const quantity = Number(document.getElementById("quantity").value);
    const unitPriceInput = document.getElementById("unitPrice");
    const costPrice = Number(document.getElementById("costPrice").value);
    const listPrice = Number(document.getElementById("listPrice").value);
    const actual = Number(document.getElementById("actual").value);

    if (!isNaN(costPrice) && costPrice > 0) {
      const autoUnitPrice = Math.ceil((costPrice * 1.3) / 100) * 100;
      unitPriceInput.value = autoUnitPrice;
    } else {
      unitPriceInput.value = "";
    }

    const updatedUnitPrice = Number(unitPriceInput.value);

    const amount = updatedUnitPrice * quantity;
    document.getElementById("amount").value = !isNaN(amount) ? amount : "";

    let listTotal = listPrice * quantity;
    if (isNaN(listTotal) || listTotal === 0) {
      listTotal = updatedUnitPrice * quantity;
    }
    document.getElementById("listTotal").value = !isNaN(listTotal) ? listTotal : "";

    let costTotal = !isNaN(actual) && actual > 0
      ? costPrice * actual
      : costPrice * quantity;
    document.getElementById("costTotal").value = !isNaN(costTotal) ? costTotal : "";

    let costRate = "";
    if (!isNaN(costPrice) && !isNaN(listPrice) && listPrice !== 0) {
      costRate = ((costPrice / listPrice) * 100).toFixed(2) + "%";
    }
    document.getElementById("costRate").value = costRate;

    let sellRate = "";
    if (!isNaN(updatedUnitPrice) && !isNaN(listPrice) && listPrice !== 0) {
      sellRate = ((updatedUnitPrice / listPrice) * 100).toFixed(2) + "%";
    }
    document.getElementById("sellRate").value = sellRate;
  }

  const inputsToWatch = [
    "quantity", "costPrice", "listPrice", "actual"
  ];

  inputsToWatch.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateAutoFields);
    }
  });
});
