d3.csv("data/agrep_mistakes_result_copy.csv", function(mistakes) {

    mistakes.forEach(function(d) {
        return d.freq = + d.freq
    });

    /*--- first container ---*/
    var TRUEmistakes = mistakes.filter(function (d){
        return d.mistake === "TRUE" && d.categoryBig != "апостроф"
    });

    var nested_data = d3.nest()
        .key(function(d) { return d.category; })
        .sortValues(d3.descending)
        .entries(TRUEmistakes);


    var container = d3.select("#examplesContainer1");


    var oneMisprint = container.selectAll("div")
        .data(nested_data)
        .enter()
        .append("div")
        .attr("class", "column-mob");

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
        .attr("class", "content hideElem");

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

    var ap_container = d3.select("#examplesContainer2");


    var ap_oneMisprint = ap_container.selectAll("div")
        .data(ap_nested_data)
        .enter()
        .append("div")
        .attr("class", "column-mob");

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
        .attr("class", "content hideElem");

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


});