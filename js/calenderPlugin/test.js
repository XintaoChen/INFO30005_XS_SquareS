(function (window, document) {
  var CalenderPlugin = function (element_id) {
    if (!(this instanceof CalenderPlugin))
      return new CalenderPlugin(element_id);
    this.init(element_id);
  };

  CalenderPlugin.prototype = {
    date: new Date(),
    curYear: new Date().getFullYear(),
    curMonth: new Date().getMonth(),
    curDay: new Date().getDate(),
    init: function (element_id) {
      this.build(element_id);
      this.update();
      this.bind(this);
    },
    build: function (element_id) {
      var table = document.createElement("div");
      table.id = "data";
      var header = document.createElement("header");
      var div = document.createElement("div");

      var month = document.createElement("span");
      month.setAttribute("id", "month");
      month.innerText = 3;
      div.appendChild(month);
      var year = document.createElement("span");
      year.setAttribute("id", "year");
      div.appendChild(year);
      header.appendChild(div);
      var title = document.createElement("div");
      title.id = "title";
      title.innerHTML = "<span>Completion</span> <span>Rate</span>";
      header.appendChild(title);
      table.appendChild(header);
      var weeks = document.createElement("ul");
      weeks.setAttribute("id", "weeks");
      var weekArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "St"];
      for (let i = 0; i < 7; i++) {
        let day = document.createElement("li");
        day.innerText = weekArr[i];
        weeks.appendChild(day);
      }
      table.appendChild(weeks);

      var dates = document.createElement("ul");
      dates.setAttribute("id", "date");
      table.appendChild(dates);

      var footer = document.createElement("footer");
      var lastMonth = document.createElement("span");
      lastMonth.setAttribute("id", "prev");
      lastMonth.innerText = "last month";
      var nextMonth = document.createElement("span");
      nextMonth.setAttribute("id", "next");
      nextMonth.innerText = "next month";
      footer.appendChild(lastMonth);
      footer.appendChild(nextMonth);
      table.appendChild(footer);
      document.getElementById(element_id).appendChild(table);
    },
    update: function () {
      document.getElementById("date").innerHTML = "";

      var year = this.date.getFullYear();
      var month = this.date.getMonth();
      var day = this.date.getDate();
      var arr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      document.getElementById("year").innerText = year;
      document.getElementById("month").innerText = arr[month];

      var lastDay = new Date(year, month + 1, 1 - 1);
      var dateOfLastDay = lastDay.getDate();
      var weekOfFirstDay = new Date(year, month, 1).getDay();
      var weekOfLastDay = lastDay.getDay();
      var dateOfEndOfLastMonth = new Date(year, month, 1 - 1).getDate();
      var diff = dateOfEndOfLastMonth - weekOfFirstDay;

      for (var i = 0; i < weekOfFirstDay; i++) {
        var li = document.createElement("li");
        li.innerText = diff++;
        li.className = "notCurMonth hover";
        document.getElementById("date").appendChild(li);
      }

      for (var i = 1; i <= dateOfLastDay; i++) {
        var li = document.createElement("li");
        li.innerText = i;
        if (
          year == this.curYear &&
          month == this.curMonth &&
          i == this.curDay
        ) {
          li.className = "active hover";
        } else {
          li.className = "hover";
        }
        document.getElementById("date").appendChild(li);
      }
      var j = 1;
      for (let i = weekOfLastDay; i < 6; i++) {
        var li = document.createElement("li");
        li.innerText = j++;
        li.className = "notCurMonth hover";
        document.getElementById("date").appendChild(li);
      }
    },
    bind: function (that) {
      document.getElementById("next").onclick = function () {
        that.date.setMonth(that.date.getMonth() + 1);
        that.update();
      };
      document.getElementById("prev").onclick = function () {
        that.date.setMonth(that.date.getMonth() - 1);
        that.update();
      };
    },
  };
  window.CalenderPlugin = CalenderPlugin;
})(window, document);
