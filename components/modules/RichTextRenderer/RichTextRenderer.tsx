import { useEffect, useRef } from 'react';
import styles from './RichTextRenderer.module.scss'

// Список предлогов и союзов для автопереноса
const HANGING_WORDS = [
  'в', 'без', 'до', 'из', 'к', 'на', 'по', 'о', 'от', 'перед',
  'при', 'через', 'с', 'у', 'за', 'над', 'об', 'под', 'про',
  'и', 'а', 'но', 'да', 'или', 'либо', 'то', 'ни', 'не'
];

const RichTextRenderer = ({ content }) => {
  const containerRef = useRef(null);

  // Функция для обработки висячих предлогов в тексте
  const fixHangingPrepositions = (text) => {
    if (!text) return text;
    
    const regex = new RegExp(`(^|\\s)([${HANGING_WORDS.join('')}]+)\\s`, 'gi');
    return text.replace(regex, '$1$2\u00A0'); // Заменяем пробел на неразрывный
  };

  // Обработка висячих предлогов после рендеринга
  useEffect(() => {
    if (containerRef.current) {
      const processTextNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const newText = fixHangingPrepositions(node.nodeValue);
          if (newText !== node.nodeValue) {
            node.nodeValue = newText;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(processTextNodes);
        }
      };

      processTextNodes(containerRef.current);
    }
  }, [content]);

  // Функция для рендеринга текста с учетом жирного начертания
  const renderText = (children) => {
    return children.map((child, i) => {
      if (child.bold) {
        return <strong key={i}>{fixHangingPrepositions(child.text)}</strong>;
      }
      return fixHangingPrepositions(child.text);
    });
  };

  return (
    <div className={styles.richTextRenderer} ref={containerRef}>
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