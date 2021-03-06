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
    selectDate: `${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}`,
    getDate: function () {
      return this.selectDate;
    },
    init: function (element_id) {
      this.build(element_id);
      this.update();
      this.bind(this);
    },
    build: function (element_id) {
      var table = document.createElement("div");
      table.id = "cp-data";
      var header = document.createElement("div");
      header.classList.add("cp-header");
      var div = document.createElement("div");

      var month = document.createElement("span");
      month.setAttribute("id", "cp-month");
      month.innerText = 3;
      div.appendChild(month);
      var year = document.createElement("span");
      year.setAttribute("id", "cp-year");
      div.appendChild(year);
      header.appendChild(div);
      var title = document.createElement("div");
      title.id = "title";
      title.innerHTML = "<span>Completion</span> <span>Rate</span>";
      header.appendChild(title);
      table.appendChild(header);
      var weeks = document.createElement("ul");
      weeks.setAttribute("id", "cp-weeks");
      var weekArr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "St"];
      for (let i = 0; i < 7; i++) {
        let day = document.createElement("li");
        day.innerText = weekArr[i];
        weeks.appendChild(day);
      }
      table.appendChild(weeks);

      var dates = document.createElement("ul");
      dates.setAttribute("id", "cp-date");
      table.appendChild(dates);

      var footer = document.createElement("div");
      footer.classList.add("cp-footer");
      var lastMonth = document.createElement("span");
      lastMonth.setAttribute("id", "cp-prev");
      lastMonth.innerText = "< last month";
      var nextMonth = document.createElement("span");
      nextMonth.setAttribute("id", "cp-next");
      nextMonth.innerText = "next month >";
      footer.appendChild(lastMonth);
      footer.appendChild(nextMonth);
      table.appendChild(footer);
      document.getElementById(element_id).appendChild(table);
    },
    update: function () {
      document.getElementById("cp-date").innerHTML = "";

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
      document.getElementById("cp-year").innerText = year;
      document.getElementById("cp-month").innerText = arr[month];

      let lastDay = new Date(year, month + 1, 1 - 1);
      let dateOfLastDay = lastDay.getDate();
      let weekOfFirstDay = new Date(year, month, 1).getDay();
      let weekOfLastDay = lastDay.getDay();
      let dateOfEndOfLastMonth = new Date(year, month, 1 - 1).getDate();

      for (
        let i = 0, diff = dateOfEndOfLastMonth - weekOfFirstDay;
        i < weekOfFirstDay;
        i++, diff++
      ) {
        let li = document.createElement("li");
        li.innerText = diff;
        li.className = "cp-notCurMonth hover";
        li.addEventListener("click", (e) => {
          this.selectDate = `${year}/${month}/${diff}`;
        });
        document.getElementById("cp-date").appendChild(li);
      }

      for (let i = 1; i <= dateOfLastDay; i++) {
        let li = document.createElement("li");
        li.innerText = i;
        if (
          year == this.curYear &&
          month == this.curMonth &&
          i == this.curDay
        ) {
          li.className = "cp-active cp-hover";
        } else {
          li.className = "cp-hover";
        }
        li.addEventListener("click", (e) => {
          this.selectDate = `${year}/${month + 1}/${i}`;
        });
        document.getElementById("cp-date").appendChild(li);
      }

      for (let i = weekOfLastDay, j = 1; i < 6; i++, j++) {
        let li = document.createElement("li");
        li.innerText = j;
        li.className = "cp-notCurMonth cp-hover";
        li.addEventListener("click", (e) => {
          this.selectDate = `${year}/${month + 1}/${j}`;
        });
        document.getElementById("cp-date").appendChild(li);
      }
    },
    bind: function (that) {
      document.getElementById("cp-next").onclick = function () {
        that.date.setMonth(that.date.getMonth() + 1);
        that.update();
      };
      document.getElementById("cp-prev").onclick = function () {
        that.date.setMonth(that.date.getMonth() - 1);
        that.update();
      };
    },
  };
  window.CalenderPlugin = CalenderPlugin;
})(window, document);
