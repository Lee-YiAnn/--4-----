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

loadData();
