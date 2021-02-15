import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

async function getCat() {
  const response = await axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3");
  const data = await response.data;
  const text = data.map((item => item.text));
  return text;
}

async function getFox() {
  const response = await axios.get("https://randomfox.ca/floof/");
  const image = await response.data.image;
  return image;
}

async function getHolidays(country) {
  const response = await axios.get(`https://date.nager.at/api/v2/publicholidays/2017/${country}`);
  const data = await response.data;
  return data;
}

app.post('/', async (req, res) => {
  const catInfos = await getCat();
  const image = await getFox();
  const hollidays = await getHolidays(req.body.countryCode);
  return {
    message: `Welcome to Node Babel`,
    catFacts: catInfos,
    foxImage: image,
    publicHolidays :hollidays
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


