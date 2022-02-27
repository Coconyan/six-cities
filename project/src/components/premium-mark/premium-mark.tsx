type PropsType = {
  classMark: string;
}

function PremiumMark({classMark}: PropsType): JSX.Element {
  const defaultClass='place-card__mark';
  return (
    <div className={classMark ? classMark : defaultClass}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
