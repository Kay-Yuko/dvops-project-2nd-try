function viewResources() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-resources', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = '';

        for (var i = 0; i < response.length; i++) {
            html += '<div class="animal">' +
                '<div class="petImage">' +
                '<div class="petStatus">' + response[i].status + '</div>' +
                '</div>' +

                '<div class="animalInfo">' +
                '<p>' +
                response[i].name +
                '</p>' +

                '<div class="animalTags">' +
                '<div>' + response[i].gender + '</div>' +
                '<div>' + response[i].age + '</div>' +
                '<div>' + response[i].breed + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        document.getElementById('animalList').innerHTML = html;
    };

    request.send();
}