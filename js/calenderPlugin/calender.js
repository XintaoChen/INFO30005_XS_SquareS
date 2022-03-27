(function (window, document) {
  var date = new Date();
  //默认参数
  var params = {
    width: 300,
    height: 400,
    borderRadius: 3,
    backgroundColor: "#B4B4B2",
    weekendTitleBg: "#989896", //星期的背景颜色
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    scope: "1946-2118", //年 查询范围
  };

  var CalenderPlugin = function (element_id, options) {
    //判断当前对象是否已经创建 instanceof：判断对象类型
    //如果当前对象为空，则不能调用其自身所定义的标准相关属性
    if (!(this instanceof CalenderPlugin))
      return new CalenderPlugin(element_id, options);

    if (element_id == null || element_id == undefined || element_id == "") {
      console.error(
        "You haven't binding Element to showing Calender ！！！！！！"
      );
      return;
    }
    this.params = this.extend(params, options);

    this.init(element_id, this.params);
  };

  //为这个函数规定自己的标准
  CalenderPlugin.prototype = {
    //调用入口
    init: function (element_id, options) {
      this.bind(element_id, options, this);
    },
    //扩展函数 用来规定用户指定参数 - 默认参数之间的扩展
    //当用户有规定相关的参数，则以用户为主，否则以默认参数为主
    extend: function (opt1, opt2) {
      if (opt2 != undefined || opt2 != null) {
        if (typeof opt2 != "object")
          return console.error("This " + typeof opt2 + " is Belong object");
      }

      for (var i in opt2) {
        for (var j in opt1) {
          //相同属性，则覆盖
          if (i === j) {
            opt1[j] = opt2[i];
          }
          // 不同属性，则添加
          else {
            opt1[i] = opt2[i];
          }
        }
      }
      return opt1;
    },
    //创建日历样式
    create: function (element_id, e, opt, cp) {
      //日历容器
      var share = document.createElement("div");
      share.style.position = "absolute";
      share.id = "calender-container-share";
      share.style.width = "100vw";
      share.style.height = "100vh";
      share.style.top = 0;
      share.style.left = 0;
      share.style.zIndex = "998";
      var div = document.createElement("div");
      if (e.target.id === element_id) {
        div.className = "calender-container-class-name";
        div.id = "calender-container-id";
        div.style.position = "absolute";
        div.style.width = opt.width + "px";
        div.style.height = opt.height + "px";
        //div.style.border = '1px solid ';
        div.style.top = e.clientY + 4 + "px";
        div.style.left = e.clientX + "px";
        div.style.zIndex = "999";
        div.style.display = "block";
        div.style.borderRadius = opt.borderRadius + "px";
        div.style.background = opt.backgroundColor;
        div.style.opacity = "0.8";
        share.appendChild(div);
        document.getElementsByTagName("body")[0].appendChild(share);
      }

      //生成日历单元格
      //表单
      var form = document.createElement("form");
      form.style.width = 100 + "%";
      form.style.height = 100 + "%";

      //头部的选择项
      var header = document.createElement("div");
      header.style.width = 100 + "%";
      header.style.height = opt.height / 8 + "px";
      header.style.lineHeight = "1.5";
      // 年选择
      var year_select_container = document.createElement("div");
      year_select_container.style.display = "inline-block";
      year_select_container.style.height = "100%";
      year_select_container.style.width = "40%";

      //左箭头
      var year_left_btn = document.createElement("div");
      year_left_btn.id = "calender-year-left-btn";
      year_left_btn.style.width = "8px";
      year_left_btn.style.height = "8px";
      year_left_btn.style.display = "inline-block";
      year_left_btn.style.border = "2px solid white";
      year_left_btn.style.borderTop = "none";
      year_left_btn.style.borderRight = "none";
      year_left_btn.style.transform = "rotate(45deg)";
      year_left_btn.style.position = "relative";
      year_left_btn.style.cursor = "pointer";
      year_left_btn.style.marginLeft = "10%";
      year_select_container.appendChild(year_left_btn);
      //年
      var year_label = document.createElement("div");
      year_label.id = "calender-year-label";
      year_label.innerText = opt.year + "年";
      year_label.style.color = "white";
      year_label.style.display = "inline-block";
      year_label.style.padding = "0 7%";
      year_label.style.cursor = "pointer";

      year_select_container.appendChild(year_label);
      //右箭头
      var year_right_btn = document.createElement("div");
      year_right_btn.id = "calender-year-right-btn";
      year_right_btn.style.width = "8px";
      year_right_btn.style.height = "8px";
      year_right_btn.style.display = "inline-block";
      year_right_btn.style.border = "2px solid white";
      year_right_btn.style.borderTop = "none";
      year_right_btn.style.borderRight = "none";
      year_right_btn.style.transform = "rotate(-135deg)";
      year_right_btn.style.cursor = "pointer";
      year_select_container.appendChild(year_right_btn);
      header.appendChild(year_select_container);

      //月
      var month_select_container = document.createElement("div");
      month_select_container.style.display = "inline-block";
      month_select_container.style.height = "100%";
      month_select_container.style.width = "28%";
      month_select_container.style.float = "right";
      //左箭头
      var month_left_btn = document.createElement("div");
      month_left_btn.id = "calender-month-left-btn-id";
      month_left_btn.style.width = "8px";
      month_left_btn.style.height = "8px";
      month_left_btn.style.display = "inline-block";
      month_left_btn.style.border = "2px solid white";
      month_left_btn.style.borderTop = "none";
      month_left_btn.style.borderRight = "none";
      month_left_btn.style.transform = "rotate(45deg)";
      month_left_btn.style.position = "relative";
      month_left_btn.style.marginLeft = "10%";
      month_left_btn.style.cursor = "pointer";
      month_select_container.appendChild(month_left_btn);
      //月标签
      var month_label = document.createElement("div");
      month_label.innerText = opt.month + "月";
      month_label.id = "calender-month-label-id";
      month_label.style.color = "white";
      month_label.style.display = "inline-block";
      month_label.style.padding = "0 7%";
      month_label.style.cursor = "pointer";
      month_select_container.appendChild(month_label);
      //右箭头
      var month_right_btn = document.createElement("div");
      month_right_btn.id = "calender-month-right-btn-id";
      month_right_btn.style.width = "8px";
      month_right_btn.style.height = "8px";
      month_right_btn.style.display = "inline-block";
      month_right_btn.style.border = "2px solid white";
      month_right_btn.style.borderTop = "none";
      month_right_btn.style.borderRight = "none";
      month_right_btn.style.transform = "rotate(-135deg)";
      month_right_btn.style.cursor = "pointer";
      month_select_container.appendChild(month_right_btn);

      header.appendChild(month_select_container);
      form.appendChild(header);

      //星期标题
      var weekendTitle = document.createElement("div");
      weekendTitle.style.width = 100 + "%";
      weekendTitle.style.height = opt.height / 9 + "px";
      weekendTitle.style.background = opt.weekendTitleBg;
      var weekends = ["日", "一", "二", "三", "四", "五", "六"];
      var w_table = document.createElement("table");
      w_table.style.width = 100 + "%";
      w_table.style.height = 100 + "%";
      w_table.style.color = "white";
      w_table.style.textAlign = "center";
      w_table.style.fontSize = "7px";
      var w_row = document.createElement("tr");
      for (var i in weekends) {
        var w_column = document.createElement("td");
        w_column.innerText = weekends[i];
        w_row.appendChild(w_column);
      }
      w_table.appendChild(w_row);
      weekendTitle.appendChild(w_table);
      form.appendChild(weekendTitle);

      //日期表格
      var table = document.createElement("table");
      table.style.width = 100 + "%";
      table.id = "calender-days-table";
      table.style.height =
        opt.height -
        header.style.height.substring(0, header.style.height.indexOf("p")) -
        weekendTitle.style.height.substring(
          0,
          weekendTitle.style.height.indexOf("p")
        ) +
        "px";
      table.style.textAlign = "center";
      table.style.fontSize = "7px";
      table.style.color = "white";
      form.appendChild(table);
      div.appendChild(form);

      this.bind(element_id, opt, cp);
    },
    //事件绑定
    //change（）和getDate（）本来也属于事件绑定
    //但是由于，有些方法需要进行重复的调用，所以避免引起事件的循环调用，所以分开写
    bind: function (element_id, opt, cp) {
      document.addEventListener(
        "click",
        function (e) {
          //判断是否已经存在日历容器，则先清除，再创建  排除自身
          if (
            document.getElementsByClassName("calender-container-class-name")
              .length > 0 &&
            e.target.id === "calender-container-share"
          ) {
            var el = document.getElementById("calender-container-share");
            document
              .getElementById("calender-container-share")
              .parentNode.removeChild(el);
          }
          if (
            document.getElementsByClassName("calender-container-class-name")
              .length > 0
          ) {
            return;
          }
          if (e.target.id !== element_id) {
            return;
          }
          cp.create(element_id, e, opt, cp);
          cp.build(element_id, opt, cp);
          cp.change(element_id, opt, cp);
        },
        false
      );
    },
    // 当年、月发生改变时触发
    change: function (element_id, opt, cp) {
      // 减少一个月
      if (document.getElementById("calender-month-left-btn-id") != null)
        document.getElementById("calender-month-left-btn-id").addEventListener(
          "click",
          function (e) {
            if (opt.month > 1 && opt.month <= 12) opt.month = opt.month - 1;
            cp.build(element_id, opt, cp);
          },
          false
        );

      // 加一个月
      if (document.getElementById("calender-month-right-btn-id") != null)
        document.getElementById("calender-month-right-btn-id").addEventListener(
          "click",
          function (e) {
            if (opt.month >= 1 && opt.month < 12) opt.month = opt.month + 1;
            cp.build(element_id, opt, cp);
          },
          false
        );

      // 减一年
      if (document.getElementById("calender-year-left-btn") != null)
        document.getElementById("calender-year-left-btn").addEventListener(
          "click",
          function (e) {
            opt.year = opt.year - 1;
            cp.build(element_id, opt, cp);
          },
          false
        );

      // 加一年
      if (document.getElementById("calender-year-right-btn") != null)
        document.getElementById("calender-year-right-btn").addEventListener(
          "click",
          function (e) {
            opt.year = opt.year + 1;
            cp.build(element_id, opt, cp);
          },
          false
        );

      //选择年
      if (document.getElementById("calender-year-label") != null)
        document.getElementById("calender-year-label").addEventListener(
          "click",
          function (e) {
            var year_list = document.createElement("div");
            year_list.id = "year-list-id";
            year_list.style.width = opt.width / 5 + "px";
            year_list.style.height = opt.height / 2 + "px";
            year_list.style.zIndex = "999";
            year_list.style.position = "fixed";
            year_list.style.top = e.y + "px";
            year_list.style.left = e.x + "px";
            year_list.style.background = "white";
            year_list.style.border = "1px solid white";
            year_list.style.opacity = "0.8";
            year_list.style.overflow = "scroll";
            year_list.style.overflowX = "hidden";
            year_list.style.boxSizing = "border-box";

            var ul = document.createElement("ul");
            ul.style.listStyleType = "none";
            ul.style.padding = "0";
            var years = opt.scope.split("-");
            for (var i = years[0]; i <= years[1]; i++) {
              var li = document.createElement("li");
              li.innerText = i;
              li.style.fontSize = "7px";
              li.style.color = "#ff4747";
              li.style.cursor = "pointer";
              li.style.boxSizing = "border-box";
              ul.appendChild(li);
            }
            year_list.appendChild(ul);
            if (document.getElementById("year-list-id") == null) {
              document
                .getElementById("calender-container-id")
                .appendChild(year_list);
            }
            cp.getDate(element_id, opt);
          },
          false
        );
    },
    // 获取时间
    getDate: function (element_id, opt) {
      _this = this;
      //选择日期是的点击事件、hover
      if (document.getElementById("calender-days-table") != null) {
        var trs = document.getElementById("calender-days-table").childNodes;
        for (var i = 0; i < trs.length; i++) {
          var tds = trs[i].childNodes;
          for (var j = 0; j < tds.length; j++) {
            trs[i].childNodes[j].addEventListener(
              "click",
              function (e) {
                document.getElementById(element_id).value = e.target.className;
                var el = document.getElementById("calender-container-share");
                document
                  .getElementById("calender-container-share")
                  .parentNode.removeChild(el);
              },
              false
            );

            trs[i].childNodes[j].addEventListener(
              "mouseover",
              function (e) {
                e.target.style.border = "1px solid white";
                e.target.style.opacity = "0.5";
                e.target.style.boxSizing = "border-box";
              },
              false
            );

            trs[i].childNodes[j].addEventListener(
              "mouseout",
              function (e) {
                e.target.style.border = "none";
                e.target.style.opacity = "";
              },
              false
            );
          }
        }
      }

      //下拉选择年份
      if (document.getElementById("year-list-id") != null) {
        var lis =
          document.getElementById("year-list-id").childNodes[0].childNodes;
        lis.forEach(function (item, index) {
          item.addEventListener(
            "click",
            function (e) {
              opt.year = new Number(e.target.innerText);
              _this.build(element_id, opt, _this);
              document
                .getElementById("year-list-id")
                .parentNode.removeChild(
                  document.getElementById("year-list-id")
                );
            },
            false
          );

          item.addEventListener(
            "mouseover",
            function (e) {
              e.target.style.background = "rgb(195, 195, 193)";
              e.target.style.color = "white";
            },
            false
          );

          item.addEventListener(
            "mouseout",
            function (e) {
              e.target.style.background = "";
              e.target.style.color = "#ff4747";
            },
            false
          );
        });
      }
    },
    //构建数据表格
    build: function (element_id, opt, cp) {
      //年份显示
      document.getElementById("calender-year-label").innerText =
        opt.year + "年";
      // 月份显示
      document.getElementById("calender-month-label-id").innerText =
        opt.month + "月";
      // 日期表格
      var table = document.getElementById("calender-days-table");
      if (table != null) {
        var trs = table.childNodes;
        while (trs.length > 0) {
          table.removeChild(trs[0]);
        }

        var year,
          month,
          day,
          days,
          last_month_days, //上个月天数
          next_month_days; //下个月天数
        year = opt.year;
        month = opt.month;
        day = opt.day;

        //生成一个时间对象
        //为了获取到每年每月其中的一号是星期几
        var date = new Date(year, month - 1, 1);
        //日期行、列
        switch (month) {
          case 1:
            days = 31;
            last_month_days = 31;
            if (year % 4 == 0 && year % 100 != 0) {
              next_month_days = 29;
            } else {
              next_month_days = 28;
            }
            break;
          case 2:
            last_month_days = 31;
            next_month_days = 30;
            if (year % 4 == 0 && year % 100 != 0) {
              days = 29;
            } else {
              days = 28;
            }
            break;
          case 3:
            if (year % 4 == 0 && year % 100 != 0) {
              last_month_days = 29;
            } else {
              last_month_days = 28;
            }
            days = 31;
            next_month_days = 30;
            break;
          case 4:
            days = 30;
            last_month_days = 31;
            next_month_days = 31;
            break;
          case 5:
            days = 31;
            last_month_days = 30;
            next_month_days = 30;
            break;
          case 6:
            days = 30;
            last_month_days = 31;
            next_month_days = 31;
            break;
          case 7:
            days = 31;
            last_month_days = 30;
            next_month_days = 31;
            break;
          case 8:
            days = 31;
            last_month_days = 31;
            next_month_days = 30;
            break;
          case 9:
            days = 30;
            last_month_days = 31;
            next_month_days = 31;
            break;
          case 10:
            days = 31;
            last_month_days = 30;
            next_month_days = 30;
            break;
          case 11:
            days = 30;
            last_month_days = 31;
            next_month_days = 31;
            break;
          case 12:
            days = 31;
            last_month_days = 31;
            next_month_days = 31;
            break;
          default:
            return console.log("the month have " + month + " ???");
        }
        var o = 1;
        var l = last_month_days - date.getDay() + 1; //上个月开始时间
        var n = 1; //下个月开始时间
        for (var i = 0; i < Math.ceil((days + date.getDay() + 1) / 7); i++) {
          //计算表格多少行
          var row = document.createElement("tr");
          for (var j = 0; j < 7; j++) {
            var column = document.createElement("td");
            column.style.cursor = "pointer";
            if (i == 0 && o <= days) {
              //处理“每个月1号”这个特殊日期
              if (j >= date.getDay()) {
                column.innerText = o;
                column.className = year + "-" + month + "-" + o;
                o++;
              } else {
                //上个月时间
                column.innerText = l;
                column.className = year + "-" + (month - 1) + "-" + l;
                l++;
              }
            } else {
              if (o <= days) {
                column.innerText = o;
                column.className = year + "-" + month + "-" + o;
                o++;
              } else {
                //下一个月
                column.innerText = n;
                column.className = year + "-" + (month + 1) + "-" + n;
                n++;
              }
            }
            if (j == 6 || j == 0) {
              column.style.color = "#ffb714";
            }
            row.appendChild(column);
          }
          table.appendChild(row);
        }
      }
      this.getDate(element_id, opt);
    },
  };

  window.CalenderPlugin = CalenderPlugin;
})(window, document);
