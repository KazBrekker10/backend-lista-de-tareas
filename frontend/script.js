const turisticList = document.getElementById("turistic-list");

async function getTuristicPlaces() {
    const data = await fetch("http://localhost:3000/turisticos");
    const turistcPlaces = await data.json();
    return turistcPlaces;
};

function turisticCard({city,name,description,region}){
    return `<li>
                <h3>${name} : ${city}</h3>
                <p>${description}</p>

            </li>`
}

async function renderTuristicCards(){
    const turisticPlaces = await getTuristicPlaces();
    console.log(turisticPlaces)
    turisticList.innerHTML = turisticPlaces.map(place=> turisticCard(place) );
}

renderTuristicCards();