type StarProps = {
  xlinkHref: string;
}

function Star ({xlinkHref}: StarProps): JSX.Element {
  return (
    <svg width="17" height="16" aria-hidden="true" data-testid="star">
      <use xlinkHref={xlinkHref}></use>
    </svg>
  );
}

export default Star;
