import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
//        this.getResults(query);
//    console.log(`Search starting on query: ${query}`);
    }

    async getResults() {
 //       console.log('Async starting');

        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
    
        //    console.log(this.result);
        } catch (error) {
            console.log(error);
            alert(error);
        }
        
    }
}



// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);