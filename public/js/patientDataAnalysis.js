function patientDataAnalysis() {
  const test = document.getElementById("test");
  const data = JSON.parse(test.innerHTML);
  test.innerHTML = "";
  console.log(data);

  let tags = document.getElementsByClassName("pda-data-tag");
  let currentSelected = document.getElementsByClassName(
    "pda-data-tag pda-selected"
  )[0];

  let dailyArea = document.getElementsByClassName("pda-daily-area")[0];
  let weeklyArea = document.getElementsByClassName("pda-weekly-area")[0];
  let monthlyArea = document.getElementsByClassName("pda-monthly-area")[0];
  let areaList = [dailyArea, weeklyArea, monthlyArea];
  let currentSelectedArea = dailyArea;
  for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener("click", () => {
      if (!tags[i].classList.contains("pda-selected")) {
        currentSelected.classList.remove("pda-selected");
        currentSelectedArea.classList.add("pda-hidden");
        tags[i].classList.add("pda-selected");
        areaList[i].classList.remove("pda-hidden");
        currentSelected = tags[i];
        currentSelectedArea = areaList[i];
      }
    });
  }
}

patientDataAnalysis();
