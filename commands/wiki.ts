import axios from 'axios';
import cheerio from 'cheerio';
import * as readline from 'readline';

export async function searchWikipedia(query: string): Promise<void> {
  try {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${query}`;

    const response = await axios.get(apiUrl);

    if (response.data.query && response.data.query.search) {
      const searchResults = response.data.query.search;

      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const pageId = firstResult.pageid;

        // Fetch the content of the Wikipedia page using the pageid
        const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=${pageId}&utf8=1`;
        const pageResponse = await axios.get(pageUrl);

        if (pageResponse.data.query && pageResponse.data.query.pages) {
          const pageContent = pageResponse.data.query.pages[pageId]?.extract;
          if (pageContent) {
            // Use cheerio to parse HTML and extract text content
            const $ = cheerio.load(pageContent);
            const parsedText = $('p').text(); // Assuming paragraphs contain the relevant content
            console.log('Search result for:', query);
            console.log(`Title: ${firstResult.title}`);
            console.log('Content:');
            console.log(parsedText);
          } else {
            console.log('Error retrieving page content.');
          }
        } else {
          console.log('Error in fetching page details.');
        }
      } else {
        console.log('No results found for:', query);
      }
    } else {
      console.log('Error in fetching search results.');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Example usage
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the search term: ', (searchTerm) => {
    searchWikipedia(searchTerm);
    rl.close();
});
