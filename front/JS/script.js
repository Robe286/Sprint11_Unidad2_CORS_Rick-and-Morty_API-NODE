const characterInput = document.getElementById('characterInput')
const placeInfo = document.getElementById('placeInfo')
const form = document.getElementById('container')

async function getCharacterInfo (characterName) {
    const response = await fetch(`http://localhost:4000/characters/${characterName}`)
    
    if(!response.ok) {
        throw new Error('Error en la API')
    }
    const data = await response.json()
    return data
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const characterName = characterInput.value
    try {
        const data = await getCharacterInfo(characterName)
        placeInfo.innerHTML = ''
        console.log(data)

        if (data.length === 0 || !data) {
            placeInfo.innerHTML = '<li>Personaje no encontrado</li>'
        } else {
            placeInfo.innerHTML = data.map(character => `
                <li>
                <h2>${character.name}</h2>
                <img src=${character.image} alt=${character.name} />
                <p>Origen: ${character.origin}</p>
                <p>Genero: ${character.gender}</p>
                <p>Especie: ${character.species}</p>
                <p>Status: ${character.status}</p>
                </li>
            `).join('')    
        }
        
    } catch (error) {
        console.log(`Error: ${error} `)
    }

})

/*
*/

/*
fetch(`http://localhost:4000/characters/${characterName}`)
.then(response => response.json())
.then(data => {
    placeInfo.innerHTML = data.map(character => `
    <li>
    <h2>${character.name}</h2>
    <img src=${character.image} alt=${character.name} />
    <p>Origen: ${character.origin}</p>
    <p>Genero: ${character.gender}</p>
    <p>Especie: ${character.specie}</p>
    <p>Status: ${character.status}</p>
    </li>
    `).join('')
})
*/