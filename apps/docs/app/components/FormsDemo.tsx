"use client";
import { useState } from "react";
import { Checkbox } from "@confect-development/vud-components";
import { Input } from "@confect-development/vud-components";
import { TextArea } from "@confect-development/vud-components";
import { Search } from "@confect-development/vud-components";
import { Combobox } from "@confect-development/vud-components";
import { Switch } from "@confect-development/vud-components";
import { RadioGroup } from "@confect-development/vud-components";
import { Select } from "@confect-development/vud-components";

const options = Array.from({ length: 8 }, (_, i) => ({ key: i + 1, text: `item${i}` }));
const countries = [
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "fi", label: "Finland" },
  { value: "dk", label: "Denmark" },
];
const payment = [
  { value: "card", label: "Credit card" },
  { value: "invoice", label: "Invoice" },
  { value: "transfer", label: "Bank transfer" },
];

/** Client-side showcase of the form components for the home page. */
export const FormsDemo = () => {
  const [agree, setAgree] = useState(false);
  const [news, setNews] = useState(true);
  const [notify, setNotify] = useState(true);
  const [method, setMethod] = useState("card");

  return (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Text input
        <Input placeholder="Default placeholder" />
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        Email (error)
        <Input type="email" placeholder="name@example.com" hasError />
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        Text area
        <TextArea placeholder="Write your text" />
      </label>

      <div className="flex flex-col gap-1 text-sm font-semibold">
        Combobox
        <Combobox options={options} placeholder="Enter" />
      </div>

      <div className="flex flex-col gap-1 text-sm font-semibold">
        Search
        <Search placeholder="Search..." />
      </div>

      <div className="flex flex-col gap-1 text-sm font-semibold">
        Select
        <Select options={countries} placeholder="Choose country…" defaultValue="" />
      </div>

      <div className="flex flex-col gap-2 text-sm font-semibold">
        Checkboxes
        <Checkbox label="I agree to the terms" checked={agree} onChange={(_, c) => setAgree(c)} />
        <Checkbox label="Send me newsletters" checked={news} onChange={(_, c) => setNews(c)} />
        <Checkbox label="Partially selected" isMixed onChange={() => {}} />
        <Checkbox label="Disabled" disabled onChange={() => {}} />
      </div>

      <div className="flex flex-col gap-2 text-sm font-semibold">
        Radio group
        <RadioGroup value={method} onChange={setMethod} options={payment} />
      </div>

      <div className="flex flex-col gap-2 text-sm font-semibold">
        Switches
        <Switch label="Enable notifications" checked={notify} onChange={(_, c) => setNotify(c)} />
        <Switch label="Disabled" disabled onChange={() => {}} />
      </div>
    </div>
  );
};
