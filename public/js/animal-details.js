function viewAnimalDetails() {
    var response = '';
    var request = new XMLHttpRequest();

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    request.open('GET', '/view-resources/' + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = '';

        html += '<div class="entireData" id="entireData">' +
            '<div class="animalTags-details">' +
                '<div>' +
                    '<p>' + response.gender + '</p>' +
                '</div>' +
                '<div>' +
                    '<p>' + response.age + '</p>' +
                '</div>' +
                '<div>' +
                    '<p>' + response.breed + '</p>' +
                '</div>' +
            '</div>' +

            '<h1 class="animalName">' + response.name + '</h1>' +
            '<hr style="width: 90%; margin: 20px auto;">' +

            '<div class="animalDetails" id="animalDetails">' +
                '<div class="animalImage">' +
                    '<img src="' + response.image + '">' +
                '</div>' +

                '<div class="animalDescription">' +
                    '<h2>About ' + response.name + '</h2>' +
                    '<p>' + response.description + '</p>' +
                    '<button class="adoptButton">' +
                        '<p>Adopt ' + response.name + '</p>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';

        document.getElementById('entireData').innerHTML = html;
    };

    request.send();
}
