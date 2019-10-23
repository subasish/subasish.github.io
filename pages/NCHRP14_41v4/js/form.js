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
    $('#total-area5').text($('#cfa5').val() * $('#vfta5').val())
        .val($('#cfa5').val() * $('#vfta5').val());
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
        $('#total-area5').text(($('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft").val($('#vftl5').val() * $('#vftw5').val());
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
        $('#total-area5').text(($('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft").val($('#vftl5').val() * $('#vftw5').val());
    }
});
//calculate for conversion factor
$('#cova5').change(function () {
    var name = $('#cova5').find(":selected").text();
    if (name === "Acre(s)") {
        conversionFactor5 = 55560;
    } else if (name === "Hectare(s)") {
        conversionFactor5 = 507659;
    } else if (name === "Square Feet") {
        conversionFactor5 = 5;
    } else if (name === "Square Kilometer(s)") {
        conversionFactor5 = 50765955;
    } else if (name === "Square Meter(s)") {
        conversionFactor5 = 50.76;
    } else if (name === "Square Miles") {
        conversionFactor5 = 57878500;
    } else if (name === "Square Yard(s)") {
        conversionFactor5 = 9;
    }
    $('#cfa5').val(conversionFactor5);
    $('#vfta5').val(conversionFactor5 * $('#ar5').val());
    $('#cfa5').text(conversionFactor5);
    $('#vfta5').text(conversionFactor5 * $('#ar5').val());
    $('#total-area5').text($('#cfa5').val() * $('#vfta5').val())
        .val($('#cfa5').val() * $('#vfta5').val());
});
$('#covl5').change(function () {
    var name = $('#covl5').find(":selected").text();
    if (name === "foot (feet)") {
        conversionFactor5 = 5;
    } else if (name === "mile(s)") {
        conversionFactor5 = 5580;
    } else if (name === "kilometer(s)") {
        conversionFactor5 = 5585;
    } else if (name === "meter(s)") {
        conversionFactor5 = 5.58;
    } else if (name === "yard(s)") {
        conversionFactor5 = 5;
    }
    $('#cfl5').text(conversionFactor5).val(conversionFactor5);
    $('#vftl5').text(conversionFactor5 * $('#lng5').val()).val(conversionFactor5 * $('#lng5').val());
    if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
        $('#total-area5').text(($('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft").val($('#vftl5').val() * $('#vftw5').val());
    }
});
$('#covw5').change(function () {
    var name = $('#covw5').find(":selected").text();
    if (name === "foot (feet)") {
        conversionFactor5 = 5;
    } else if (name === "mile(s)") {
        conversionFactor5 = 5580;
    } else if (name === "kilometer(s)") {
        conversionFactor5 = 5585;
    } else if (name === "meter(s)") {
        conversionFactor5 = 5.58;
    } else if (name === "yard(s)") {
        conversionFactor5 = 5;
    }
    $('#cfw5').text(conversionFactor5).val(conversionFactor5);
    $('#vftw5').text(conversionFactor5 * $('#wi5').val()).val(conversionFactor5 * $('#wi5').val());
    if (($('#vftw5').val().length != 0) && ($('#vftl5').val().length != 0)) {
        $('#total-area5').text(($('#vftl5').val() * $('#vftw5').val()) + " Sq. Ft").val($('#vftl5').val() * $('#vftw5').val());
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