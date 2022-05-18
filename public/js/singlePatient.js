function singlePatient() {
  let data = JSON.parse(document.getElementById("sp-parse-js").innerText);
  console.log(data);
  let { healthDataList, recordList } = data;
  document.getElementById("sp-parse-js").innerHTML = "";

  const dateFormat = (date) => {
    let unFormatDate = new Date(date);
    var formatedDate =
      unFormatDate.getFullYear() +
      "/" +
      (unFormatDate.getMonth() + 1) +
      "/" +
      unFormatDate.getDate();
    return formatedDate;
  };
  const last30Days = (date) => {
    const time = date.getTime();
    const oneDayTime = 24 * 60 * 60 * 1000;
    let startOfThisWeek = time - 30 * oneDayTime;
    let result = [];
    for (let i = 0; i < 30; i++) {
      result[i] = dateFormat(startOfThisWeek + (i + 1) * oneDayTime);
    }
    return result;
  };
  let dateList = last30Days(new Date());
  if (dateList.indexOf(Object.keys(recordList)[0]) >= 0) {
    let n = dateList.indexOf(Object.keys(recordList)[0]);
    dateList.splice(0, n);
  }
  function generateTable(dateList) {
    let tbody =
      document.getElementsByClassName("sp-table-data")[0].children[0]
        .children[0];
    tbody.innerHTML = "<div></div>";
    for (let date of dateList) {
      let tr = document.createElement("tr");
      tr.classList.add("data-row");
      let dateTitle = document.createElement("td");
      dateTitle.innerHTML = date;
      tr.appendChild(dateTitle);

      for (let i = 0; i < healthDataList.length; i++) {
        let td = document.createElement("td");
        let record = recordList[date]
          ? recordList[date].records[i]
          : { isRequired: healthDataList[i].isRequired };
        switch (record.isRequired) {
          case undefined:
            if (record.value > record.upperBound) {
              td.innerHTML = `
                <span class="too-high-value" title="This value is bigger than the upper safety threshold!">${record.value}</span>
                `;
            } else if (record.value < record.lowerBound) {
              td.innerHTML = `
                <span class="too-low-value" title="This value is smaller than the lower safety threshold!">${record.value}</span>
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
      tbody.insertBefore(tr, tbody.children[0]);
    }
  }

  generateTable(dateList);

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

  let yAxis = healthDataList.map((item, index) => {
    return {
      id: `yA${index}`,
      title: {
        text: item.dataName,
        style: {
          color: Highcharts.getOptions().colors[index],
        },
      },
      labels: {
        format: "{value} " + item.unit,
        style: {
          color: Highcharts.getOptions().colors[index],
        },
      },
      opposite: index % 2 == 0,
    };
  });

  let seriesData = [];
  for (let date of dateList) {
    if (recordList[date]) {
      for (let i = 0; i < healthDataList.length; i++) {
        if (!seriesData[i]) {
          seriesData[i] = [recordList[date].records[i].value];
        } else {
          seriesData[i].push(recordList[date].records[i].value);
        }
      }
    } else {
      for (let i = 0; i < healthDataList.length; i++) {
        if (!seriesData[i]) {
          seriesData[i] = [null];
        } else {
          seriesData[i].push(null);
        }
      }
    }
  }
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
  Highcharts.chart("sp-data-chart-area", {
    chart: {
      events: {
        load: function () {
          addAveLine(this.get("xA"));
        },
      },
    },
    title: { text: "Historical Data of Time-series" },
    yAxis: yAxis,

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

window.onload = function () {
  singlePatient();
};
