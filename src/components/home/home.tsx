import Breadcrumps from '../breadcrumps/breadcrumps';

function Home (): JSX.Element {

  return (
    <>
      <Breadcrumps/>
      <section className="catalog">
        <div className="container">
          <p style={{
            height:'400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#7575e2',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
          >Главная страница в разработке
          </p>
        </div>
      </section>
    </>

  );
}

export default Home;
