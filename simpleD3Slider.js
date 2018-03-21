/* Simple, reusable slider in pure d3 */

function simpleSlider () {

    var width = 100,
        valueL = 0, /* Domain assumes to be [0 - 1] */
        valueH = 1, /* Domain assumes to be [0 - 1] */
        event,
        x = 0,
        y = 0;

    function fractotime(frac){
        result = "";
        var time = 24*frac;
        var hr = Math.floor(time);
        var min = Math.floor((time - Math.floor(time))*60);
        var ampm = ""
        if (hr >= 12 && hr != 24){
            ampm += "pm";
        }else{
            ampm += "am"
        }
        if (hr > 12){
            hr = hr-12
        }
        if (min>=10){
            result += hr + ":" + min + " " + ampm;
        }else{
            result += hr + ":" + "0" + min + " " + ampm;            
        }

        return result;
    }

    function slider (selection) {

        //Line to represent the current value
        var valueLine = selection.append("line")
            .attr("x1", x + (width * valueL))
            .attr("x2", x + (width * valueH))
            .attr("y1", y)
            .attr("y2", y)
            .style({stroke: "yellow",
                    "stroke-linecap": "square",
                    "stroke-width": 6 });

        //Line to show the remaining value
        var emptyLine1 = selection.append("line")
            .attr("x1", x)
            .attr("x2", x + (width * valueL))
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "square",
                "stroke-width": 6
            });

        var emptyLine2 = selection.append("line")
            .attr("x1", x + (width * valueH))
            .attr("x2", x + width)
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "square",
                "stroke-width": 6
            });

        var dragL = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            valueL = (newX - x) / width;
            valueCircleL.attr("cx", newX);
            textL.text(fractotime((newX-x)/width));
            textL.attr("x", x + (width * valueL));
            valueLine.attr("x1", x + (width * valueL));
            emptyLine1.attr("x2", x + (width * valueL));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })

        var dragH = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            valueH = (newX - x) / width;
            valueCircleH.attr("cx", newX);
            textH.text(fractotime((newX-x)/width));
            textH.attr("x", x + (width * valueH));
            valueLine.attr("x2", x + (width * valueH));
            emptyLine2.attr("x1", x + (width * valueH));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })        

        //Draggable circle to represent the current value
        var valueCircleL = selection.append("circle")
            .attr("cx", x + (width * valueL))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 1.0,
                "fill": "white"
            })
            .call(dragL);

        var textL = selection.append("text")
            .attr("x", x + (width * valueL))
            .attr("y", y + 23)
            .text("0:00 am")
            .attr("text-anchor", "middle")
            .style({
                "fill": "white"
            })
            .style({
                "font-family": "Helvetica"
            })
            .style({
                "font-size": "14px"
            })
            .call(dragL);

        var valueCircleH = selection.append("circle")
            .attr("cx", x + (width * valueH))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 1.0,
                "fill": "white"
            })
            .call(dragH);

        var textH = selection.append("text")
            .attr("x", x + (width * valueH))
            .attr("y", y + 23)
            .attr("text-anchor", "middle")
            .text("12:00 am")
            .style({
                "fill": "white"
            })
            .style({
                "font-family": "Helvetica"
            })
            .style({
                "font-size": "14px"
            })
            .call(dragH);
    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.valueL = function (val) {
        if (val) {
            valueL = val;
            return slider;
        } else {
            return valueL;
        }
    }

    slider.valueH = function (val) {
        if (val) {
            valueH = val;
            return slider;
        } else {
            return valueH;
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}