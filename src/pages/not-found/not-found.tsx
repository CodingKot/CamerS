import { Link } from 'react-router-dom';

function NotFound (): JSX.Element {
  return (
    <div className="wrapper">
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
        <h1>404. Страница не найдена</h1>
        <Link to="/" style={{
          color: 'red',
        }}
        >Веруться на главную
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
