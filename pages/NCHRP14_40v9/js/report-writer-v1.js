$(document).ready(function() {

	$('#download-report').on("click", function() {
		// $("body").addClass("loading");
		var ycoord = 60;
		var pdf = new jsPDF('p', 'pt', 'letter');
		const XMG = 40; // x margin for document
		pdf.setLineHeightFactor(1.15);
		pdf.setFont("times");
		pdf.setFontType("bold");
		// pdf.setFontSize(16);
		pdf.text(XMG, ycoord, "Roadside Calculator\n");
		/* find all input boxes on the general info slide */
		const GENINFOS = $("input", "#slide-one-content");
		// console.log(GENINFOS);
		pdf.setFontType("normal");
		var genText = "\n";
		// to write the form inputs into tables instead, the best strategy is to use an array of arrays for the columns
		var genTable = [];
		// table object to get height of table drawn
		var tableObj = 0;
		for (var i = 0; i < GENINFOS.length; i++) {
			genLab = $("label[for='" + GENINFOS[i].id + "']")[0];
			// genText += genLab.innerHTML.replace(/&amp;/g, '&') + ": " + GENINFOS[i].value + "\n";
			genCell = [genLab.innerHTML.replace(/&amp;/g, '&'), GENINFOS[i].value];
			genTable.push(genCell);
		}
		console.log(genTable);
		pdf.setFontSize(12);
		ycoord += 40;
		// pdf.text(genText, XMG, ycoord);
		pdf.autoTable({
			theme: 'grid', 
			styles: {font: 'times', fontSize: 12}, 
			startY: ycoord, 
			margin: {left: XMG}, 
			body: genTable, 
			didDrawCell: function(hook) {tableObj= hook.table}
		});
		// ycoord += countLines(genText, "\n");
		console.log("height", tableObj.height);
		ycoord = addY(ycoord, tableObj);
		pdf.setFontType("bold");
		pdf.text("Project Description", XMG, ycoord);
		pdf.setFontType("normal");
		pdf.setLineHeightFactor(1.15);
		var text = insertLineBr($('#project-desc')[0].value);
		ycoord += 20;	
		ycoord = checkY(ycoord, countLines(text, "\n"), pdf);

		pdf.text(text, XMG, ycoord); 
		ycoord += countLines(text, "\n");
		ycoord += 20;
		// project questionnaire slide 
		const QUES = $("label, .form-group h6", "#slide-two-content");
		text = "";
		quesCell = [];
		quesTable = [];
		for (var i = 0; i < QUES.length; i++) {
			var labelFor = 0;
			// checks if it is a radio element or just a plain text input element, then reads in the input and question
			if ($(QUES[i]).attr("for") && (!$(QUES[i]).parent().hasClass("checkbox-inline"))) {
				labelFor = $(QUES[i]).attr("for");
				var label = $("label[for='" + labelFor + "']")[0];
// 				addtext = "<p><b>" + label.innerHTML + " </b>" + $("#" + labelFor, "#slide-two-content")[0].value + " ";
				// checks if the input element has a addon section that specifies units
					var units = ($('.input-group-addon', $($("#" + labelFor, "#slide-two-content")[0]).parents()[0]))
					units = $($(units[0])[0]).html();
					if (typeof units != "undefined") {
						// addtext += units;
						units = units;
					}
				else {
					units = "-";
				}
// 				addtext += "</p> "
// 				addtext = insertLineBrHTML(addtext);
// 				text += addtext;
				quesCell = [label.innerHTML, $("#" + labelFor, "#slide-two-content")[0].value, units];

				quesTable.push(quesCell);
			}
			else if ($(QUES[i]).attr("style")) {
				var label = $('input:checked', $(QUES[i]).parents()[0]).val();
				var labeln = $('input:checked', $(QUES[i]).parents()[0]);
				if ($(labeln).attr("id") == ("a-class" || "b-class")) {
					if (label == "yes") {
						label = "A";
					}
					else if (label == "no") {
						label = "B";
					}
				}
				// label = $("label", $(label).parents()[0]);
				// console.log(label);
				// label = $("label", $(label).parents()[0])[0].innerText;
// 				var addtext = "<p><b>" + QUES[i].innerHTML + " </b>" + label + " </p> ";
// 				addtext = insertLineBrHTML(addtext);
// 				text += addtext;
// 				console.log(addtext);
				quesCell = [QUES[i].innerHTML, label, "-"];
				quesTable.push(quesCell);
			}
		}
		// does string manipulation, capitalizes first letter of words, rounds floats to 4 decimal places
		for (var i = 0; i < quesTable.length; i++) {
			for (var j = 0; j < quesTable[i].length; j++) {
				if (isNaN(parseFloat(quesTable[i][j])) != true) {
						quesTable[i][j] = parseFloat(quesTable[i][j]);
						quesTable[i][j] = Math.round((quesTable[i][j] + 0.00000001) * 10000) / 10000;
				}
				else {
					try {
					capitalize(quesTable[i][j]);
					quesTable[i][j] = capitalize(quesTable[i][j]);
					} catch (e) {
						// alert("Some fields were filled incorrectly, the general report will contain blank fields. ");
					}
				}
			}
		}
		pdf.addPage();
		ycoord = 60;
		pdf.setFontType("bold");
		pdf.text(XMG, ycoord, "Project Questionnaire");
		pdf.setFontType("normal");
		ycoord += 20;
		pdf.autoTable({
			theme: 'grid', 
			styles: {font: 'times', fontSize: 12}, 
			columnStyles: {1: {cellWidth: 100}, 2: {cellWidth: 60}}, 
			startY: ycoord, 
			margin: {left: XMG}, 
			head: [['Question', 'Value', 'Unit']],
			body: quesTable, 
			didDrawCell: function(hook) {tableObj= hook.table}
		});
		// console.log(quesTable);
		ycoord = addY(ycoord, tableObj);
// 		console.log(text);
// 		ycoord = checkY(ycoord, countLines(text, "<br>") + countLines(text, "</p>"), pdf);
// 		pdf.fromHTML(text, XMG, ycoord);
// 		ycoord += countLines(text, "<br>");
// 		ycoord += countLines(text, "</p>");
		// core mixes slides
		const MIX = $("#slide-three-content, #clone1, #clone2, #clone3, #clone4");
		for (var i = 0; i < MIX.length; i++) {
			pdf.addPage();
			ycoord = 60;
			var mixTable = [];
			var mixCell = [];
			text = "<p><b>Core Mix " + (i + 1) + "</b></p>";
			var tp = MIX[i];
			console.log(tp);
			var MIXlabel = $("label, .form-group h6", MIX[i]);
			// checks if it is an input field not located in the area calculator
			for (var j  = 0; j < MIXlabel.length; j++) {
				var addtext = "";
				var labelFor = 0;
				if ($(MIXlabel[j]).attr("for") && (!$(MIXlabel[j]).parents('.modal-dialog, .checkbox-inline').length)) {
					labelFor = $(MIXlabel[j]).attr("for");
					var label = $("label[for='" + labelFor + "']", MIX[i])[0];
					if (labelFor == "area-desc") {
						addtext = "<p><b>" + label.innerHTML + " </b>"; 
						addtext += "<br>";
						addtext += $("#" + labelFor, MIX[i])[0].value + " ";
						addtext += "</p> "
						addtext = insertLineBrHTML(addtext);
						text += addtext;
					} else {
					// checks if the input element has a addon section that specifies units
					var units = ($('.input-group-addon', $($("#" + labelFor, MIX[i])[0]).parents()[0]))
					units = $($(units[0])[0]).html();
					if (typeof units == "undefined") {
						units = "-";	
					}
					mixCell = [label.innerHTML, $("#" + labelFor, MIX[i])[0].value, units]; 
					mixTable.push(mixCell);
					}

				}
				else if ($(MIXlabel[j]).attr("style") && (!$(MIXlabel[j]).parents('.modal-dialog, .checkbox-inline').length)) {
					var label = $('input:checked', $(MIXlabel[j]).parents()[0]).val();
					// var addtext = "<p><b>" + MIXlabel[j].innerHTML + " </b>" + label + " </p> ";
					mixCell = [MIXlabel[j].innerHTML, label, "-"];
					mixTable.push(mixCell);
					// addtext = insertLineBrHTML(addtext);
					// text += addtext;

				}
			}
			ycoord = checkY(ycoord, countLines(text, "<br>") + countLines(text, "</p>"), pdf);
			pdf.fromHTML(text, XMG, ycoord);
			ycoord += countLines(text, "<br>");
			ycoord += countLines(text, "</p>");
			// ycoord += 20;
		// does string manipulation, capitalizes first letter of words, rounds floats to 4 decimal places
			console.log(mixTable);
		for (var k = 0; k < mixTable.length; k++) {
			for (var h = 0; h < mixTable[k].length; h++) {
				if (isNaN(parseFloat(mixTable[k][h])) != true) {
						mixTable[k][h] = parseFloat(mixTable[k][h]);
						mixTable[k][h] = Math.round((mixTable[k][h] + 0.00000001) * 10000) / 10000;
				}
				else {
					try {
					capitalize(mixTable[k][h]);
					mixTable[k][h] = mixTable[k][h].replace(/[^\x00-\x7F]/g, 'less than') 
					mixTable[k][h] = capitalize(mixTable[k][h]);
					} catch (e) {
					}
				}
			}
		}
			pdf.autoTable({
			theme: 'grid', 
			styles: {font: 'times', fontSize: 12}, 
			columnStyles: {1: {cellWidth: 100}, 2: {cellWidth: 60}}, 
			startY: ycoord, 
			margin: {left: XMG}, 
			head: [['Question', 'Value', 'Unit']],
			body: mixTable, 
			didDrawCell: function(hook) {tableObj= hook.table}
			});
			ycoord = addY(ycoord, tableObj);
			// ycoord = checkY(ycoord, countLines(text, "<br>") + countLines(text, "</p>") + 20 + tableObj.height, pdf);
		
			
		}
		//saves pdf file
		pdf.save("report_sample.pdf");
		$("body").removeClass("loading");
	});
});

function addY(ycoord, tableObj) {
	ycoord += tableObj.height + 60;
	return ycoord;
}


function checkY(ycoord, linept, pdf) {
	if ((ycoord + linept) < 750) {
		// console.log((ycoord + linept) + " smaller than 750");
	}
	else {
		ycoord = 60;
		pdf.addPage();
	}
	return (ycoord);
}

function countLines(text, breakchar) {
	var line = 1;
	var pos = text.indexOf(breakchar);
	while (pos > -1) {
		++line;
		pos = text.indexOf(breakchar, ++pos);
	}
	return (line * 18);
}

function insertLineBrHTML(text) {
	var prevSpc = 0;
	var nextSpc = 0;
	var brmod = 0;
	var lineLimit = 100;
	for (var i = 0; i < text.length; i++) {
		if (text.charAt(i) == "<" && text.charAt(i + 1) == "b" && text.charAt(i + 2) == "r") {
			brmod = i;
		}
		if (text.charAt(i) == " ") {
			nextSpc = i;
			if (((nextSpc - brmod) % lineLimit) > ((prevSpc - brmod) % lineLimit)) {
				prevSpc = nextSpc;
			}
			else {
				text = text.substring(0, prevSpc + 1) + "<br>" + text.substring(prevSpc + 1, text.length);
				prevSpc = nextSpc;
			}
		}
	}

	return text;
}

function insertLineBr(text) {
	var prevSpc = 0;
	var nextSpc = 0;
	var lineLimit = 95;
	for (var i = 0; i < text.length; i++) {
		if (text.charAt(i) == " ") {
			nextSpc = i;
			if ((nextSpc % lineLimit) > (prevSpc % lineLimit)) {
				prevSpc = nextSpc;
			}
			else {
				text = text.substring(0, prevSpc + 1) + "\n" + text.substring(prevSpc + 1, text.length);
				prevSpc = nextSpc;
			}
		}
	}
	console.log(text);
	return text;
}

String.prototype.insert = function (index, string) {
	if (index > 0) {
		return this.substring(0, index) + string + this.substring(index, this.length);
	}
	return string + this;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
