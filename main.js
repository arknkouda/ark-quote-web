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

  // 会社選択による見積番号1の自動入力設定
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

  // 宛先選択による見積番号2の自動入力設定
  function setupDestinationSelect() {
    const destinationSelect = document.getElementById("destinationSelect");
    const estimateNo2 = document.getElementById("estimateNo2");
    if (!destinationSelect || !estimateNo2) return;

    const destinationCodeMap = {
      ricoh: "RIC",
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

  // 見積日付から見積番号3(YYMM)の自動入力設定
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

  // 作成者選択による見積番号5の自動入力設定
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


// 受取人＋担当者選択による見積番号6の自動入力設定
function setupEstimateNo6() {
  const recipientSelect = document.getElementById("destinationSelect"); // 宛先（会社名）
  const personSelect = document.getElementById("contactSelect");       // 担当者
  const orderSourceSelect = document.getElementById("orderFromSelect"); // 注文元
  const estimateNo6Input = document.getElementById("estimateNo6");    // 出力フィールド

  if (!recipientSelect || !personSelect || !orderSourceSelect || !estimateNo6Input) return;

  // 「リコージャパン株式会社」専用マッピング（注文元 + 担当者）
  const ricohMap = {
    "tokyo": {
      "ishii": "TI",
      "siga": "TS",
      "negisi" : "TN",
      "koyama" : "TK",
      "fujino" : "TF",
      "ikeda" : "TI",
      "tamura" : "TT",
      "watanabe" : "TW",
      "utimura" : "TU",
      "ishikawa" : "TI",
      "ookubo" : "TO",
      "akui" : "TA",
      "kobari" : "TK",
      "aoki" : "TA",
      "nagami" : "TN",
      "sakairi" : "TS",
    },
    "gunma": {
      "ishii": "GI",
      "siga": "GS",
      "negisi" : "GN",
      "koyama" : "GK",
      "fujino" : "GF",
      "ikeda" : "GI",
      "tamura" : "GT",
      "watanabe" : "GW",
      "utimura" : "GU",
      "ishikawa" : "GI",
      "ookubo" : "GO",
      "akui" : "GA",
      "kobari" : "GK",
      "aoki" : "GA",
      "nagami" : "GN",
      "sakairi" : "GS",
    },
    "nisitokyo": {
      "ishii": "NI",
      "siga": "NS",
      "negisi" : "NN",
      "koyama" : "NK",
      "fujino" : "NF",
      "ikeda" : "NI",
      "tamura" : "NT",
      "watanabe" : "NW",
      "utimura" : "NU",
      "ishikawa" : "NI",
      "ookubo" : "NO",
      "akui" : "NA",
      "kobari" : "NK",
      "aoki" : "NA",
      "nagami" : "NN",
      "sakairi" : "NS",
    },
    "kanagawa": {
      "ishii": "KI",
      "siga": "KS",
      "negisi" : "KN",
      "koyama" : "KK",
      "fujino" : "KF",
      "ikeda" : "KI",
      "tamura" : "KT",
      "watanabe" : "KW",
      "utimura" : "KU",
      "ishikawa" : "KI",
      "ookubo" : "KO",
      "akui" : "KA",
      "kobari" : "KK",
      "aoki" : "KA",
      "nagami" : "KN",
      "sakairi" : "KS",
    },
    "chiba": {
      "ishii": "CI",
      "siga": "CS",
      "negisi" : "CN",
      "koyama" : "CK",
      "fujino" : "CF",
      "ikeda" : "CI",
      "tamura" : "CT",
      "watanabe" : "CW",
      "utimura" : "CU",
      "ishikawa" : "CI",
      "ookubo" : "CO",
      "akui" : "CA",
      "kobari" : "CK",
      "aoki" : "CA",
      "nagami" : "CN",
      "sakairi" : "CS",
    },
    "saitama": {
      "ishii": "SI",
      "siga": "SS",
      "negisi" : "SN",
      "koyama" : "SK",
      "fujino" : "SF",
      "ikeda" : "SI",
      "tamura" : "ST",
      "watanabe" : "SW",
      "utimura" : "SU",
      "ishikawa" : "SI",
      "ookubo" : "SO",
      "akui" : "SA",
      "kobari" : "SK",
      "aoki" : "SA",
      "nagami" : "SN",
      "sakairi" : "SS",
    },
  };

  // 通常の会社 → 担当者ベース
  const personMap = {
    "ymanaka": "Y",
    "kobayashi": "K",
    "someya": "S",
    "hidaka": "H",
    "okumoto": "T",
    "simamura": "S",
    "sasakisyouhei": "SS",
    "furutani": "F",
    "matuda": "M",
    "sakaguchi": "SK",
    "harada": "H",
    "sato": "SH",
    "tonptsuka": "T",
    "imada": "I",
    "sakamoto": "S",
    "ogawa": "OG",
    "yamada": "Y",
    "oota": "OT",
    "kakimoto": "K",
    "namkamura": "N",
    "takaoka": "T",
    "fujimoto": "F",
    "yokota": "Y",
    "hashimoto": "H",
    "sonota": "E",
    "sasakiyukio": "S",
    "negisit": "N",
    "serikawa": "S",
    "asakura": "A",
  };

  function updateEstimateNo6() {
    const recipient = recipientSelect.value;
    const person = personSelect.value;
    const orderSource = orderSourceSelect.value;

    let result = "YY"; // 初期値（該当なし）

    if (recipient === "ricoh") {
      // 注文元 + 担当者 による完全一致
      if (ricohMap[orderSource] && ricohMap[orderSource][person]) {
        result = ricohMap[orderSource][person];
      }
    } else {
      // 通常の担当者ベース
      if (personMap[person]) {
        result = personMap[person];
      }
    }

    estimateNo6Input.value = result;

    // 最終見積番号も更新
    if (typeof updateFinalEstimateNo === "function") {
      updateFinalEstimateNo();
    }
  }

  // 変更時に自動更新
  recipientSelect.addEventListener("change", updateEstimateNo6);
  personSelect.addEventListener("change", updateEstimateNo6);
  orderSourceSelect.addEventListener("change", updateEstimateNo6);
}

setupDiscountToggle();
  setupEstimateDateLimit();
  setupCompanySelect();
  setupDestinationSelect();
  setupEstimateNo3();
  setupCreatorSelect();
  setupEstimateNo6(); // ← ← ← ★★★ これを追加！！
});

  //見積番号1～6による見積番号の自動入力設定
document.addEventListener("DOMContentLoaded", () => {
  const fieldIds = [
    "estimateNo1",
    "estimateNo2",
    "estimateNo3",
    "estimateNo4",
    "estimateNo5",
    "estimateNo6"
  ];

  const fields = fieldIds.map(id => document.getElementById(id));
  const estimateNoOutput = document.getElementById("estimateNo");
  const estimateNo7 = document.getElementById("estimateNo7"); // 枝番

  function updateEstimateNo() {
    const values = fields.map(field => field?.value.trim() || "");
    const allFilled = values.every(val => val !== "");

    if (allFilled) {
      let fullEstimateNo = values.join("");

      const extra = estimateNo7?.value.trim();
      if (extra) {
        fullEstimateNo += extra; // 枝番も追加（ハイフンなし）
      }

      estimateNoOutput.value = fullEstimateNo;
    } else {
      estimateNoOutput.value = "";
    }
  }

  // 全フィールドにイベントリスナー追加（枝番も含む）
  fields.forEach(field => {
    if (!field) return;
    field.addEventListener("input", updateEstimateNo);
    field.addEventListener("change", updateEstimateNo);
  });

  if (estimateNo7) {
    estimateNo7.addEventListener("input", updateEstimateNo);
    estimateNo7.addEventListener("change", updateEstimateNo);
  }

  //工事種類の選択による内容の自動入力設定
document.addEventListener("DOMContentLoaded", function () {
  const workContent = document.getElementById("workContent");

  // ラジオボタンの取得（nameが共通のもの）
  const koujiRadios = document.querySelectorAll("input[name='koujiType']");

  const koujiContentMap = {
    "koujiType1": "照明LED化工事",
    "koujiType2": "空調設備工事"
  };

  koujiRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      if (radio.checked) {
        const content = koujiContentMap[radio.id] || "";
        workContent.value = content;
      }
    });
  });
});

  //注文元の選択による注文番号の自動入力設定
document.addEventListener("DOMContentLoaded", function () {
  const orderFromSelect = document.getElementById("orderFromSelect");
  const orderNumber1 = document.getElementById("orderNumber1");

  const orderNumberMap = {
    tokyo: "408",
    gunma: "305",
    nisitokyo: "403",
    kanagawa: "405",
    chiba: "401",
    saitama: "304"
  };

  orderFromSelect.addEventListener("change", function () {
    const selectedValue = orderFromSelect.value;
    orderNumber1.value = orderNumberMap[selectedValue] || "";
  });
});

//宛先と注文元と注文番号1と注文番号2によって注文番号を自動入力する設定
document.addEventListener('DOMContentLoaded', () => {
  const destinationSelect = document.getElementById('destinationSelect');  // 宛先
  const orderNumber1 = document.getElementById('orderNumber1');          // 注文番号1（注文元に応じて自動入力）
  const orderNumber2 = document.getElementById('orderNumber2');          // 注文番号2（ユーザー入力）
  const orderFromSelect = document.getElementById('orderFromSelect');    // 注文元
  const orderNumberFull = document.getElementById('orderNumberFull');    // 完成注文番号（自動生成）

  // 注文元によって注文番号1を自動設定する関数
  function updateOrderNumber1() {
    const orderFrom = orderFromSelect.value;
    // 注文元別の注文番号1のマッピング（例）
    const orderNumberMap = {
      tokyo: '408',
      gunma: '305',
      nisitokyo: '403',
      kanagawa: '405',
      chiba: '401',
      saitama: '304'
    };

    orderNumber1.value = orderNumberMap[orderFrom] || '';
  }

document.addEventListener('DOMContentLoaded', () => {
  const destinationSelect = document.getElementById('destinationSelect'); // 宛先（B4）
  const orderNumber1 = document.getElementById('orderNumber1');           // 注文番号1（E16）
  const orderNumber2 = document.getElementById('orderNumber2');           // 注文番号2（E17）
  const orderNumberFull = document.getElementById('orderNumberFull');     // 出力先

  function updateOrderNumberFull() {
    const destination = destinationSelect?.value?.trim() || "";
    const no1 = orderNumber1?.value?.trim() || "";
    const no2 = orderNumber2?.value?.trim() || "";

    if (no2 !== "" && no2 !== "0000000000" && no2 !== "000000000") {
      if (destination === "リコージャパン株式会社") {
        orderNumberFull.value = `${no1}-JS${no2}`;
      } else {
        orderNumberFull.value = no2;
      }
    } else {
      orderNumberFull.value = "";
    }
  }

  destinationSelect?.addEventListener('change', updateOrderNumberFull);
  orderNumber1?.addEventListener('input', updateOrderNumberFull);
  orderNumber2?.addEventListener('input', updateOrderNumberFull);
});
  function updateOrderNumberFull() {
  const orderNumber1 = document.getElementById('orderNumber1').value.trim();
  const orderNumber2 = document.getElementById('orderNumber2').value.trim(); 
  const destination = document.getElementById('destinationSelect').value.trim(); 
  const orderNumberFull = document.getElementById('orderNumberFull'); // 出力先

  if (orderNumber2 !== "000000000") {
    if (destination === "ricoh") {
      orderNumberFull.value = `${orderNumber1}-JS${orderNumber2}`;
    } else {
      orderNumberFull.value = orderNumber2;
    }
  } else {
    orderNumberFull.value = "";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const destinationSelect = document.getElementById('destinationSelect');
  const orderNumber2 = document.getElementById('orderNumber2');

  destinationSelect.addEventListener('change', updateOrderNumberFull);
  orderNumber2.addEventListener('input', updateOrderNumberFull);
});

  // 初期化や変更時のイベント設定
  orderFromSelect.addEventListener('change', () => {
    updateOrderNumber1();
    updateOrderNumberFull();
  });
  orderNumber2.addEventListener('input', updateOrderNumberFull);
  destinationSelect.addEventListener('change', updateOrderNumberFull);
});