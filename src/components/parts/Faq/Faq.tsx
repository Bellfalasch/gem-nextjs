import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import { Expandable } from "@gjensidige/core-components/lib/expandable";
import { Text } from "@gjensidige/nci-core-typography/lib/text";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import React from "react";

import styles from "./Faq.module.css";

interface FaqProps extends PartProps {
  faqs: string;
  question: string;
  answer: string;
}

const Faq: React.FC<FaqProps> = ({ part }) => {
  const faqs = part?.config?.faqs || "";
  if (!faqs) {
    return null;
  }

  return (
    <main id="partAnchor_faq" className={styles.container}>
      <Title tag="h2" size="2">
        Ofte stilte spørsmål
      </Title>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        faqs.map((faq: any, i: number) => (
          <Expandable key={i} wrapperClassName={styles.faqs}>
            {{
              header: <Text size="body">{faq.question}</Text>,
              content: <Text size="small">{faq.answer}</Text>,
            }}
          </Expandable>
        ))
      }
    </main>
  );
};

export default Faq;
