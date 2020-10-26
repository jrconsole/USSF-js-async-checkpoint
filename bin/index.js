#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');

const [inputFileName, outputFileName] = process.argv.slice(2);
let inputFilePath;
if (inputFileName.slice(2, inputFileName.length - 1) === 'C:') {
    inputFilePath = inputFileName;
} else {
    inputFilePath = `${process.cwd().split("\\").join('/')}/${inputFileName}`;
}

const addTypes = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        if (response.status !== 200) {
            throw new Error(`Improper response: ${response.status}`)
        };

        const jsonResponse = await response.json();
        const typesArray = jsonResponse.types.map(typeObj => typeObj.type.name);

        fs.appendFileSync(outputFileName, `${pokemon}: ${typesArray.join(', ')}\n`);

    } catch (err) {
        console.error(err);
    }
}

fs.writeFileSync(outputFileName, '');
const pokemonList = fs.readFileSync(inputFilePath).toString();

const pokemonArray = pokemonList.split('\r\n');

pokemonArray.forEach(pokemon => {
    addTypes(pokemon)
})


