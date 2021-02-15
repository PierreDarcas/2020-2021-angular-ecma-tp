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

app.post('/', async (req, res) => {
  const catInfos = await getCat();
  const foxImage = await getFox();
  return {
    message: `Welcome to Node Babel`,
    catFacts: catInfos,
    fox: foxImage,
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


