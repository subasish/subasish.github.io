$(document).ready(function () {

    $("#second-calc-slide").hide();
    $("#third-calc-slide").hide();


    $(function() {
        $('#info-popover').popover({html:true})
            .on('shown.bs.popover', function () {
                $('#information-popovercontent').bootstrapTable();
            });
    });

    $('html').on('click', function(e) {
        if (typeof $(e.target).data('original-title') == 'undefined' && !$(e.target).parents().is('.popover.in')) {
            $('[data-original-title]').popover('hide');
        }
    });
    $(document).on('hide.bs.modal', '#area-calculator, #area-calculator1, #area-calculator2, #area-calculator3, #area-calculator4', function () {
	    var tp = $(this).parent();
	    $("#first-calc-slide", tp).show();
        $("#second-calc-slide", tp).hide();
        $("#third-calc-slide", tp).hide();
    })


    $("#lw").on("click", function () {
	    var tp = $(this).parents();
	    console.log(tp[6].id);
        $("#first-calc-slide", tp[6]).hide();
        $("#second-calc-slide", tp[6]).show();
        $("#third-calc-slide", tp[6]).hide();
    });
    $("#ar").on("click", function () {
        var tp = $(this).parents();
	    $("#first-calc-slide", tp[6]).hide();
        $("#second-calc-slide", tp[6]).hide();
        $("#third-calc-slide", tp[6]).show();
    });

    $('.dropdown-toggle').dropdown()

});


function setMeasurement() {
}

function LW(tpObj) {
   var tp = $(tpObj).parents()[6]; 
	var fields = new Array();
    for (var i = 1; i <= 5; i++) {
        var length = parseFloat($("#length-value" + i, tp).val());
        var width = parseFloat($("#width-value" + i, tp).val());
        var multiplier = parseFloat($("#mult-value" + i, tp).val());
        var measurement = $('input[name=LWmeasurementRadios' + i + ']:checked', tp).val();
        var slope = $('input[name=slopeRadio' + i + ']:checked', tp).val();
        var obj = {
            length: length,
            width: width,
            multiplier: multiplier,
            measurement: measurement,
            slope: slope
        }
        fields.push(obj);
    }
    for (var i = 0; i < fields.length; i++) {
        console.log(fields[i]);
    }

    var mowedArea = $("#mowed-area-seed", tp);
    var nonMowedArea= $("#non-mowed-area-seed", tp);
    var coreMixTotal = $("#how-large-is-area-core-mix", tp);

    var m = 0;
    var n = 0;
    for (var i = 0; i < fields.length; i++) {
        var total = 0;
        if (fields[i].measurement === "option1") {
            total = convertToAcres(fields[i].length * fields[i].width, "sfeet");
        } else if (fields[i].measurement === "option2") {
            total = convertToAcres(fields[i].length * fields[i].width, "smiles");
        } else if (fields[i].measurement === "option3") {
            total = convertToAcres(fields[i].length * fields[i].width, "skilo");
        } else if (fields[i].measurement === "option4") {
            total = convertToAcres(fields[i].length * fields[i].width, "smeters");
        } else if (fields[i].measurement === "option5") {
            total = convertToAcres(fields[i].length * fields[i].width, "syards");
        }

        total *= fields[i].multiplier;
        console.log(total);
        if (fields[i].slope == "yes" && total) {
            n += total;
        } else if (fields[i].slope == "no" && total) {
            m += total;
        }

    }
    mowedArea.val(m);
    nonMowedArea.val(n);
    coreMixTotal.val(n + m);

}

function A(tpObj) {
    /* the var tp throughout this script makes sure that the modals for each core mix perform calculations independently with their respective input boxes */
	var tp = $(tpObj).parents()[6];
	console.log(tp.id);
	var fields = new Array();
    for (var i = 1; i <= 5; i++) {
        var area = parseFloat($("#area-value" + i, tp).val());
        var multiplier = parseFloat($("#mult-value" + i + "a", tp).val());
        var measurement = $('input[name=AmeasurementRadios' + i + ']:checked', tp).val();
        var slope = $('input[name=slopeRadioA' + i + ']:checked', tp).val();
        var obj = {
            area: area,
            multiplier: multiplier,
            measurement: measurement,
            slope: slope
        }
        fields.push(obj);
    }
    for (var i = 0; i < fields.length; i++) {
        console.log(fields[i]);
    }

    var mowedArea = $("#mowed-area-seed", tp);
    var nonMowedArea= $("#non-mowed-area-seed", tp);
    var coreMixTotal = $("#how-large-is-area-core-mix", tp);

    var m = 0;
    var n = 0;
    for (var i = 0; i < fields.length; i++) {
        var total = 0;
        if (fields[i].measurement === "option1") {
            total = convertToAcres(fields[i].area, "sfeet");
        } else if (fields[i].measurement === "option2") {
            total = fields[i].area;
        } else if (fields[i].measurement === "option3") {
            total = convertToAcres(fields[i].area, "hect");
        } else if (fields[i].measurement === "option4") {
            total = convertToAcres(fields[i].area, "skilo");
        } else if (fields[i].measurement === "option5") {
            total = convertToAcres(fields[i].area, "syards");
        } else if (fields[i].measurement === "option6") {
            total = convertToAcres(fields[i].area, "smeters");
        } else if (fields[i].measurement === "option7") {
            total = convertToAcres(fields[i].area, "smiles");
        }

        total *= fields[i].multiplier;
        console.log(total);
        if (fields[i].slope == "yes" && total) {
            n += total;
        } else if (fields[i].slope == "no" && total) {
            m += total;
        }

    }
    mowedArea.val(m);
    nonMowedArea.val(n);
    coreMixTotal.val(n + m);

}

function convertToAcres(num, convert) {

    var converted = 0;
    if (convert === "sfeet") {
        converted = 0.000022957 * num;
    } else if (convert === "smiles") {
        converted = 640 * num;
    } else if (convert === "skilo") {
        converted = 247.11 * num;
    } else if (convert === "smeters") {
        converted = 0.000247105 * num;
    } else if (convert === "syards") {
        converted = 0.00020661 * num;
    } else if (convert === "hect") {
        converted = 2.47105 * num;
    }
    return converted;
}

function fillForm(divID) {

}

function calculateTable() {

}
