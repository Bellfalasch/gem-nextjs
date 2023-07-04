import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { Checkbox } from "@gjensidige/core-components/lib/forms/checkbox";
import { Input } from "@gjensidige/core-components/lib/forms/input";
import { RadioButton } from "@gjensidige/core-components/lib/forms/radiobutton";
import { TextContainer } from "@gjensidige/core-components/lib/text-container";
import { DateRange } from "@gjensidige/nci-core-icons/lib/date-range";
import { Valuables } from "@gjensidige/nci-core-icons/lib/products/valuables";
import { Title, Text } from "@gjensidige/nci-core-typography";
import { format } from "date-fns";
import React, { useState } from "react";

import styles from "./Rsvp.module.css";

const Rsvp = (props: FetchContentResult) => {
  const [value, setValue] = useState("");
  const { data } = props.data?.get as any;
  const { openForRegistration, closedForRegistration } = data;

  const registrationDate = format(new Date(openForRegistration), "dd.MM.yyyy");
  const registrationTime = format(new Date(openForRegistration), "HH:mm");
  const closedDate = format(new Date(closedForRegistration), "dd.MM.yyyy");
  const closedTime = format(new Date(closedForRegistration), "HH:mm");

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextContainer className={styles.container}>
          <div className={styles.columnise}>
            <Title tag="h4" size="6">
              Registration opens at:
            </Title>
            {registrationDate && (
              <div className={styles.iconAndTextCell}>
                <DateRange className={styles.icon} />
                <Text>
                  <strong>
                    {format(new Date(registrationDate), "dd.MM.yyyy")}
                  </strong>
                </Text>
              </div>
            )}
            {registrationTime && (
              <div className={styles.iconAndTextCell}>
                <Valuables className={styles.icon} />
                <Text>{registrationTime}</Text>
              </div>
            )}
          </div>

          <div className={styles.columnise}>
            <Title tag="h4" size="6">
              Closed for registration at:
            </Title>
            {closedDate && (
              <div className={styles.iconAndTextCell}>
                <DateRange className={styles.icon} />
                <Text>
                  <strong>{format(new Date(closedDate), "dd.MM.yyyy")}</strong>
                </Text>
              </div>
            )}
            {closedTime && (
              <div className={styles.iconAndTextCell}>
                <Valuables className={styles.icon} />
                {closedTime && <Text>{closedTime}</Text>}
              </div>
            )}
          </div>
        </TextContainer>
        <Title tag="h4" size="4" style={{ marginTop: "1rem" }}>
          Are you coming?
        </Title>
        <RadioButton
          id="RadioButton-1"
          name="attending?"
          className="visual-test-override"
          label="Im attending"
          value="attending"
          withBackground={false}
        />
        <RadioButton
          id="RadioButton-2"
          name="attending?"
          className="visual-test-override"
          label="Not attending"
          value="not attending"
          withBackground={false}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "55%",
        }}
      >
        <Title tag="h4" size="4" style={{ marginTop: "1rem" }}>
          Do you have allergies or food intolerances?
        </Title>
        <Checkbox
          id="Checkbox-1"
          name="allergy"
          label="Nei"
          value="Nei"
          defaultChecked
        />
        <Checkbox
          id="Checkbox-2"
          name="allergy"
          label="Bløtdyr"
          value="Bløtdyr"
        />
        <Checkbox id="Checkbox-3" name="allergy" label="Egg" value="Egg" />
        <Checkbox id="Checkbox-4" name="allergy" label="Fisk" value="Fisk" />
        <Checkbox
          id="Checkbox-5"
          name="allergy"
          label="Gluten"
          value="Gluten"
        />
        <Checkbox id="Checkbox-6" name="allergy" label="Lupin" value="Lupin" />
        <Checkbox id="Checkbox-7" name="allergy" label="Melk" value="Melk" />
        <Checkbox
          id="Checkbox-8"
          name="allergy"
          label="Nøtter"
          value="Nøtter"
        />
        <Checkbox
          id="Checkbox-9"
          name="allergy"
          label="Peanøtter"
          value="Peanøtter"
        />
        <Checkbox
          id="Checkbox-10"
          name="allergy"
          label="Selleri"
          value="Selleri"
        />
        <Checkbox
          id="Checkbox-11"
          name="allergy"
          label="Sennep"
          value="Sennep"
        />
        <Checkbox
          id="Checkbox-12"
          name="allergy"
          label="Sesamfrø"
          value="Sesamfrø"
        />
        <Checkbox
          id="Checkbox-13"
          name="allergy"
          label="Skalldyr"
          value="Skalldyr"
        />
        <Checkbox id="Checkbox-14" name="allergy" label="Soya" value="Soya" />
        <Checkbox
          id="Checkbox-15"
          name="allergy"
          label="Svoveldioksid/sulfitter"
          value="Svoveldioksid/sulfitter"
        />
        <Input
          id="input-1D"
          // helpText="If possible we can help"
          labelText="Something else we should know about?"
          name="annet melding"
          onChange={(event) => setValue(event.currentTarget.value)}
          value={value}
        />
      </div>
    </div>
  );
};

export default Rsvp;
