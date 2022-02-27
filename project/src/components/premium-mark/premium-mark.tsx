type PropsType = {
  classMark?: string;
}

function PremiumMark({classMark = 'place-card__mark'}: PropsType): JSX.Element {
  return (
    <div className={classMark}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumMark;
