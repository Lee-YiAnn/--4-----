document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
    .then(response => response.json())
    .then(result => {
        alert('數據已添加');
        loadData();
    });
});

function loadData() {
    fetch('/api/list')
        .then(response => response.json())
        .then(data => {
            const dataBody = document.getElementById('dataBody');
            dataBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.date.substring(0, 4)}</td>
                    <td>${item.product_name}</td>
                    <td>${item.price}</td>
                `;
                dataBody.appendChild(row);
            });
        });
}

function searchData() {
    const query = document.getElementById('searchInput').value;
    fetch(`/api/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const dataBody = document.getElementById('dataBody');
            dataBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.date.substring(0, 4)}</td>
                    <td>${item.product_name}</td>
                    <td>${item.price}</td>
                `;
                dataBody.appendChild(row);
            });
        });
}

loadData();
