import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const getCat = async () => {
//   console.log('toto');
//   let response = await axios.get(`https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3`)
//     .then(res => response.json());
// };

async function getCat() {
  const response = await axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3");
  const data = await response.data;
  const text = data.map((item => item.text));
  return text;
}

app.post('/', async (req, res) => {
  const catInfos = await getCat();
  return {
    message: `Welcome to Node Babel`,
    catFacts: catInfos 
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


