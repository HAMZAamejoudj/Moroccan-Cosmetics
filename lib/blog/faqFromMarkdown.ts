export type FaqItem = { question: string; answer: string };

export function extractFaqFromMarkdown(body: string): FaqItem[] {
  const lines = body.split(/\r?\n/);
  let inFaq = false;
  let currentQuestion: string | null = null;
  let answerLines: string[] = [];
  const items: FaqItem[] = [];

  const flush = () => {
    if (currentQuestion && answerLines.length) {
      items.push({
        question: currentQuestion,
        answer: answerLines.join(' ').replace(/\s+/g, ' ').trim(),
      });
    }
    currentQuestion = null;
    answerLines = [];
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      const title = h2[1].trim().toLowerCase();
      if (title === 'faq' || title === 'frequently asked questions') {
        flush();
        inFaq = true;
        continue;
      }
      if (inFaq) {
        flush();
        inFaq = false;
      }
      continue;
    }

    if (!inFaq) continue;

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flush();
      currentQuestion = h3[1].trim();
      continue;
    }

    if (currentQuestion && line.trim()) {
      answerLines.push(line.trim());
    }
  }

  flush();
  return items;
}
