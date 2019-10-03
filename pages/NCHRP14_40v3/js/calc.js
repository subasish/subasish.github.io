$(document).ready(function () {

    let conversionFactor1 = 1;
    let unit1 = "";
    let conversionFactor3 = 1;
    let conversionFactor4 = 1;
    let conversionFactor5 = 1;
    let totalAreaCalc = 0;



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// *********** AREA 1 *********** ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //disable fields in OR
    $('#ar1').on('change paste keyup', function (e) {
        if($("#ar1").val().length == 0) {
            $('#lng1, #covw1, #covl1').prop('disabled', false);
            $('#wi1').prop('disabled', false);
            $('#lng1').css('background', '#4cae4c');
            $('#wi1').css('background', '#4cae4c');
        } else {
            $('#lng1, #covw1, #covl1').prop('disabled', true);
            $('#wi1').prop('disabled', true);
            $('#lng1').css('background', 'white');
            $('#wi1').css('background', 'white');
        }
    });
    //change area text field
    $('#ar1').on('change keyup input', function() {
        if($('#cfa1').val() === "") {
            $('#vfta1').text($(this).val())
                    .val($(this).val());
        } else {
            $('#vfta1').text($('#cfa1').val() * $(this).val())
                .val($('#cfa1').val() * $(this).val());
        }
        $('#total-area1').text($("#m1").val() * $('#vfta1').val())
            .val($("#m1").val() * $('#vfta1').val());
    });
    //disable area fields when w/l is used
    $('#lng1, #wi1').on('change paste keyup', function (e) {
        if(($("#wi1").val().length == 0) && ($("#lng1").val().length == 0)) {
            $('#ar1, #cova1').prop('disabled', false);
            $('#ar1').css('background', "#4cae4c");
        } else {
            $('#ar1, #cova1').prop('disabled', true);
            $('#ar1').css('background', "white");
        }
    });
    //calculate for value in ft field
    $('#lng1').on('change keyup input', function() {  //on change length
        if($('#cfl1').val() === "") {
            $('#vftl1').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftl1').text($('#cfl1').val() * $(this).val())
                .val($('#cfl1').val() * $(this).val());
        }
        if (($('#vftw1').val().length != 0) && ($('#vftl1').val().length != 0)) {
            $('#total-area1').text(($("#m1").val() * $('#vftl1').val() * $('#vftw1').val()) + " Sq. Ft")
                .val($('#vftl1').val() * $('#vftw1').val() * $("#m1").val());
        }
    });
    $('#wi1').on('change keyup input', function() {  //on change width
        if($('#cfw1').val() === "") {
            $('#vftw1').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftw1').text($('#cfw1').val() * $(this).val())
                .val($('#cfw1').val() * $(this).val());
        }
        //change total, maybe
        if (($('#vftw1').val().length != 0) && ($('#vftl1').val().length != 0)) {
            $('#total-area1').text(($("#m1").val() * $('#vftl1').val() * $('#vftw1').val()) + " Sq. Ft")
                .val($('#vftl1').val() * $('#vftw1').val() * $("#m1").val());
        }
    });
    //calculate for conversion factor
    $('#cova1').change(function () {  //area
        var name = $('#cova1').find(":selected").text();
        if (name === "Acre(s)") {
            conversionFactor1 = 43560;
        } else if (name === "Hectare(s)") {
            conversionFactor1 = 107639;
        } else if (name === "Square Feet") {
            conversionFactor1 = 1;
        } else if (name === "Square Kilometer(s)") {
            conversionFactor1 = 10763911;
        } else if (name === "Square Meter(s)") {
            conversionFactor1 = 10.76;
        } else if (name === "Square Mile(s)") {
            conversionFactor1 = 27878400;
        } else if (name === "Square Yard(s)") {
            conversionFactor1 = 9;
        }
        $('#cfa1').val(conversionFactor1);
        $('#vfta1').val(conversionFactor1 * $('#ar1').val());
        $('#cfa1').text(conversionFactor1);
        $('#vfta1').text(conversionFactor1 * $('#ar1').val());
        $('#total-area1').text($("#m1").val() * $('#vfta1').val())
            .val($("#m1").val() * $('#vfta1').val());
    });
    $('#covl1').change(function () {  //length
        var name = $('#covl1').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor1 = 1;
        } else if (name === "mile(s)") {
            conversionFactor1 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor1 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor1 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor1 = 3;
        }
        $('#cfl1').text(conversionFactor1).val(conversionFactor1);
        $('#vftl1').text(conversionFactor1 * $('#lng1').val()).val(conversionFactor1 * $('#lng1').val());
        if (($('#vftw1').val().length != 0) && ($('#vftl1').val().length != 0)) {
            $('#total-area1').text(($('#vftl1').val() * $('#vftw1').val() * $("#m1").val()) + " Sq. Ft")
                .val($('#vftl1').val() * $('#vftw1').val() * $("#m1").val());
        }
    });
    $('#covw1').change(function () {  //width
        var name = $('#covw1').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor1 = 1;
        } else if (name === "mile(s)") {
            conversionFactor1 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor1 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor1 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor1 = 3;
        }
        $('#cfw1').text(conversionFactor1).val(conversionFactor1);
        $('#vftw1').text(conversionFactor1 * $('#wi1').val()).val(conversionFactor1 * $('#wi1').val());
        if (($('#vftw1').val().length != 0) && ($('#vftl1').val().length != 0)) {
            $('#total-area1').text(($('#vftl1').val() * $('#vftw1').val() * $("#m1").val()) + " Sq. Ft")
                .val($('#vftl1').val() * $('#vftw1').val() * $("#m1").val());
        }
    });

    //change multiplier
    $("#m1").on("change keyup input", function () {
        if ($('#vfta1').val() === "") {
            $("#total-area1").val($("#m1").val() * $("#vftl1").val() * $("#vftw1").val())
                .text($("#m1").val() * $("#vftl1").val() * $("#vftw1").val() + " Sq. Ft");
        } else {
            $("#total-area1").val($("#m1").val() * $("#vfta1").val())
                .text($("#m1").val() * $("#vfta1").val() + " Sq. Ft");
        }
    });
    //mow or not
    $('#nymow1').on('change', function () {
        if ($('#nymow1').find(":selected").val() === "Yes") {
            $('#mow1').text("Non-Mow Area");
        } else if ($('#nymow1').find(":selected").val() === "No") {
            $('#mow1').text("Mow Area");
        } else {
            $('#mow1').text("Please answer question about slopes");
        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// *********** AREA 2 *********** ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#ar2').on('change paste keyup', function (e) {
        if($("#ar2").val().length == 0) {
            $('#lng2, #covw2, #covl2').prop('disabled', false);
            $('#wi2').prop('disabled', false);
            $('#lng2').css('background', '#4cae4c');
            $('#wi2').css('background', '#4cae4c');
        } else {
            $('#lng2, #covw2, #covl2').prop('disabled', true);
            $('#wi2').prop('disabled', true);
            $('#lng2').css('background', 'white');
            $('#wi2').css('background', 'white');
        }
    });
    //change area text field
    $('#ar2').on('change keyup input', function() {
        if($('#cfa2').val() === "") {
            $('#vfta2').text($(this).val())
                .val($(this).val());
        } else {
            $('#vfta2').text($('#cfa2').val() * $(this).val())
                .val($('#cfa2').val() * $(this).val());
        }
        $('#total-area2').text($('#m2').val() * $('#vfta2').val())
            .val($('#m2').val() * $('#vfta2').val());
    });
    //disable area fields when w/l is used
    $('#lng2, #wi2').on('change paste keyup', function (e) {
        if(($("#wi2").val().length == 0) && ($("#lng2").val().length == 0)) {
            $('#ar2, #cova2').prop('disabled', false);
            $('#ar2').css('background', "#4cae4c");
        } else {
            $('#ar2, #cova2').prop('disabled', true);
            $('#ar2').css('background', "white");
        }
    });
    //calculate for value in ft field
    $('#lng2').on('change keyup input', function() {
        if($('#cfl2').val() === "") {
            $('#vftl2').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftl2').text($('#cfl2').val() * $(this).val())
                .val($('#cfl2').val() * $(this).val());
        }
        if (($('#vftw2').val().length != 0) && ($('#vftl2').val().length != 0)) {
            $('#total-area2').text(($('#vftl2').val() * $('#vftw2').val() * $("#m2").val()) + " Sq. Ft")
                .val($('#vftl2').val() * $('#vftw2').val() * $("#m2").val());
        }
    });
    $('#wi2').on('change keyup input', function() {
        if($('#cfw2').val() === "") {
            $('#vftw2').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftw2').text($('#cfw2').val() * $(this).val())
                .val($('#cfw2').val() * $(this).val());
        }
        //change total, maybe
        if (($('#vftw2').val().length != 0) && ($('#vftl2').val().length != 0)) {
            $('#total-area2').text(($('#vftl2').val() * $('#vftw1').val() * $("#m2").val()) + " Sq. Ft")
                .val($('#vftl2').val() * $('#vftw2').val() * $("#m2").val());
        }
    });
    //calculate for conversion factor
    $('#cova2').change(function () {
        var name = $('#cova2').find(":selected").text();
        if (name === "Acre(s)") {
            conversionFactor1 = 43560;
        } else if (name === "Hectare(s)") {
            conversionFactor1 = 107639;
        } else if (name === "Square Feet") {
            conversionFactor1 = 1;
        } else if (name === "Square Kilometer(s)") {
            conversionFactor1 = 10763911;
        } else if (name === "Square Meter(s)") {
            conversionFactor1 = 10.76;
        } else if (name === "Square Mile(s)") {
            conversionFactor1 = 27878400;
        } else if (name === "Square Yard(s)") {
            conversionFactor1 = 9;
        }
        $('#cfa2').val(conversionFactor1);
        $('#vfta2').val(conversionFactor1 * $('#ar2').val());
        $('#cfa2').text(conversionFactor1);
        $('#vfta2').text(conversionFactor1 * $('#ar2').val());
        $('#total-area2').text($('#vfta2').val() * $("#m2").val())
            .val($('#vfta2').val() * $("#m2").val());
    });
    $('#covl2').change(function () {
        var name = $('#covl2').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor1 = 1;
        } else if (name === "mile(s)") {
            conversionFactor1 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor1 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor1 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor1 = 3;
        }
        $('#cfl2').text(conversionFactor1).val(conversionFactor1);
        $('#vftl2').text(conversionFactor1 * $('#lng2').val()).val(conversionFactor1 * $('#lng2').val());
        if (($('#vftw2').val().length != 0) && ($('#vftl2').val().length != 0)) {
            $('#total-area2').text(($('#vftl2').val() * $('#vftw2').val()* $("#m2").val()) + " Sq. Ft")
                .val($('#vftl2').val() * $('#vftw2').val() * $("#m2").val());
        }
    });
    $('#covw2').change(function () {
        var name = $('#covw2').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor1 = 1;
        } else if (name === "mile(s)") {
            conversionFactor1 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor1 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor1 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor1 = 3;
        }
        $('#cfw2').text(conversionFactor1).val(conversionFactor1);
        $('#vftw2').text(conversionFactor1 * $('#wi2').val()).val(conversionFactor1 * $('#wi2').val());
        if (($('#vftw2').val().length != 0) && ($('#vftl2').val().length != 0)) {
            $('#total-area2').text(($('#vftl2').val() * $('#vftw2').val() * $("#m2").val()) + " Sq. Ft")
                .val($('#vftl2').val() * $('#vftw2').val() * $("#m2").val());
        }
    });

    //change multiplier
    $("#m2").on("change keyup input", function () {
        if ($('#vfta2').val() === "") {
            $("#total-area2").val($("#m2").val() * $("#vftl2").val() * $("#vftw2").val())
                .text($("#m2").val() * $("#vftl2").val() * $("#vftw2").val()  + " Sq. Ft");
        } else {
            $("#total-area2").val($("#m2").val() * $("#vfta2").val())
                .text($("#m2").val() * $("#vfta2").val()  + " Sq. Ft");
        }
    });
    //mow or not
    $('#nymow2').on('change', function () {
        if ($('#nymow2').find(":selected").val() === "Yes") {
            $('#mow2').text("Non-Mow Area");
        } else if ($('#nymow2').find(":selected").val() === "No") {
            $('#mow2').text("Mow Area");
        } else {
            $('#mow2').text("Please answer question about slopes");
        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// *********** AREA 3 *********** ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#ar3').on('change paste keyup', function (e) {
        if($("#ar3").val().length == 0) {
            $('#lng3, #covw3, #covl3').prop('disabled', false);
            $('#wi3').prop('disabled', false);
            $('#lng3').css('background', '#4cae4c');
            $('#wi3').css('background', '#4cae4c');
        } else {
            $('#lng3, #covw3, #covl3').prop('disabled', true);
            $('#wi3').prop('disabled', true);
            $('#lng3').css('background', 'white');
            $('#wi3').css('background', 'white');
        }
    });
//change area text field
    $('#ar3').on('change keyup input', function() {
        if($('#cfa3').val() === "") {
            $('#vfta3').text($(this).val())
                .val($(this).val());
        } else {
            $('#vfta3').text($('#cfa3').val() * $(this).val())
                .val($('#cfa3').val() * $(this).val());
        }
        $('#total-area3').text($('#cfa3').val() * $('#vfta3').val())
            .val($('#cfa3').val() * $('#vfta3').val());
    });
//disable area fields when w/l is used
    $('#lng3, #wi3').on('change paste keyup', function (e) {
        if(($("#wi3").val().length == 0) && ($("#lng3").val().length == 0)) {
            $('#ar3, #cova3').prop('disabled', false);
            $('#ar3').css('background', "#4cae4c");
        } else {
            $('#ar3, #cova3').prop('disabled', true);
            $('#ar3').css('background', "white");
        }
    });
//calculate for value in ft field
    $('#lng3').on('change keyup input', function() {
        if($('#cfl3').val() === "") {
            $('#vftl3').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftl3').text($('#cfl3').val() * $(this).val())
                .val($('#cfl3').val() * $(this).val());
        }
        if (($('#vftw3').val().length != 0) && ($('#vftl3').val().length != 0)) {
            $('#total-area3').text(($('#m3').val() * $('#vftl3').val() * $('#vftw3').val()) + " Sq. Ft")
                .val($('#m3').val() * $('#vftl3').val() * $('#vftw3').val());
        }
    });
    $('#wi3').on('change keyup input', function() {
        if($('#cfw3').val() === "") {
            $('#vftw3').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftw3').text($('#cfw3').val() * $(this).val())
                .val($('#cfw3').val() * $(this).val());
        }
        //change total, maybe
        if (($('#vftw3').val().length != 0) && ($('#vftl3').val().length != 0)) {
            $('#total-area3').text(($('#m3').val() * $('#vftl3').val() * $('#vftw3').val()) + " Sq. Ft")
                .val($('#m3').val() * $('#vftl3').val() * $('#vftw3').val());
        }
    });
//calculate for conversion factor
    $('#cova3').change(function () {
        var name = $('#cova3').find(":selected").text();
        if (name === "Acre(s)") {
            conversionFactor3 = 43560;
        } else if (name === "Hectare(s)") {
            conversionFactor3 = 107639;
        } else if (name === "Square Feet") {
            conversionFactor3 = 1;
        } else if (name === "Square Kilometer(s)") {
            conversionFactor3 = 10763911;
        } else if (name === "Square Meter(s)") {
            conversionFactor3 = 10.76;
        } else if (name === "Square Mile(s)") {
            conversionFactor3 = 27878400;
        } else if (name === "Square Yard(s)") {
            conversionFactor3 = 9;
        }
        $('#cfa3').val(conversionFactor3);
        $('#vfta3').val(conversionFactor3 * $('#ar3').val());
        $('#cfa3').text(conversionFactor3);
        $('#vfta3').text(conversionFactor3 * $('#ar3').val());
        $('#total-area3').text($('#m3').val() * $('#vfta3').val())
            .val($('#m3').val() * $('#vfta3').val());
    });
    $('#covl3').change(function () {
        var name = $('#covl3').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor3 = 3;
        } else if (name === "mile(s)") {
            conversionFactor3 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor3 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor3 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor3 = 3;
        }
        $('#cfl3').text(conversionFactor3).val(conversionFactor3);
        $('#vftl3').text(conversionFactor3 * $('#lng3').val()).val(conversionFactor3 * $('#lng3').val());
        if (($('#vftw3').val().length != 0) && ($('#vftl3').val().length != 0)) {
            $('#total-area3').text(($('#m3').val() * $('#vftl3').val() * $('#vftw3').val()) + " Sq. Ft")
                .val($('#m3').val() * $('#vftl3').val() * $('#vftw3').val());
        }
    });
    $('#covw3').change(function () {
        var name = $('#covw3').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor3 = 3;
        } else if (name === "mile(s)") {
            conversionFactor3 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor3 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor3 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor3 = 3;
        }
        $('#cfw3').text(conversionFactor3).val(conversionFactor3);
        $('#vftw3').text(conversionFactor3 * $('#wi3').val()).val(conversionFactor3 * $('#wi3').val());
        if (($('#vftw3').val().length != 0) && ($('#vftl3').val().length != 0)) {
            $('#total-area3').text(($('#m3').val() * $('#vftl3').val() * $('#vftw3').val()) + " Sq. Ft")
                .val($('#m3').val() * $('#vftl3').val() * $('#vftw3').val());
        }
    });
    $("#m3").on("change keyup input", function () {
        if ($('#vfta3').val() === "") {
            $("#total-area3").val($("#m3").val() * $("#vftl3").val() * $("#vftw3").val())
                .text($("#m3").val() * $("#vftl3").val() * $("#vftw3").val()  + " Sq. Ft");
        } else {
            $("#total-area3").val($("#m3").val() * $("#vfta3").val())
                .text($("#m3").val() * $("#vfta3").val()  + " Sq. Ft");
        }
    });

//mow or not
    $('#nymow3').on('change', function () {
        if ($('#nymow3').find(":selected").val() === "Yes") {
            $('#mow3').text("Non-Mow Area");
        } else if ($('#nymow3').find(":selected").val() === "No") {
            $('#mow3').text("Mow Area");
        } else {
            $('#mow3').text("Please answer question about slopes");
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// *********** AREA 4 *********** ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $('#ar4').on('change paste keyup', function (e) {
        if($("#ar4").val().length == 0) {
            $('#lng4, #covw4, #covl4').prop('disabled', false);
            $('#wi4').prop('disabled', false);
            $('#lng4').css('background', '#4cae4c');
            $('#wi4').css('background', '#4cae4c');
        } else {
            $('#lng4, #covw4, #covl4').prop('disabled', true);
            $('#wi4').prop('disabled', true);
            $('#lng4').css('background', 'white');
            $('#wi4').css('background', 'white');
        }
    });
//change area text field
    $('#ar4').on('change keyup input', function() {
        if($('#cfa4').val() === "") {
            $('#vfta4').text($(this).val())
                .val($(this).val());
        } else {
            $('#vfta4').text($('#cfa4').val() * $(this).val())
                .val($('#cfa4').val() * $(this).val());
        }
        $('#total-area4').text($('#m4').val() * $('#vfta4').val())
            .val($('#m4').val() * $('#vfta4').val());
    });
//disable area fields when w/l is used
    $('#lng4, #wi4').on('change paste keyup', function (e) {
        if(($("#wi4").val().length == 0) && ($("#lng4").val().length == 0)) {
            $('#ar4, #cova4').prop('disabled', false);
            $('#ar4').css('background', "#4cae4c");
        } else {
            $('#ar4, #cova4').prop('disabled', true);
            $('#ar4').css('background', "white");
        }
    });
//calculate for value in ft field
    $('#lng4').on('change keyup input', function() {
        if($('#cfl4').val() === "") {
            $('#vftl4').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftl4').text($('#cfl4').val() * $(this).val())
                .val($('#cfl4').val() * $(this).val());
        }
        if (($('#vftw4').val().length != 0) && ($('#vftl4').val().length != 0)) {
            $('#total-area4').text(($('#m4').val() * $('#vftl4').val() * $('#vftw4').val()) + " Sq. Ft")
                .val($('#m4').val() * $('#vftl4').val() * $('#vftw4').val());
        }
    });
    $('#wi4').on('change keyup input', function() {
        if($('#cfw4').val() === "") {
            $('#vftw4').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftw4').text($('#cfw4').val() * $(this).val())
                .val($('#cfw4').val() * $(this).val());
        }
        //change total, maybe
        if (($('#vftw4').val().length != 0) && ($('#vftl4').val().length != 0)) {
            $('#total-area4').text(($('#m4').val() * $('#vftl4').val() * $('#vftw4').val()) + " Sq. Ft")
                .val($('#m4').val() * $('#vftl4').val() * $('#vftw4').val());
        }
    });
//calculate for conversion factor
    $('#cova4').change(function () {
        var name = $('#cova4').find(":selected").text();
        if (name === "Acre(s)") {
            conversionFactor4 = 43560;
        } else if (name === "Hectare(s)") {
            conversionFactor4 = 107639;
        } else if (name === "Square Feet") {
            conversionFactor4 = 1;
        } else if (name === "Square Kilometer(s)") {
            conversionFactor4 = 10763911;
        } else if (name === "Square Meter(s)") {
            conversionFactor4 = 10.76;
        } else if (name === "Square Mile(s)") {
            conversionFactor4 = 27878400;
        } else if (name === "Square Yard(s)") {
            conversionFactor4 = 9;
        }
        $('#cfa4').val(conversionFactor4);
        $('#vfta4').val(conversionFactor4 * $('#ar4').val());
        $('#cfa4').text(conversionFactor4);
        $('#vfta4').text(conversionFactor4 * $('#ar4').val());
        $('#total-area4').text($('#m4').val() * $('#vfta4').val())
            .val($('#m4').val() * $('#vfta4').val());
    });
    $('#covl4').change(function () {
        var name = $('#covl4').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor4 = 1;
        } else if (name === "mile(s)") {
            conversionFactor4 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor4 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor4 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor4 = 3;
        }
        $('#cfl4').text(conversionFactor4).val(conversionFactor4);
        $('#vftl4').text(conversionFactor4 * $('#lng4').val()).val(conversionFactor4 * $('#lng4').val());
        if (($('#vftw4').val().length != 0) && ($('#vftl4').val().length != 0)) {
            $('#total-area4').text(($('#m4').val() * $('#vftl4').val() * $('#vftw4').val()) + " Sq. Ft")
                .val($('#m4').val() * $('#vftl4').val() * $('#vftw4').val());
        }
    });
    $('#covw4').change(function () {
        var name = $('#covw4').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor4 = 1;
        } else if (name === "mile(s)") {
            conversionFactor4 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor4 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor4 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor4 = 3;
        }
        $('#cfw4').text(conversionFactor4).val(conversionFactor4);
        $('#vftw4').text(conversionFactor4 * $('#wi4').val()).val(conversionFactor4 * $('#wi4').val());
        if (($('#vftw4').val().length != 0) && ($('#vftl4').val().length != 0)) {
            $('#total-area4').text(($('#m4').val() * $('#vftl4').val() * $('#vftw4').val()) + " Sq. Ft")
                .val($('#m4').val() * $('#vftl4').val() * $('#vftw4').val());
        }
    });
    $("#m4").on("change keyup input", function () {
        if ($('#vfta4').val() === "") {
            $("#total-area4").val($("#m4").val() * $("#vftl4").val() * $("#vftw4").val())
                .text($("#m4").val() * $("#vftl4").val() * $("#vftw4").val()  + " Sq. Ft");
        } else {
            $("#total-area4").val($("#m4").val() * $("#vfta4").val())
                .text($("#m4").val() * $("#vfta4").val()  + " Sq. Ft");
        }
    });

//mow or not
    $('#nymow4').on('change', function () {
        if ($('#nymow4').find(":selected").val() === "Yes") {
            $('#mow4').text("Non-Mow Area");
        } else if ($('#nymow4').find(":selected").val() === "No") {
            $('#mow4').text("Mow Area");
        } else {
            $('#mow4').text("Please answer question about slopes");
        }
    })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// *********** AREA 5 *********** ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#ar5').on('change paste keyup', function (e) {
        if($("#ar5").val().length == 0) {
            $('#lng5, #covw5, #covl5').prop('disabled', false);
            $('#wi5').prop('disabled', false);
            $('#lng5').css('background', '#5cae5c');
            $('#wi5').css('background', '#5cae5c');
        } else {
            $('#lng5, #covw5, #covl5').prop('disabled', true);
            $('#wi5').prop('disabled', true);
            $('#lng5').css('background', 'white');
            $('#wi5').css('background', 'white');
        }
    });
//change area text field
    $('#ar5').on('change keyup input', function() {
        if($('#cfa5').val() === "") {
            $('#vfta5').text($(this).val())
                .val($(this).val());
        } else {
            $('#vfta5').text($('#cfa5').val() * $(this).val())
                .val($('#cfa5').val() * $(this).val());
        }
        $('#total-area5').text($('#m5').val() * $('#vfta5').val())
            .val($('#m5').val() * $('#vfta5').val());
    });
//disable area fields when w/l is used
    $('#lng5, #wi5').on('change paste keyup', function (e) {
        if(($("#wi5").val().length == 0) && ($("#lng5").val().length == 0)) {
            $('#ar5, #cova5').prop('disabled', false);
            $('#ar5').css('background', "#5cae5c");
        } else {
            $('#ar5, #cova5').prop('disabled', true);
            $('#ar5').css('background', "white");
        }
    });
//calculate for value in ft field
    $('#lng5').on('change keyup input', function() {
        if($('#cfl5').val() === "") {
            $('#vftl5').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftl5').text($('#cfl5').val() * $(this).val())
                .val($('#cfl5').val() * $(this).val());
        }
        if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
            $('#total-area5').text(($('#m5').val() * $('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft")
                .val($('#m5').val() * $('#vftl5').val() * $('#vftw5').val());
        }
    });
    $('#wi5').on('change keyup input', function() {
        if($('#cfw5').val() === "") {
            $('#vftw5').text($(this).val())
                .val($(this).val());
        } else {
            $('#vftw5').text($('#cfw5').val() * $(this).val())
                .val($('#cfw5').val() * $(this).val());
        }
        //change total, maybe
        if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
            $('#total-area5').text(($('#m5').val() * $('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft")
                .val($('#m5').val() * $('#vftl5').val() * $('#vftw5').val());
        }
    });
//calculate for conversion factor
    $('#cova5').change(function () {
        var name = $('#cova5').find(":selected").text();
        if (name === "Acre(s)") {
            conversionFactor5 = 43560;
        } else if (name === "Hectare(s)") {
            conversionFactor5 = 107639;
        } else if (name === "Square Feet") {
            conversionFactor5 = 1;
        } else if (name === "Square Kilometer(s)") {
            conversionFactor5 = 10763911;
        } else if (name === "Square Meter(s)") {
            conversionFactor5 = 10.76;
        } else if (name === "Square Mile(s)") {
            conversionFactor5 = 27878400;
        } else if (name === "Square Yard(s)") {
            conversionFactor5 = 9;
        }
        $('#cfa5').val(conversionFactor5);
        $('#vfta5').val(conversionFactor5 * $('#ar5').val());
        $('#cfa5').text(conversionFactor5);
        $('#vfta5').text(conversionFactor5 * $('#ar5').val());
        $('#total-area5').text($('#m5').val() * $('#vfta5').val())
            .val($('#m5').val() * $('#vfta5').val());
    });
    $('#covl5').change(function () {
        var name = $('#covl5').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor5 = 1;
        } else if (name === "mile(s)") {
            conversionFactor5 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor5 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor5 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor5 = 3;
        }
        $('#cfl5').text(conversionFactor5).val(conversionFactor5);
        $('#vftl5').text(conversionFactor5 * $('#lng5').val()).val(conversionFactor5 * $('#lng5').val());
        if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
            $('#total-area5').text(($('#m5').val() * $('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft")
                .val($('#m5').val() * $('#vftl5').val() * $('#vftw5').val());
        }
    });
    $('#covw5').change(function () {
        var name = $('#covw5').find(":selected").text();
        if (name === "foot (feet)") {
            conversionFactor5 = 1;
        } else if (name === "mile(s)") {
            conversionFactor5 = 5280;
        } else if (name === "kilometer(s)") {
            conversionFactor5 = 3280.84;
        } else if (name === "meter(s)") {
            conversionFactor5 = 3.28;
        } else if (name === "yard(s)") {
            conversionFactor5 = 3;
        }
        $('#cfw5').text(conversionFactor5).val(conversionFactor5);
        $('#vftw5').text(conversionFactor5 * $('#wi5').val()).val(conversionFactor5 * $('#wi5').val());
        if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
            $('#total-area5').text(($('#m5').val() * $('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft")
                .val($('#m5').val() * $('#vftl5').val() * $('#vftw5').val());
        }
    });
    $("#m5").on("change keyup input", function () {
        if ($('#vfta5').val() === "") {
            $("#total-area5").val($("#m5").val() * $("#vftl5").val() * $("#vftw5").val())
                .text($("#m5").val() * $("#vftl5").val() * $("#vftw5").val()  + " Sq. Ft");
        } else {
            $("#total-area5").val($("#m5").val() * $("#vfta5").val())
                .text($("#m5").val() * $("#vfta5").val()  + " Sq. Ft");
        }
    });

//mow or not
    $('#nymow5').on('change', function () {
        if ($('#nymow5').find(":selected").val() === "Yes") {
            $('#mow5').text("Non-Mow Area");
        } else if ($('#nymow5').find(":selected").val() === "No") {
            $('#mow5').text("Mow Area");
        } else {
            $('#mow5').text("Please answer question about slopes");
        }
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* END CALC TABLE FUNCTIONS *////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    totalAreaCalc = parseFloat($('#total-area1').val()) + parseFloat($('#total-area2').val())
                        + parseFloat($('#total-area3').val()) + parseFloat($('#total-area4').val())
                        + parseFloat($('#total-area5').val());

    $('#nymow1').on('change', function () {
        console.log(parseInt($('#total-area1').val()) + parseFloat($('#total-area2').val()))
    })

    setInterval(function () {
        //sq ft totals
        $("#area1total1").text($("#total-area1").val());
        $("#area2total1").text($("#total-area2").val());
        $("#area3total1").text($("#total-area3").val());
        $("#area4total1").text($("#total-area4").val());
        $("#area5total1").text($("#total-area5").val());

        //mow y/n
        $("#area1total2").text($("#mow1").text());
        $("#area2total2").text($("#mow2").text());
        $("#area3total2").text($("#mow3").text());
        $("#area4total2").text($("#mow4").text());
        $("#area5total2").text($("#mow5").text());

        //total
        totalAreaCalc = parseFloat($('#total-area1').val()) + parseFloat($('#total-area2').val())
            + parseFloat($('#total-area3').val()) + parseFloat($('#total-area4').val())
            + parseFloat($('#total-area5').val());
        $('#totalcal1').text(totalAreaCalc + " SF").val(totalAreaCalc);
        $('#totalcal2').text((totalAreaCalc/43560).toFixed(2) + " AC").val(totalAreaCalc/43560);

        var totalMowArea = mowArea();
        $('#totalmowarea1').text(totalMowArea[0] + " SF").val(totalMowArea[0]);
        $('#totalnonmowarea1').text(totalMowArea[1] + " SF").val(totalMowArea[1]);
        $('#totalmowarea2').text((totalMowArea[0]/43560).toFixed(2) + " AC").val(totalMowArea[0]/43560);
        $('#totalnonmowarea2').text((totalMowArea[1]/43560).toFixed(2) + " AC").val(totalMowArea[1]/43560);
    }, 100);



    function mowArea() {
        var total = [0, 0];
        if ($('#mow1').text() === "Mow Area") {
            total[0]+= parseFloat($('#total-area1').val());
        } else {
            total[1]+= parseFloat($('#total-area1').val());
        }
        if ($('#mow2').text() === "Mow Area") {
            total[0]+= parseFloat($('#total-area2').val());
        } else {
            total[1]+= parseFloat($('#total-area2').val());
        }
        if ($('#mow3').text() === "Mow Area") {
            total[0]+= parseFloat($('#total-area3').val());
        } else {
            total[1]+= parseFloat($('#total-area3').val());
        }
        if ($('#mow4').text() === "Mow Area") {
            total[0]+= parseFloat($('#total-area4').val());
        } else {
            total[1]+= parseFloat($('#total-area4').val());
        }
        if ($('#mow5').text() === "Mow Area") {
            total[0]+= parseFloat($('#total-area5').val());
        } else {
            total[1]+= parseFloat($('#total-area5').val());
        }
        return total;
    }




    //********************************************************************************************//
//**************************   BUTTON FUNCTIONS   ********************************************//
//********************************************************************************************//

    $('#back-with-no-results').click(function () {
        window.location.href = "vdot.html#calc";
    });

    $('#back-with-results').click(function () {
        console.log("here?3");

        var obj = '{ "coreMixTotals" : [' +
            parseFloat($('#total-area1').val()) + ',' + parseFloat($('#total-area2').val()) + ',' +
            parseFloat($('#total-area3').val()) + ',' + parseFloat($('#total-area4').val()) + ',' +
            parseFloat($('#total-area5').val()) + '],' +
            '"areaTotals" : {' +
            '"totalArea" : {"SF" : ' + $('#totalcal1').val() + ', "AC" :' + $('#totalcal2').val() + '},' +
            '"totalMowArea" : {"SF" : ' + $('#totalmowarea1').val() + ', "AC" :' + $('#totalmowarea2').val() + '},' +
            '"totalNonMowArea" : {"SF" : ' + $('#totalnonmowarea1').val() + ', "AC" :' + $('#totalnonmowarea2').val() + '}}}';
        console.log(obj);
	var json = JSON.parse(obj);
        console.log("here?1");
        sessionStorage.setItem("calculator_user", obj);
        console.log("here?");
        window.location.href = "vdot.html#calc";
        //send json to server
    });

    $('#clear-entries').click(function () {
        $('table.core-mix td input').each(function () {
            $(this).val('');
        })
    });

});




