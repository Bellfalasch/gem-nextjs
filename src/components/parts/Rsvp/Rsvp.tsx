import type { FetchContentResult } from "@enonic/nextjs-adapter";
import { Default } from "@gjensidige/core-components/lib/alerts/default";
import { Button } from "@gjensidige/core-components/lib/button";
import { Checkbox } from "@gjensidige/core-components/lib/forms/checkbox";
import { Input } from "@gjensidige/core-components/lib/forms/input";
import { RadioButton } from "@gjensidige/core-components/lib/forms/radiobutton";
import { Email } from "@gjensidige/nci-core-icons/lib/email";
import { Title } from "@gjensidige/nci-core-typography";
import { format, getUnixTime } from "date-fns";
import React, { useState } from "react";

import style from "./Rsvp.module.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore sdfsf */
function sendForm(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());

  const options = {
    method: form.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId: formJson.eventId,
      name: formJson.name,
      email: formJson.email,
      rsvp: formJson.rsvp,
      allergy: formJson.allergy,
    }),
  };

  fetch(form.action, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  console.log(formJson);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore force work
const Rsvp: React.FC = (props: FetchContentResult) => {
  const [value, setValue] = useState("");
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { data } = props.data?.get as any;
  if (!data) return;
  const { openForRegistration, closedForRegistration, allergy } = data;
  const eventId = props.common.id;

  const registrationDate = format(new Date(openForRegistration), "dd.MM.yyyy");
  const registrationTime = format(new Date(openForRegistration), "HH:mm");
  const closedDate = format(new Date(closedForRegistration), "dd.MM.yyyy");
  const closedTime = format(new Date(closedForRegistration), "HH:mm");

  const timestampNow = getUnixTime(new Date());

  const timestampOpenForRegistration = getUnixTime(
    new Date(openForRegistration)
  );
  const timestampCloseForRegistration = getUnixTime(
    new Date(closedForRegistration)
  );

  let showForm = true;
  if (
    timestampNow < timestampOpenForRegistration ||
    timestampNow > timestampCloseForRegistration
  ) {
    showForm = false;
  }

  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");

  return (
    <div id="partAnchor_rsvp" className={style.rsvpPart}>
      {showForm ? (
        <>
          <Title tag="h2">Are you coming?</Title>
          <form
            method="post"
            action="http://localhost:8080/admin/site/preview/moviedb/draft/gem/_/service/com.gjensidige.internal.gem/rsvp"
            onSubmit={sendForm}
          >
            <input type="hidden" name="eventId" value={eventId} />

            <Default
              closable={false}
              showIcon={true}
              text={`Registration will be closing at ${closedDate} - ${closedTime}`}
              title=""
            />

            <div className={style.rsvpAttending}>
              <RadioButton
                id="RadioButton-1"
                name="rsvp"
                className="visual-test-override"
                label="Yes! I'm attending"
                value="attending"
                withBackground={false}
              />
              <RadioButton
                id="RadioButton-2"
                name="rsvp"
                className="visual-test-override"
                label="Sorry, I will not be attending"
                value="not attending"
                withBackground={false}
              />
            </div>

            <Input
              id="input-name"
              labelText="Your name (first and last)"
              name="name"
              onChange={(event) => setValueName(event.currentTarget.value)}
              value={valueName}
            />
            <Input
              id="input-email"
              labelText="Your e-mail address"
              name="email"
              onChange={(e) => setValueEmail(e.currentTarget.value)}
              postfixIcon={<Email />}
              value={valueEmail}
            />

            {allergy && (
              <>
                <Title tag="h3" size="5">
                  Do you have allergies or food intolerances?
                </Title>
                <div className={style.rsvpIntolerance}>
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
                  <Checkbox
                    id="Checkbox-3"
                    name="allergy"
                    label="Egg"
                    value="Egg"
                  />
                  <Checkbox
                    id="Checkbox-4"
                    name="allergy"
                    label="Fisk"
                    value="Fisk"
                  />
                  <Checkbox
                    id="Checkbox-5"
                    name="allergy"
                    label="Gluten"
                    value="Gluten"
                  />
                  <Checkbox
                    id="Checkbox-6"
                    name="allergy"
                    label="Lupin"
                    value="Lupin"
                  />
                  <Checkbox
                    id="Checkbox-7"
                    name="allergy"
                    label="Melk"
                    value="Melk"
                  />
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
                  <Checkbox
                    id="Checkbox-14"
                    name="allergy"
                    label="Soya"
                    value="Soya"
                  />
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
              </>
            )}
            <Button variant="primary" flexible type="submit">
              Send RSVP
            </Button>
          </form>
        </>
      ) : (
        <Default
          closable={false}
          showIcon={true}
          text={
            timestampNow > timestampCloseForRegistration
              ? "The registration for the event has ended. Please check out our other events. Thank you for your interest."
              : `The event registration is not opened yet. Please come back at ${registrationDate} - ${registrationTime} to register for this event.`
          }
          title=""
        />
      )}
    </div>
  );
};

export default Rsvp;
