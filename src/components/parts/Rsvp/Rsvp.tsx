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
// @ts-ignore force work
const Rsvp: React.FC = (props: FetchContentResult) => {
  const [valueOther, setValueOther] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

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
      .then((response) => {
        console.log(response);
        setSubmissionStatus(`success`);
      })
      .catch((error) => {
        console.log(error);
        setSubmissionStatus("error");
      });
  }

  // We must have eventId (content _id from XP) to be able to store RSVPs properly. Also hides form if not onevent.
  const eventId =
    props?.common?.get.type === "com.gjensidige.internal.gem:event"
      ? props?.common?.get._id
      : undefined;
  if (!eventId) return;

  let participantsData;

  fetch(
    `http://localhost:8080/admin/site/preview/moviedb/draft/gem/test-event/_/service/com.gjensidige.internal.gem/rsvp?eventId=${eventId}`
  )
    .then((response) => response.json())
    .then((response) => {
      participantsData = response.participants;
      console.log(response);
      processParticipantsData(participantsData);
    })
    .catch((error) => console.log(error));

  function processParticipantsData(data: number) {
    console.log(data);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { data } = props.data?.get as any;
  if (!data) return;

  const { openForRegistration, closedForRegistration, allergy } = data;
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
    submissionStatus === "success" ||
    timestampNow > timestampCloseForRegistration ||
    timestampNow < timestampOpenForRegistration
  ) {
    showForm = false;
  }

  // Array of objects with name and default checked state on all allergies we have.
  // This is later used in variable "allergies" to set current state, changed based on input.
  const allergyList = [
    { name: "Nei", checked: true },
    { name: "Bløtdyr", checked: false },
    { name: "Egg", checked: false },
    { name: "Fisk", checked: false },
    { name: "Gluten", checked: false },
    { name: "Lupin", checked: false },
    { name: "Melk", checked: false },
    { name: "Nøtter", checked: false },
    { name: "Peanøtter", checked: false },
    { name: "Selleri", checked: false },
    { name: "Sennep", checked: false },
    { name: "Sesamfrø", checked: false },
    { name: "Skalldyr", checked: false },
    { name: "Soya", checked: false },
    { name: "Svoveldioksid / sulfitter", checked: false },
  ];
  // Base state on above list, but store in variable "allergies"
  const [allergies, setAllergy] = useState(allergyList);
  // Every Checkbox have a "onChange" triggering this function
  const updateCheckStatus = (index: number) => {
    setAllergy(
      allergies.map(
        (
          allergy,
          currentIndex // Map over the state-bound var "allergies"
        ) =>
          currentIndex === index // If currentIndex clicked is same as index in array ...
            ? { ...allergy, checked: !allergy.checked } // Spread existing values (to keep them) but overwrite checked by reversing its value (was true then it becomes false, and vice versa).
            : allergy // Otherwise just return object unchanged
      )
    );
  };

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
            <input
              type="hidden"
              name="allergy"
              value={allergies
                .filter((allergy) => allergy.checked) // The .filter will removing everything from allergyList not set to checked=true
                .map((allergy) => allergy.name) // The .map will for the remaining items return the allergyList.name
                .join(",")} // Then join them, separated with a ","
            />
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
                label="Yes! I'm attending"
                value="attending"
                withBackground={false}
              />
              <RadioButton
                id="RadioButton-2"
                name="rsvp"
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
                  {allergies.map((allergy, index) => (
                    <Checkbox
                      id={`allergy_${index}`}
                      name="allergy[]"
                      label={allergy.name}
                      value={allergy.name.toLowerCase()}
                      checked={allergy.checked}
                      onChange={() => updateCheckStatus(index)}
                    />
                  ))}

                  <Input
                    id="input-1D"
                    // helpText="If possible we can help"
                    labelText="Something else we should know about?"
                    name="other"
                    onChange={(event) =>
                      setValueOther(event.currentTarget.value)
                    }
                    value={valueOther}
                  />
                </div>
              </>
            )}
            <Button variant="primary" flexible type="submit">
              Send RSVP
            </Button>
            {submissionStatus === "error" && (
              <Default
                closable={true}
                showIcon={true}
                text="An error occurred. Please try again later."
                title="Error"
                alertType="error"
              />
            )}
          </form>
        </>
      ) : (
        <div className={style.information}>
          {submissionStatus !== "success" && (
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
      )}
      {submissionStatus === "success" && (
        <div className={style.information}>
          <Default
            closable={false}
            showIcon={true}
            text="RSVP submitted successfully!"
            title="Success"
            alertType="success"
          />
        </div>
      )}
    </div>
  );
};

export default Rsvp;
