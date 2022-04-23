(function (window, document) {
  var CompletionRateChartPlugin = function (element_id, completionRate) {
    if (!(this instanceof CompletionRateChartPlugin))
      return new CompletionRateChartPlugin(element_id,completionRate);
    this.init(element_id,completionRate);
  };
  CompletionRateChartPlugin.prototype = {
    totalCompletion:283,

    init: function (element_id,completionRate) {
      this.build(element_id);
      this.update(completionRate);
    },

    build:function (element_id){
      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg')
      svg.classList.add("crcp-svg")
      var allCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
      allCircle.setAttribute("cx", "45")
      allCircle.setAttribute("cy", "45")
      allCircle.setAttribute("r", "45")
      allCircle.classList.add("crcp-circle")
      var currentCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
      currentCircle.setAttribute("cx", "45")
      currentCircle.setAttribute("cy", "45")
      currentCircle.setAttribute("r", "45")
      currentCircle.classList.add("crcp-circle")
      currentCircle.id = 'crcp-completion'
      svg.appendChild(allCircle);
      svg.appendChild(currentCircle);
      var rate = document.createElement('div')
      rate.classList.add("crcp-rate")
      var value = document.createElement('span')
      value.id = "crcp-value"
      var unit = document.createElement('span')
      unit.innerText="%"
      unit.style.fontSize = "0.5rem"
      rate.appendChild(value)
      rate.appendChild(unit)

      document.getElementById(element_id).appendChild(svg);
      document.getElementById(element_id).appendChild(rate);
      
    },

    update:function(completionRate){
      document.getElementById('crcp-value').innerText=completionRate;
      let completion = this.totalCompletion - completionRate*this.totalCompletion/100 + "px";
      document.getElementById('crcp-completion').style.strokeDashoffset = completion
    }
  }
  window.CompletionRateChartPlugin = CompletionRateChartPlugin;
})(window, document);
