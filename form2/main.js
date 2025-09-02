document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#inputModal form");
  const tableBody = document.getElementById("itemTableBody");
  let itemCount = 1;

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
    const costRate = listPrice ? ((costPrice / listPrice) * 100).toFixed(1) + "%" : "";
    const sellRate = listPrice ? ((unitPrice / listPrice) * 100).toFixed(1) + "%" : "";
    const itemName = document.getElementById("itemName").value;
    const actual = document.getElementById("actual").value;
    const company = document.getElementById("company").value;

    // 最初の「データ未入力」行を削除
    if (tableBody.children.length === 1 &&
        tableBody.children[0].children[1].colSpan === 16) {
      tableBody.innerHTML = '';
    }

    // テーブルに行を追加
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
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

    // モーダルを閉じる
    const modal = bootstrap.Modal.getInstance(document.getElementById("inputModal"));
    modal.hide();

    // フォームリセット
    form.reset();
  });
});
