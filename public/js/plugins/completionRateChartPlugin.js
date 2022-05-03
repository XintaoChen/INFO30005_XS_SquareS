(function (window, document) {
  var CompletionRateChartPlugin = function (element_id, containerSize) {
    if (!(this instanceof CompletionRateChartPlugin))
      return new CompletionRateChartPlugin(element_id, containerSize);
    this.init(element_id, containerSize);
  };
  CompletionRateChartPlugin.prototype = {
    totalCompletion: 0,
    chartSize: 0,
    completionRate: 0,
    init: function (element_id, containerSize) {
      this.completionRate = document.getElementById(element_id).innerHTML;
      document.getElementById(element_id).innerHTML = "";
      this.chartSize = (containerSize * 0.9) / 2;
      this.totalCompletion = containerSize * 0.9 * 3.14;
      this.build(element_id);
      this.update();
    },

    build: function (element_id) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("crcp-svg");
      var allCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      const radius = this.chartSize.toString();
      allCircle.setAttribute("cx", radius);
      allCircle.setAttribute("cy", radius);
      allCircle.setAttribute("r", radius);
      allCircle.classList.add("crcp-circle");
      var currentCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      currentCircle.setAttribute("cx", radius);
      currentCircle.setAttribute("cy", radius);
      currentCircle.setAttribute("r", radius);
      currentCircle.classList.add("crcp-circle");
      currentCircle.id = "crcp-completion";
      svg.appendChild(allCircle);
      svg.appendChild(currentCircle);
      var rate = document.createElement("div");
      rate.classList.add("crcp-rate");
      var value = document.createElement("span");
      value.id = "crcp-value";
      var unit = document.createElement("span");
      unit.innerText = "%";
      unit.style.fontSize = "0.5rem";
      rate.appendChild(value);
      rate.appendChild(unit);

      document.getElementById(element_id).appendChild(svg);
      document.getElementById(element_id).appendChild(rate);
    },

    update: function () {
      document.getElementById("crcp-value").innerText = this.completionRate;
      let completion =
        this.totalCompletion -
        (this.completionRate * this.totalCompletion) / 100 +
        "px";
      document.getElementById("crcp-completion").style.strokeDashoffset =
        completion;
      console.log(this.totalCompletion);
    },
  };
  window.CompletionRateChartPlugin = CompletionRateChartPlugin;
})(window, document);
