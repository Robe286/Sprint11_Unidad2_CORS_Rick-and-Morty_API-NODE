
function getCharacterInfo () {
    const characterInput = document.getElementById('characterInput')
    const placeInfo = document.getElementById('placeInfo')

    const characterName = characterInput.value.toLowerCase()

    fetch(`http://localhost:4000/characters/${characterName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        placeInfo.innerHTML =`
        <p></p>
        `
        
    }





/*
    data = {
        name: `${elemento.name}`,
        status: `${elemento.status}`,
        species: `${elemento.species}`,
        gender: `${elemento.gender}`,
        origin: `${elemento.origin.name}`,
        imagen: `${elemento.image}`
    }
*/