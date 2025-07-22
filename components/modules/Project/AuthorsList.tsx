
const AuthorsList = ({ authors, className }) => {
    // Преобразуем строку в массив, удаляя лишние пробелы
    const authorsArray = typeof authors === 'string' 
      ? authors.split(',').map(author => author.trim()) 
      : Array.isArray(authors) ? authors : [];
    
    // Проверяем, нужно ли разделять на два столбца
    const shouldSplit = authorsArray.length >= 5;
    
    // Если нужно разделить, вычисляем середину
    const splitIndex = shouldSplit ? Math.ceil(authorsArray.length / 2) : authorsArray.length;
    
    // Разделяем массив на две части
    const firstColumn = authorsArray.slice(0, splitIndex);
    const secondColumn = shouldSplit ? authorsArray.slice(splitIndex) : [];
    
    return (
      <div style={{ display: 'flex' }} className={className}>
        {/* Первый столбец */}
        <div style={{ marginRight: '20px' }}>
          {firstColumn.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </div>
        
        {/* Второй столбец (если нужно) */}
        {shouldSplit && (
          <div>
            {secondColumn.map((author, index) => (
              <div key={index}>{author}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default AuthorsList;