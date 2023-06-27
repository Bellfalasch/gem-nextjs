import { PartProps } from "@enonic/nextjs-adapter/views/BasePart";
import { Checkbox } from "@gjensidige/core-components/lib/forms/checkbox";
import { Input } from "@gjensidige/core-components/lib/forms/input";
import { RadioButton } from "@gjensidige/core-components/lib/forms/radiobutton";
import { Title } from "@gjensidige/nci-core-typography";
import React, { useState } from "react";

interface RsvpProps extends PartProps {
  myradiobutton: string;
  allergy: string;
}

const Rsvp: React.FC<RsvpProps> = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "35%",
        }}
      >
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
