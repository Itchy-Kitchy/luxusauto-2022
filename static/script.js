const loadEvent = () => {
    const root = document.getElementById('root');
    const autoCardDiv = document.createElement('div');
    root.appendChild(autoCardDiv);

    const getAutos = async () => {
        const allAutos = await fetch('/cars');
        return allAutos.json()
    }

    const autoCardMaker = (car) => {
        const card = document.createElement('div');
        const table = document.createElement('table');
        for (let [key, value] of Object.entries(car)) {
            table.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        card.appendChild(table);
        autoCardDiv.appendChild(card);
    }

    const viewAutos = (data) => {
        data.forEach(element => {
            autoCardMaker(element)
        });
    }

    getAutos().then((response) => viewAutos(response));
    
}

window.addEventListener('load', loadEvent);