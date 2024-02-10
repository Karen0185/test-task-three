const services = [
    { "id": 1, "head": null, "name": "Проф.осмотр", "node": 0, "price": 100.0, "sorthead": 20 },
    { "id": 2, "head": null, "name": "Хирургия", "node": 1, "price": 0.0, "sorthead": 10 },
    { "id": 3, "head": 2, "name": "Удаление зубов", "node": 1, "price": 0.0, "sorthead": 10 },
    { "id": 4, "head": 3, "name": "Удаление зуба", "node": 0, "price": 800.0, "sorthead": 10 },
    { "id": 5, "head": 3, "name": "Удаление 8ого зуба", "node": 0, "price": 1000.0, "sorthead": 30 },
    { "id": 6, "head": 3, "name": "Удаление осколка зуба", "node": 0, "price": 2000.0, "sorthead": 20 },
    { "id": 7, "head": 2, "name": "Хирургические вмешательство", "node": 0, "price": 200.0, "sorthead": 10 },
    { "id": 8, "head": 2, "name": "Имплантация зубов", "node": 1, "price": 0.0, "sorthead": 20 },
    { "id": 9, "head": 8, "name": "Коронка", "node": 0, "price": 3000.0, "sorthead": 10 },
    { "id": 10, "head": 8, "name": "Слепок челюсти", "node": 0, "price": 500.0, "sorthead": 20 }
];

function buildTree(services, parentId) {
    const filteredServices = services.filter(service => service.head === parentId);

    if (filteredServices.length === 0) return '';

    filteredServices.sort((a, b) => a.sorthead - b.sorthead);

    let servicesList = '<ul>';
    filteredServices.forEach(service => {
        servicesList += `<li>${service.name} (${service.price})`;
        servicesList += buildTree(services, service.id);
        servicesList += `</li>`;
    });
    servicesList += '</ul>';
    return servicesList;
}

document.getElementById('tree').innerHTML = buildTree(services, null);

document.querySelectorAll('li').forEach(item => {
    window.addEventListener('load', () => {
        const ul = item.querySelector('ul');
        if(ul) {
            
            ul.style.display = 'none';
            ul.parentNode.classList.add('has-child');
            item.addEventListener('click', function (event) {
                ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                ul.parentNode.classList.toggle('show') 
                event.stopPropagation();
            });
        }
    })
});