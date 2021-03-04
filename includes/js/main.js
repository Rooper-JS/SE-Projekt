function getDataset() {

    $.ajax({

        url: 'http://localhost:8080/getLessons',
        type: 'GET',
        data: {
            'ID': 'Spor'
        },
        dataType: 'json',
        success: function (data) {
            alert('Daten erhalten!  --> console ');
            console.log(data);
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });


}