import Breadcrumbs from '../breadcrumbs/breadcrumbs';

function Home (): JSX.Element {

  return (
    <>
      <Breadcrumbs/>
      <section className="catalog" data-testid="home">
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
