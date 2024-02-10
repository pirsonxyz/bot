import axios from 'axios';
import cheerio from 'cheerio';

async function getEvangelioText() {
    try {
        // Obtener el HTML de la página
        const response = await axios.get('https://evangeli.net/evangelio/widget/web');
        const html = response.data;

        // Cargar el HTML en cheerio
        const $ = cheerio.load(html);

        // Encontrar el elemento que contiene el texto del Evangelio
        const evangelioText = $('#evangeli_mail').find('.comentari_evangeli_primer').text().trim();

        // Imprimir el texto del Evangelio
        console.log(evangelioText);
    } catch (error) {
        console.error('Error al obtener el texto del Evangelio:', error);
    }
}

// Llamar a la función para obtener el texto del Evangelio
getEvangelioText();

