
const AuthorsList = ({ authors }) => {
  // Проверяем, нужно ли разделять на два столбца
  const shouldSplit = authors.length >= 5;
  
  // Если нужно разделить, вычисляем середину
  const splitIndex = shouldSplit ? Math.ceil(authors.length / 2) : authors.length;
  
  // Разделяем массив на две части
  const firstColumn = authors.slice(0, splitIndex);
  const secondColumn = shouldSplit ? authors.slice(splitIndex) : [];
  
  return (
    <div style={{ display: 'flex' }}>
      {/* Первый столбец */}
      <span style={{ marginRight: '10px' }}>
        {firstColumn.map((author, index) => (
          <div key={index}>{author}</div>
        ))}
      </span>
      
      {/* Второй столбец (если нужно) */}
      {shouldSplit && (
        <span>
          {secondColumn.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </span>
      )}
    </div>
  );
};