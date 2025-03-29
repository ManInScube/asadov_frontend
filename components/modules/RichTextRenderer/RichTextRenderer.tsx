import styles from './RichTextRenderer.module.scss'

const RichTextRenderer = ({ content }) => {
    return (
      <div className={styles.richTextRenderer}>
        {content?.map((node, index) => {
          if (node.type === "heading") {
            const Tag = `h${node.level || 1}`; // Определяем уровень заголовка
            return (
              <Tag key={index}>
                {node.children.map((child, i) =>
                  child.bold ? <strong key={i}>{child.text}</strong> : child.text
                )}
              </Tag>
            );
          }
  
          if (node.type === "paragraph") {
            return (
              <p key={index}>
                {node.children.map((child, i) =>
                  child.bold ? <strong key={i}>{child.text}</strong> : child.text
                )}
              </p>
            );
          }
  
          return null; // Пропускаем неизвестные элементы
        })}
      </div>
    );
  };

  export default RichTextRenderer;
  