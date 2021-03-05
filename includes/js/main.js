//Initiialisierungsfunktion
$(document).ready(function () {

    //Laden der Dozenten in die Liste
    getDozenten();


});




function getDozenten() {
        
    $.ajax({

        url: 'http://localhost:8080/getDozenten',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            //Dozenten als <option> in <select>
            data.forEach(function (item) {

                var text = '';
                if (item.titel && item.titel != 0) text = item.titel;
                if (item.vorname) text += ' ' + item.vorname;
                if (item.name) text += ' ' + item.name;

                $("#selDozent").append($('<option>', {
                    value: item.DozentID,
                    text: text 
                }));
            });

        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
}


function getDataset() {
    //Event: Click #pullData Button

    //DozentID auslesen
    var ID = $("#selDozent option:selected")[0].value;

    //Woche auslesen (Anfangs- und Enddatum) und mitsenden
    //......... TO DO  ..........

    $.ajax({

        url: 'http://localhost:8080/getLessons',
        type: 'GET',
        data: {
            'ID': ID
        },
        dataType: 'json',
        success: function (data) {

            //Stundenplan-Daten hier verarbeiten 
            console.log(data);
            handleDataset(data);

        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
}

function handleDataset(dataset) {

    //Hier in Kalender einfügen...

}