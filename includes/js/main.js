//Initiialisierungsfunktion
$(document).ready(function () {

    //Laden der Dozenten in die Liste
    getDozenten();

    setTimeout(10000);
    console.log(vm);
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
    //Event: Change Select

    //DozentID auslesen
    var ID = $("#selDozent option:selected")[0].value;

    //Events löschen
    vm.events = [];

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
    $(dataset).each(function (index) {

        var first = new Date(dataset[index].Tag);
        var time_first = new Date(dataset[index].start);
        var hh = time_first.getHours()-1;
        var mm = time_first.getMinutes();
        first.setHours(hh);
        first.setMinutes(mm);
        

        console.log("First:" + first);

        var second = new Date(dataset[index].Tag);
        var time_second = new Date(dataset[index].ende)
        var hh = time_second.getHours()-1;
        var mm = time_second.getMinutes();
        second.setHours(hh);
        second.setMinutes(mm);

        var name = dataset[index].NutzungsID + ' \n' + dataset[index].OrtsID;

        newEvent(first, second, name);


    });

}

function newEvent(first, second, name) {

    //const first = new Date("03.09.2021 8:00");
    //const second = new Date("03.09.2021 9:30");
    //var name = "Hildegard \nRaum 303";

    vm.events.push({
        name: name,
        start: first,
        end: second,
        color: "red",
        timed: 2
    })

}


