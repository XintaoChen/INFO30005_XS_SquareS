import {
  dateFormat,
  dayFormat,
  dateMonthFormat,
  listOfWeek,
  listOfMonth,
} from "./utils/formatDate.js";
function patientDataAnalysis() {
  const test = document.getElementById("test");
  const data = JSON.parse(test.innerHTML);
  const hashMap = data.weeklyData;
  const healthDataList = data.healthDataList;
  test.innerHTML = "";
  console.log(data);
  let selectDate = new Date(CalenderPlugin.prototype.getDate());
  let currentSelected = document.getElementsByClassName(
    "pda-data-tag pda-selected"
  )[0];
  let titleArea = document.getElementsByClassName("pda-title-area")[0];
  titleArea.children[0].innerHTML = `
      <span>${dayFormat(selectDate)}</span>
      <span>${dateMonthFormat(selectDate)}</span>
    `;

  function updateDate() {
    let dailyArea = document.getElementsByClassName("pda-daily-area")[0];
    dailyArea.innerHTML = "<div></div>";
    selectDate = new Date(window.calenderPlugin.getDate());
    titleArea.children[0].innerHTML = `
      <span>${dayFormat(selectDate)}</span>
      <span>${dateMonthFormat(selectDate)}</span>
    `;
    let enterred = 0;
    let thisData = hashMap[dateFormat(selectDate)];
    for (let i = 0; i < healthDataList.length; i++) {
      let recordNode = document.createElement("div");
      recordNode.classList.add("pda-daily-record");
      if (thisData && thisData.records[i].value !== undefined) {
        recordNode.innerHTML = generateRecord(
          healthDataList[i].dataName,
          thisData.records[i].value,
          thisData.records[i].unit,
          dateFormat(thisData.records[i].date),
          thisData.records[i].comment
        );
        if (thisData.records[i].comment !== "") {
          recordNode.classList.add("pda-comment-enterred");
        }
        enterred++;
      } else if (thisData && thisData.records[i].isRequired === false) {
        recordNode.innerHTML = generateRecord(
          healthDataList[i].dataName,
          "-",
          "",
          "Not required"
        );
        recordNode.classList.add("pda-not-required");
      } else {
        recordNode.innerHTML = generateRecord(
          healthDataList[i].dataName,
          "?",
          "",
          "No record"
        );
      }
      let commentArea = recordNode.children[1].children[1];
      recordNode.children[1].children[0].children[1].addEventListener(
        "click",
        function () {
          if (
            this.parentElement.parentElement.parentElement.classList.contains(
              "pda-not-required"
            )
          ) {
            return;
          }
          if (commentArea.classList.contains("pda-hidden")) {
            commentArea.classList.remove("pda-hidden");
          } else {
            commentArea.classList.add("pda-hidden");
          }
        }
      );
      dailyArea.insertBefore(recordNode, dailyArea.children[0]);
    }

    const completionRate = (100 * enterred) / healthDataList.length;
    window.completionRateChartPlugin.setCompletion(completionRate);
    document.getElementsByClassName("pda-data-tag")[0].click();
  }

  updateDate();

  function generateRecord(dataName, dataValue, dataUnit, dataTime, comment) {
    let commentDisplay = comment ? comment : "no comment enterred";
    return `
      <div class="pda-record-title">
        <span>${dataName}</span>
      </div>
      <div class="pda-record">
        <div class="pda-record-info">
          <div class="pda-record-left">
            <div class="pda-record-value">
              <span class="pda-value-value">${dataValue}</span>
              <span class="pda-value-unit">${dataUnit}</span>
            </div>
            <div class="pda-record-time">${dataTime}</div>
          </div>
          <div class="pda-record-right">
          </div>
        </div>
        <div class="pda-record-comment pda-hidden">${commentDisplay}</div>
      </div>
      
    `;
  }

  let updateBtn = document.getElementById("pda-update-btn");
  updateBtn.addEventListener("click", () => {
    updateDate();
  });

  let tags = document.getElementsByClassName("pda-data-tag");
  let dailyArea = document.getElementsByClassName("pda-daily-area")[0];
  let analysisArea = document.getElementsByClassName("pda-analysis-area")[0];
  let areaList = [dailyArea, analysisArea, analysisArea];
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

  // switch completion rate
  let crcpTitle = document.getElementsByClassName("pda-completion-title")[0];
  tags[0].addEventListener("click", () => {
    let dailyRate = 0,
      dailyTotal = healthDataList.length;
    for (let i = 0; i < healthDataList.length; i++) {
      if (
        hashMap[dateFormat(selectDate)] &&
        hashMap[dateFormat(selectDate)].records[i].value !== undefined
      ) {
        dailyRate++;
      }
    }
    crcpTitle.innerHTML = `
    <span>Today's</span>
    <span>Completion</span>
    `;
    window.completionRateChartPlugin.setCompletion(
      (dailyRate / dailyTotal) * 100
    );
  });

  tags[1].addEventListener("click", () => {
    let weeklyRate = 0,
      weeklyTotal = listOfWeek(selectDate).length;
    for (let dateRecord of listOfWeek(selectDate)) {
      let isCount = false;
      for (let i = 0; i < healthDataList.length; i++) {
        if (!hashMap[dateRecord]) continue;
        if (hashMap[dateRecord].records[i].value && !isCount) {
          isCount = true;
          weeklyRate++;
        }
      }
    }
    crcpTitle.innerHTML = `
    <span>This week's</span>
    <span>Completion</span>
    `;
    window.completionRateChartPlugin.setCompletion(
      ((weeklyRate / weeklyTotal) * 100).toFixed(2)
    );
    generateTable(listOfWeek(selectDate));
    generateChart(listOfWeek(selectDate));
  });

  tags[2].addEventListener("click", () => {
    let monthlyRate = 0,
      monthlyTotal = listOfMonth(selectDate).length;
    for (let dateRecord of listOfMonth(selectDate)) {
      let isCount = false;
      for (let i = 0; i < healthDataList.length; i++) {
        if (!hashMap[dateRecord]) continue;
        if (hashMap[dateRecord].records[i].value && !isCount) {
          monthlyRate++;
          isCount = true;
        }
      }
    }
    crcpTitle.innerHTML = `
    <span>This Month's</span>
    <span>Completion</span>
    `;
    window.completionRateChartPlugin.setCompletion(
      ((monthlyRate / monthlyTotal) * 100).toFixed(2)
    );

    generateTable(listOfMonth(selectDate));
    generateChart(listOfMonth(selectDate));
  });

  // weekly/monthly data table & chart
  let chartTag = document.getElementsByClassName("pda-analysis-tag")[0];
  let tableTag = document.getElementsByClassName("pda-analysis-tag")[1];
  let chartArea = document.getElementById("pda-chart-container");
  let tableArea = document.getElementsByClassName("pda-analysis-table")[0];

  // switch between table and chart
  chartTag.addEventListener("click", () => {
    if (!chartTag.classList.contains("pda-selected")) {
      chartTag.classList.add("pda-selected");
      tableTag.classList.remove("pda-selected");
      chartArea.classList.remove("pda-hidden");
      tableArea.classList.add("pda-hidden");
    }
  });

  tableTag.addEventListener("click", () => {
    if (!tableTag.classList.contains("pda-selected")) {
      chartTag.classList.remove("pda-selected");
      tableTag.classList.add("pda-selected");
      chartArea.classList.add("pda-hidden");
      tableArea.classList.remove("pda-hidden");
    }
  });
  // table
  function generateTable(dateList) {
    let tbody = document.getElementsByClassName("pda-analysis-table")[0];
    tbody.innerHTML = "";
    let header = document.createElement("tr");
    header.classList.add("pda-table-head");
    header.innerHTML = "<th>date</th>";
    for (let hd of healthDataList) {
      let th = document.createElement("th");
      th.innerHTML = `${hd.dataName} ${hd.unit}`;
      header.appendChild(th);
    }
    tbody.appendChild(header);
    for (let date of dateList) {
      let tr = document.createElement("tr");
      tr.classList.add("pda-table-item");
      let dateTitle = document.createElement("td");
      dateTitle.innerHTML = date;
      tr.appendChild(dateTitle);

      for (let i = 0; i < healthDataList.length; i++) {
        let td = document.createElement("td");
        let record = hashMap[date]
          ? hashMap[date].records[i]
          : { isRequired: healthDataList[i].isRequired };
        switch (record.isRequired) {
          case undefined:
            if (record.value > record.upperBound) {
              td.innerHTML = `
                <span class="pda-over-value" title="This value is bigger than the upper safety threshold!">${record.value}</span>
                `;
            } else if (record.value < record.lowerBound) {
              td.innerHTML = `
                <span class="pda-under-value" title="This value is smaller than the lower safety threshold!">${record.value}</span>
                `;
            } else {
              td.innerHTML = `
                  <span>${record.value}</span>
                `;
            }
            break;
          case true:
            td.innerHTML = " ? ";
            break;
          case false:
            td.innerHTML = " - ";
            break;
        }
        tr.appendChild(td);
      }
      tbody.insertBefore(tr, tbody.children[1]);
    }
  }

  // chart
  function generateChart(dateList) {
    const hdll = healthDataList.length;
    let seriesData = [];
    for (let date of dateList) {
      if (hashMap[date]) {
        for (let i = 0; i < hdll; i++) {
          if (!seriesData[i]) {
            seriesData[i] = [hashMap[date].records[i].value];
          } else {
            seriesData[i].push(hashMap[date].records[i].value);
          }
        }
      } else {
        for (let i = 0; i < hdll; i++) {
          if (!seriesData[i]) {
            seriesData[i] = [null];
          } else {
            seriesData[i].push(null);
          }
        }
      }
    }

    if (screen.width < 1000) {
      let series = seriesData.map((item, index) => {
        return {
          name: healthDataList[index].dataName,
          data: item.map((i) => (i ? i : null)),
          tooltip: {
            valueSuffix: healthDataList[index].unit,
          },
        };
      });
      let chartContainer = document.getElementById("pda-chart-container");
      chartContainer.innerHTML = `
      <div id="pda-chart-container0"></div>
      <div id="pda-chart-container1"></div>
      <div id="pda-chart-container2"></div>
      <div id="pda-chart-container3"></div>
    `;
      let addAveLine = function (axis) {
        let points = axis.series[0].points,
          point = {},
          total = 0,
          avgLength = 0,
          avg = 0;

        for (let i = 0; i < points.length; i++) {
          point = points[i];
          if (point.isInside) {
            total += point.y;
            avgLength++;
          }
        }

        avg = (total / avgLength).toFixed(2);

        axis.chart.get("yA").removePlotLine(avg);
        axis.chart.get("yA").addPlotLine({
          id: "avg",
          value: avg,
          color: Highcharts.getOptions().colors[-1],
          dashStyle: "dash",
          width: 1,
          label: {
            text: avg,
          },
          zIndex: 4,
        });
      };
      for (let i = 0; i < healthDataList.length; i++) {
        Highcharts.chart(`pda-chart-container${i}`, {
          chart: {
            type: "line",
            borderRadius: 10,
            borderWidth: 1,
            events: {
              load: function () {
                addAveLine(this.get("xA"));
              },
            },
          },
          title: {
            text: `${healthDataList[i].dataName}`,
            margin: 5,
            floating: true,
          },
          yAxis: {
            id: "yA",
            title: {
              text: healthDataList[i].unit,
            },
          },
          xAxis: {
            id: "xA",
            categories: dateList,
            labels: {
              enabled: dateList.length > 10 ? false : true,
            },
            events: {
              afterSetExtremes: function () {
                addAveLine(this);
              },
            },
          },

          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
              },
              enableMouseTracking: false,
            },
          },
          colors: [Highcharts.getOptions().colors[i]],
          series: [series[i]],
        });
      }
    } else {
      let series = seriesData.map((item, index) => {
        return {
          name: healthDataList[index].dataName,
          data: item.map((i) => (i ? i : null)),
          yAxis: index,
          tooltip: {
            valueSuffix: healthDataList[index].unit,
          },
        };
      });
      let addAveLine = function (axis) {
        for (let j = 0; j < axis.series.length; j++) {
          let points = axis.series[j].points,
            point = {},
            total = 0,
            avgLength = 0,
            avg = 0;

          for (let i = 0; i < points.length; i++) {
            point = points[i];
            if (point.isInside) {
              total += point.y;
              avgLength++;
            }
          }

          avg = (total / avgLength).toFixed(2);
          axis.chart.get(`yA${j}`).removePlotLine(avg);
          axis.chart.get(`yA${j}`).addPlotLine({
            id: "avg",
            value: avg,
            color: Highcharts.getOptions().colors[j],
            dashStyle: "dash",
            width: 1,
            label: {
              text: avg,
            },
            zIndex: 4,
          });
        }
      };
      Highcharts.chart("pda-chart-container", {
        chart: {
          events: {
            load: function () {
              addAveLine(this.get("xA"));
            },
          },
        },
        title: { text: "time-seires over one week" },
        yAxis: [
          {
            id: "yA0",
            title: {
              text: healthDataList[0].dataName,
              style: {
                color: Highcharts.getOptions().colors[0],
              },
            },
            labels: {
              format: "{value} " + healthDataList[0].unit,
              style: {
                color: Highcharts.getOptions().colors[0],
              },
            },
          },
          {
            id: "yA1",
            title: {
              text: healthDataList[1].dataName,
              style: {
                color: Highcharts.getOptions().colors[1],
              },
            },
            labels: {
              format: "{value} " + healthDataList[1].unit,
              style: {
                color: Highcharts.getOptions().colors[1],
              },
            },
          },
          {
            id: "yA2",
            title: {
              text: healthDataList[2].dataName,
              style: {
                color: Highcharts.getOptions().colors[2],
              },
            },
            labels: {
              format: "{value} " + healthDataList[2].unit,
              style: {
                color: Highcharts.getOptions().colors[2],
              },
            },
            opposite: true,
          },
          {
            id: "yA3",
            title: {
              text: healthDataList[3].dataName,
              style: {
                color: Highcharts.getOptions().colors[3],
              },
            },
            labels: {
              format: "{value} " + healthDataList[3].unit,
              style: {
                color: Highcharts.getOptions().colors[3],
              },
            },
            opposite: true,
          },
        ],

        xAxis: {
          id: "xA",
          categories: dateList,
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
        },

        series: series,
      });
    }
  }
}

window.onload = function () {
  window.calenderPlugin = CalenderPlugin("pda-calendar-container");
  let pdaCrcpSize;
  if (window.screen.width < 800) {
    pdaCrcpSize = 60;
  } else if (window.screen.width > 1200) {
    pdaCrcpSize = 180;
  } else {
    pdaCrcpSize = 120;
  }
  window.completionRateChartPlugin = CompletionRateChartPlugin(
    "pda-completion-container",
    pdaCrcpSize
  );
  patientDataAnalysis();
};
