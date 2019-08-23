function databind(mistakes) {

    mistakes.forEach(function(d) {
        return d.freq = + d.freq
    });

    /*--- first container ---*/
    var TRUEmistakes = mistakes.filter(function (d){
        return d.mistake === "TRUE" && d.freq > 1 && d.categoryBig != "апостроф"
    });

    var nested_data = d3.nest()
        .key(function(d) { return d.category; })
        .sortValues(d3.descending)
        .entries(TRUEmistakes);


    var container = d3.select("#MisprintButtons");

    var oneMisprint = container.selectAll("div")
        .data(nested_data)
        .enter()
        .append("div")
        .attr("class", "column");

    oneMisprint.append("p")
        .attr("class", "collapsible")
        .text(function(d) {
            return d.key
        })
        .on("click", function(ev){
            let parent = $(this).parent();
            parent.find(".content").toggleClass("hideElem");
        });

    var pCont = oneMisprint
        .append("div")
        .attr("class", "content");

    var pcontent = pCont.selectAll("p")
        .data(function(d) {
            return d.values
        })
        .enter()
        .append("p");

    pcontent
        .attr("class", "misprintCases")
        .style("position", "relative")
        .style("z-index", "5")

        .html(function(k){
            return k.case + " / " + k.freq
        });

    pCont.selectAll(".misprintCases").sort(function(a,b){
        return d3.descending(a.freq, b.freq)
    });



    /*--- second container ---*/
    var ap_TRUEmistakes = mistakes.filter(function (d){
        return d.mistake === "TRUE" && d.categoryBig === "апостроф"
    });

    var ap_nested_data = d3.nest()
        .key(function(d) { return d.category; })
        .sortValues(d3.descending)
        .entries(ap_TRUEmistakes);

    var ap_container = d3.select("#ap_MisprintButtons");


    var ap_oneMisprint = ap_container.selectAll("div")
        .data(ap_nested_data)
        .enter()
        .append("div")
        .attr("class", "column");


    ap_oneMisprint.append("p")
        .attr("class", "collapsible")
        .text(function(d) {
            return d.key
        })
        .on("click", function(ev){
            let parent = $(this).parent();
            parent.find(".content").toggleClass("hideElem");
        });

    var ap_pCont = ap_oneMisprint
        .append("div")
        .attr("class", "content");

    var ap_pcontent = ap_pCont.selectAll("p")
        .data(function(d) {
            return d.values
        })
        .enter()
        .append("p");

    ap_pcontent
        .attr("class", "misprintCases")
        .style("position", "relative")
        .html(function(k){
            return k.case + " / " + k.freq
        });

    ap_pCont.selectAll(".misprintCases").sort(function(a,b){
        return d3.descending(a.freq, b.freq)
    })
}


function step_00() {
    d3.csv("data/agrep_mistakes_result_copy.csv", function (mistakes) {
        databind(mistakes);
    });
}

step_00();


/*-- кнопочки гортання --*/
// миша
    $("#next-btn")
        .on("mouseover", function() {
            var currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
            var speed = (8100 - Math.abs(currentMargin))
            $("#MisprintButtons").stop().animate({
                'margin-left' : - 8100 + (window.innerWidth * 0.9) + "px"
            }, speed);
        })
        .on("mouseout", function() {
            var currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
            $("#MisprintButtons").stop().animate({
                'margin-left' : currentMargin
            }, Math.abs(currentMargin));
        });

    $("#prev-btn")
        .on("mouseover", function() {
            $("#MisprintButtons").stop().animate({
                'margin-left' : 0
            }, 5000);
        })
        .on("mouseout", function() {
            var currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
            $("#MisprintButtons").stop().animate({
                'margin-left' : currentMargin
            }, Math.abs(currentMargin));
        });





    /* --- другий блок  ---*/
    $("#next-btn-ap")
        .on("mouseover", function() {
            $("#ap_MisprintButtons").stop().animate({
                'margin-left' : - 1750 + (window.innerWidth * 0.9) + "px"
            }, 1000);
        })
        .on("mouseout", function() {
            var currentMargin = $("#ap_MisprintButtons").css("margin-left").replace("px", "");
            $("#ap_MisprintButtons").stop().animate({
                'margin-left' : currentMargin
            }, Math.abs(currentMargin));
        });


    $("#prev-btn-ap")
        .on("mouseover", function() {
            $("#ap_MisprintButtons").stop().animate({
                'margin-left' : 0
            }, 1000);
        })
        .on("mouseout", function() {
            var currentMargin = $("#ap_MisprintButtons").css("margin-left").replace("px", "");
            $("#ap_MisprintButtons").stop().animate({
                'margin-left' : currentMargin
            }, Math.abs(currentMargin));
        });





    /* по кнопках клавіатури */
    var keyup = true;
    $(document).on("keydown", function(e) {
        switch (e.which) {
            case 37:
                //якщо кнопка записнута, гортати швидко в кінець
                if(keyup === false) {
                    let currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
                    $("#MisprintButtons").stop().animate({
                        'margin-left': 0
                    }, 0);
                } else {
                    //якщо натиснули і відпустили
                    let currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
                    if(currentMargin < 0){
                        $("#MisprintButtons").stop().animate({
                            'margin-left': +currentMargin + 270 + "px"
                        }, 250);
                    } else {
                        $("#MisprintButtons").stop().animate({
                            'margin-left': - 8100 + (window.innerWidth * 0.9) + "px"
                        }, 0);
                    }
                }

                break;

            case 39:
                if(keyup === false) {
                    console.log("repeated");
                    let currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
                    let speed = (8100 - Math.abs(currentMargin));

                    $("#MisprintButtons").stop().animate({
                        'margin-left': - 8100 + (window.innerWidth * 0.9) + "px"
                    }, 0);
                } else {
                    console.log("once");
                    let currentMargin = $("#MisprintButtons").css("margin-left").replace("px", "");
                    let speed = (8100 - Math.abs(currentMargin));
                    if (currentMargin > (-8100 + (window.innerWidth * 0.9))){
                        $("#MisprintButtons").stop().animate({
                            'margin-left': +currentMargin - 270 + "px"
                        }, 250);
                    } else {
                        $("#MisprintButtons").stop().animate({
                            'margin-left': 0
                        }, 250);
                    }

                }



                break;

            default:
                return; // exit this handler for other keys
        }
        keyup = false;
        // e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $(document).keyup(function(e) {
        console.log("keyup");
        keyup = true
    });









