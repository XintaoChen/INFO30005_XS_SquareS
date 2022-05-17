function singlePatient() {
  let data = JSON.parse(document.getElementById("sp-parse-js").innerText);
  console.log(data);
  let { healthDataList, recordList } = data;
  document.getElementById("sp-parse-js").innerHTML = "";
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
      oposite: index % 2 == 0,
    };
  });

  let seriesData = [];
  for (let date of Object.keys(recordList)) {
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
    title: { text: "time-seires history" },
    yAxis: yAxis,

    xAxis: {
      id: "xA",
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
