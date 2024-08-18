const TweetContainer = ({ data }) => {
  return (
    <>
      {data.map((data) => (
        <div className="pb-5 pl-5 pt-3" key={data.id}>
          <p>{data.user}</p>
          <p className="pepe">{data.tweet}</p>
          <p>
            {data.fecha} {data.hora}
          </p>
        </div>
      ))}
    </>
  );
};

export default TweetContainer;
