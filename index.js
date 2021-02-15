import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

async function getCat() {
  try{
    const response = await axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3");
    const data = await response.data;
    const text = data.map((item => item.text));
    return text;
  } catch(error){
    console.log("error", error);
    return null;
  }

}

async function getFox() {
  try{
    const response = await axios.get("https://randomfox.ca/floof/");
    const image = await response.data.image;
    return image;
  }catch(error){
    console.log("error", error);
    return null;
  }

}

async function getHolidays(country) {
  try{
    const response = await axios.get(`https://date.nager.at/api/v2/publicholidays/2017/${country}`);
    const data = await response.data;
    return data;
  }catch(error){
    console.log("error", error);
    return null;
  }
}

app.post('/', async (req, res) => {
  const catInfos = await getCat();
  const image = await getFox();
  const hollidays = await getHolidays(req.body.countryCode);
  return {
    foxPicture: image,
    catFacts: catInfos,
    holidays :hollidays
  };
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();


