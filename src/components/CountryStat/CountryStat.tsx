type CountryStatProps = {
  content: string;
  title: string;
};

const CountryStat = ({ content, title }: CountryStatProps) => {
  return (
    <div className="flex flex-col px-8 pt-8">
      <dt className="order-2 text-base font-medium text-gray-500">{title}</dt>
      <dd className="order-1 text-xl font-bold text-sky-600 sm:text-2xl sm:tracking-tight">
        {content}
      </dd>
    </div>
  );
};

export default CountryStat;
