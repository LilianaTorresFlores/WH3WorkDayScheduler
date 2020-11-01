$(document).ready(function(){
    var currentDate = moment();
    $("#currentDay").text(currentDate.format('dddd, MMMM Do'));
    
    var events;
    function createTimeBlocks(){
        if(localStorage.getItem("scheduler")){
            events = JSON.parse(localStorage.getItem("scheduler"));
        }else{
            events = {};
        }
        $("#time-blocks").empty();
        hours = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"];
        for(var hour of hours){
            var div = $("<div class='row time-block'>");
            var currentHour = currentDate.hour();
            var hour24 = parseInt(hour.split(" ")[0]);
            if(hour.endsWith("PM")){
                if(hour24 >= 1 && hour24 <= 6){
                    hour24 += 12;
                }
            }
            if(currentHour == hour){
                div.addClass("present");
            }else if(hour24 < currentHour){
                div.addClass("past");
            }else if(hour24 > currentHour){
                div.addClass("future");
            }
            var divHour = $("<div>");
            divHour.addClass("hour col-3");
            divHour.text(hour);
            var divEvent = $("<div>")
            divEvent.addClass("description col-6");
            var txt = $("<textarea>");
            txt.attr("data-hour", hour24);
            divEvent.append(txt);
            if(events[hour24]){
                txt.val(events[hour24]);
            }
            var divSave = $("<div>");
            divSave.addClass("col-3");
            var b = $("<button>");
            b.addClass("btn btn-primary saveBtn");
            b.attr("data-hour", hour24);
            b.append("<i>Save</i>");
            divSave.append(b);
            divHour.appendTo(div);
            divEvent.appendTo(div);
            divSave.appendTo(div);
            div.appendTo("#time-blocks");
        }
    }

    createTimeBlocks();
    
    $(document).on("click", ".saveBtn", function(){
        var hourBtn = $(this).attr("data-hour");
        var txt = $(`textarea[data-hour='${hourBtn}']`);
        events[hourBtn] = txt.val();
        localStorage.setItem("scheduler", JSON.stringify(events));
        alert("Saved!");
        createTimeBlocks();
    })
})