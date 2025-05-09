const { default: axios } = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(cors())

app.get('/characters', async (req, res) => {
	const url = 'https://rickandmortyapi.com/api/character'
	try {
		const response = await axios.get(url)
		const characters = response.data.results
		res.json(characters)

  } catch (error) {
		res.status(404).json('No se han podido obtener los personajes')
  } 
})

app.get('/characters/:name', async (req, res) => {
	const characterName = req.params.name
	try {
		const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
		const character = response.data.results

		if (character) {
			const filterCharacter = character.map(elemento => {	// En este caso map() es lo más idóneo por que hay un array para recorrer.

				const infopersonaje = {
					name: elemento.name,
					status: elemento.status,
					species: elemento.species,
					gender: elemento.gender,
					origin: elemento.origin.name,
					image: elemento.image
				}
				return infopersonaje
			})
			res.json(filterCharacter)	
		} else {
			res.status(404).json({mensaje: 'Personaje no encontrado'})
		}
	} catch (error) {
		res.status(404).json(`No se ha podido encontrar a ${personaje}`)
	}
})

app.listen(PORT, () => {
    console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})

//----- Consideraciónes y patrones de idoneidad ------

//.map() no es adecuado para buscar un elemento específico. 
//Por ejemplo, si buscas "Rick" y quieres que te devuelva todos los personajes cuyo nombre contiene "Rick", .filter() es lo indicado.
// Otro ejemplo al que se le podría aplicar filter() sería si quisieramos que devolviera todos los sujetadores de la talla x, copa x, etc.

/*
- Recibiremos los datos del personaje.
  - Name
  - Status
  - Species
  - gender
  - origin
  - image

	const infopersonaje = {
				name: `${personaje.name}`,
				status: `${personaje.status}`,
				species: `${personaje.species}`,
				gender: `${personaje.gender}`,
				origin: `${personaje.origin}`
			}

*/