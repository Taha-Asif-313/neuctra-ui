"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@neuctra/ui";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const topic = formData.get("topic");
    const message = formData.get("message");
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
    const mailto = `mailto:contact@neuctraui.com?subject=${encodeURIComponent(`Neuctra UI: ${topic}`)}&body=${encodeURIComponent(body)}`;

    setNotice("Your email app should open with your message ready to review and send.");
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="contact-name"
          name="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          required
        />
        <Input
          id="contact-email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <Input
        id="contact-topic"
        name="topic"
        label="What can we help with?"
        placeholder="Product question, bug report, feature request..."
        required
      />
      <Textarea
        id="contact-message"
        name="message"
        label="Message"
        placeholder="Tell us a little more"
        minRows={5}
        maxRows={8}
        required
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="md" iconAfter={<ArrowRight size={16} />}>
          Prepare email
        </Button>
        <p className="text-xs leading-5 text-secondary">
          This opens your email app. Your message is not sent by this website.
        </p>
      </div>
      {notice && <p role="status" className="text-sm text-secondary">{notice}</p>}
    </form>
  );
}
