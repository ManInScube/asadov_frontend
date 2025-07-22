import styles from './RichTextRenderer.module.scss';

// Функция для обработки висячих предлогов
const fixHangingPrepositions = (text) => {
  if (!text) return text;
  
  const prepositions = ['но и', 'и не', 'и в', 'из-за', 'то есть', 'как бы', 'в', 'без', 'до', 'из', 'к', 'на', 'по', 'о', 'от', 'перед', 
                       'при', 'через', 'с', 'у', 'за', 'над', 'об', 'под', 'про', 
                       'и', 'а', 'но', 'да', 'или', 'либо', 'то', 'ни', 'не'];
  
  // Регулярное выражение для поиска предлогов перед переносом
  const regex = new RegExp(`(^|\\s)([${prepositions.join('')}])(\\s)(?=[а-яё])`, 'gi');
  
  // Заменяем пробел после предлога на неразрывный пробел
  return text.replace(regex, '$1$2\u00A0');
};

const RichTextRenderer = ({ content }) => {
  // Функция для рендеринга текста с обработкой висячих предлогов
  const renderText = (children) => {
    return children.map((child, i) => {
      if (child.bold) {
        return <strong key={i}>{fixHangingPrepositions(child.text)}</strong>;
      }
      return fixHangingPrepositions(child.text);
    });
  };

  return (
    <div className={styles.richTextRenderer}>
      {content?.map((node, index) => {
        if (node.type === "heading") {
          const Tag = `h${node.level || 1}`;
          return (
            <Tag key={index}>
              {renderText(node.children)}
            </Tag>
          );
        }

        if (node.type === "paragraph") {
          return (
            <p key={index}>
              {renderText(node.children)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};

export default RichTextRenderer;