import Layout from '../../components/Layout';

const Home = () => {
  return (
    <Layout>
      <h1 className='text-3xl uppercase'>Planejador dietético</h1>

      <hr />
      <br />
      <div>
        <h2 className='text-center text-xl'>
          “A nutrição é o único remédio que pode trazer a recuperação total e pode ser usada com
          qualquer tratamento.
        </h2>
        <h2 className='text-center text-xl'>
          Lembre-se, a comida é o nosso melhor remédio! “ – Bernard Jensen
        </h2>
      </div>
    </Layout>
  );
};

export default Home;
