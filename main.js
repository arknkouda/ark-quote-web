document.addEventListener("DOMContentLoaded", function () {
  // 割引チェックボックスと金額入力連動
  function setupDiscountToggle() {
    const discountCheck = document.getElementById("discountCheck");
    const discountAmount = document.getElementById("discountAmount");
    if (!discountCheck || !discountAmount) return;

    function toggleDiscountInput() {
      discountAmount.disabled = !discountCheck.checked;
      if (!discountCheck.checked) discountAmount.value = "";
    }
    toggleDiscountInput();
    discountCheck.addEventListener("change", toggleDiscountInput);
  }

  // 見積日付から期限日付の自動計算
  function setupEstimateDateLimit() {
    const estimateDate = document.getElementById("estimateDate");
    const limitDate = document.getElementById("limitDate");
    if (!estimateDate || !limitDate) return;

    estimateDate.addEventListener("change", function () {
      const estimate = new Date(estimateDate.value);
      if (!isNaN(estimate.getTime())) {
        const deadline = new Date(estimate);
        deadline.setMonth(deadline.getMonth() + 3);

        if (deadline.getDate() !== estimate.getDate()) {
          deadline.setDate(0);
        }

        const yyyy = deadline.getFullYear();
        const mm = String(deadline.getMonth() + 1).padStart(2, "0");
        const dd = String(deadline.getDate()).padStart(2, "0");
        limitDate.value = `${yyyy}-${mm}-${dd}`;
      } else {
        limitDate.value = "";
      }
    });
  }

  // 会社選択による見積番号パーツ1設定
  function setupCompanySelect() {
    const companySelect = document.getElementById("companySelect");
    const estimateNo1 = document.getElementById("estimateNo1");
    if (!companySelect || !estimateNo1) return;

    const companyCodeMap = {
      sd: "SD",
      af: "AF",
      ak: "AK",
      at: "AT",
    };

    companySelect.addEventListener("change", function () {
      estimateNo1.value = companyCodeMap[companySelect.value] || "";
    });
  }

  // 宛先選択による見積番号パーツ2設定
  function setupDestinationSelect() {
    const destinationSelect = document.getElementById("destinationSelect");
    const estimateNo2 = document.getElementById("estimateNo2");
    if (!destinationSelect || !estimateNo2) return;

    const destinationCodeMap = {
      ric: "RIC",
      sai: "SAI",
      irh: "IRH",
      knd: "KND",
      lnt: "LNT",
      snt: "SNT",
      gne: "GNE",
      umu: "UMU",
      umj: "UMJ",
      rik: "RIK",
      etj: "ETJ",
      khs: "KHS",
      koi: "KOI",
      iri: "IRI",
      ens: "ENS",
      lux: "LUX",
      ecp: "ECP",
      iws: "IWS",
      kdk: "KDK",
      tkd: "TKD",
      tkt: "TKT",
      tnt: "TNT",
      mza: "MZA",
      dkn: "DKN",
      nsd: "NSD",
      lbt: "LBT",
      fgk: "FGK",
      esm: "ESM",
    };

    destinationSelect.addEventListener("change", function () {
      estimateNo2.value = destinationCodeMap[destinationSelect.value] || "";
    });
  }

  // 見積日付から見積番号パーツ3(YYMM)設定
  function setupEstimateNo3() {
    const estimateDateInput = document.getElementById("estimateDate");
    const estimateNo3Input = document.getElementById("estimateNo3");
    if (!estimateDateInput || !estimateNo3Input) return;

    estimateDateInput.addEventListener("change", function () {
      const dateValue = estimateDateInput.value;
      if (!dateValue) {
        estimateNo3Input.value = "";
        return;
      }

      const date = new Date(dateValue);
      const year = date.getFullYear().toString().slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      estimateNo3Input.value = `${year}${month}`;
    });
  }

  // 作成者選択による見積番号パーツ5設定
  function setupCreatorSelect() {
    const creatorSelect = document.getElementById("creatorSelect");
    const estimateNo5Input = document.getElementById("estimateNo5");
    if (!creatorSelect || !estimateNo5Input) return;

    const creatorMap = {
      nb: "NB",
      ts: "TS",
    };

    creatorSelect.addEventListener("change", function () {
      estimateNo5Input.value = creatorMap[creatorSelect.value] || "";
    });
  }

  // 受取人＋担当者選択による見積番号パーツ6設定
  function setupRecipientPerson() {
    const recipientSelect = document.getElementById("recipientSelect");
    const personSelect = document.getElementById("personSelect");
    const estimateNo6Input = document.getElementById("estimateNo6");
    if (!recipientSelect || !personSelect || !estimateNo6Input) return;

    function updateEstimateNo6() {
      const recipient = recipientSelect.value;
      const person = personSelect.value;
      estimateNo6Input.value = recipient && person ? recipient + person : "";
    }

    recipientSelect.addEventListener("change", updateEstimateNo6);
    personSelect.addEventListener("change", updateEstimateNo6);
  }

  // 初期化処理まとめて呼び出し
  setupDiscountToggle();
  setupEstimateDateLimit();
  setupCompanySelect();
  setupDestinationSelect();
  setupEstimateNo3();
  setupCreatorSelect();
  setupRecipientPerson();
});

function setupFinalEstimateNo() {
  const estimateNo1 = document.getElementById("estimateNo1");
  const estimateNo2 = document.getElementById("estimateNo2");
  const estimateNo3 = document.getElementById("estimateNo3");
  const estimateNo5 = document.getElementById("estimateNo5");
  const estimateNo6 = document.getElementById("estimateNo6");
  const finalEstimateNo = document.getElementById("estimateNo"); // HTMLで用意しておいてね！

  function updateFinalEstimateNo() {
    const parts = [
      estimateNo1?.value || "",
      estimateNo2?.value || "",
      estimateNo3?.value || "",
      estimateNo5?.value || "",
      estimateNo6?.value || "",
    ];
    finalEstimateNo.value = parts.join("-");
  }

  [estimateNo1, estimateNo2, estimateNo3, estimateNo5, estimateNo6].forEach((input) => {
    input?.addEventListener("input", updateFinalEstimateNo);
  });

  updateFinalEstimateNo();
}