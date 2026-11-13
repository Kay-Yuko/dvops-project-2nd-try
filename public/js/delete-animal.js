
document.addEventListener('DOMContentLoaded', function () {
    const deleteButton = document.querySelector('.deletebtn');

    if (!deleteButton) {
        return;
    }

    deleteButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            alert('Unable to delete animal: Missing animal ID.');
            return;
        }

        const confirmed = confirm(
            'Are you sure you want to delete this animal? This action cannot be undone.'
        );

        if (!confirmed) {
            return;
        }

        deleteButton.style.pointerEvents = 'none';

        try {
            const response = await fetch(
                '/delete-resource/' + encodeURIComponent(id),
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Unable to delete animal.'
                );
            }

            alert(result.message);
            window.location.href = 'index.html';

        } catch (error) {
            alert('Deletion failed: ' + error.message);
            deleteButton.style.pointerEvents = '';
        }
    });
});
